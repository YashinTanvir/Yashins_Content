const express = require('express');
const cors = require('cors');
const axios = require('axios');
const http = require('http');
const socketIo = require('socket.io');
const amqp = require('amqplib/callback_api');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

const RABBITMQ_URL = 'http://localhost:15672/api/exchanges'; // RabbitMQ Management API URL
const RABBITMQ_USER = 'guest'; // Default RabbitMQ username
const RABBITMQ_PASS = 'guest'; // Default RabbitMQ password

let channel;
const clientQueueMap = new Map(); // Map to store queue names per client

// Connect to RabbitMQ
amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, ch) => {
        if (error1) {
            throw error1;
        }
        channel = ch;
        console.log('Connected to RabbitMQ');
    });
});

// Route to get all fanout exchanges
app.get('/exchanges', async (req, res) => {
    try {
        const response = await axios.get(RABBITMQ_URL, {
            auth: {
                username: RABBITMQ_USER,
                password: RABBITMQ_PASS,
            },
        });

        const fanoutExchanges = response.data
            .filter(ex => ex.type === 'fanout')
            .map(ex => ex.name);

        res.json(fanoutExchanges);
    } catch (error) {
        console.error('Error fetching exchanges:', error);
        res.status(500).send('Failed to fetch exchanges from RabbitMQ');
    }
});

// Route to create a new exchange
app.post('/create-exchange', (req, res) => {
    const { exchangeName } = req.body;

    if (!exchangeName) {
        return res.status(400).json({ success: false, message: 'Exchange name is required' });
    }

    try {
        // Create the exchange with durability set to true
        channel.assertExchange(exchangeName, 'fanout', { durable: true });
        console.log(`Exchange ${exchangeName} created.`);
        return res.json({ success: true });
    } catch (error) {
        console.error('Error creating exchange:', error);
        return res.status(500).json({ success: false, message: 'Failed to create exchange' });
    }
});

// Route to delete an exchange
app.post('/delete-exchange', (req, res) => {
    const { exchangeName } = req.body;

    if (!exchangeName) {
        return res.status(400).json({ success: false, message: 'Exchange name is required' });
    }

    try {
        // Delete the exchange
        channel.deleteExchange(exchangeName, (err, ok) => {
            if (err) {
                console.error('Error deleting exchange:', err);
                return res.status(500).json({ success: false, message: 'Failed to delete exchange' });
            }
            console.log(`Exchange ${exchangeName} deleted.`);
            return res.json({ success: true });
        });
    } catch (error) {
        console.error('Error deleting exchange:', error);
        return res.status(500).json({ success: false, message: 'Failed to delete exchange' });
    }
});

// Handle socket connection
io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    socket.on('join', (exchangeName, username) => {
        console.log(`Client ${socket.id} joining exchange: ${exchangeName}`);

        // Notify others in the room that a user has joined
        const joinMessage = `${username} has joined the chat room.`;
        channel.publish(exchangeName, '', Buffer.from(joinMessage));

        // Check if the client is already bound to a queue for this exchange
        const clientData = clientQueueMap.get(socket.id);
        if (clientData && clientData.exchangeName === exchangeName) {
            console.log(`Client ${socket.id} already joined exchange: ${exchangeName} with queue: ${clientData.queueName}`);
            return;
        }

        // Bind this client to the exchange
        channel.assertQueue('', { exclusive: true }, (err, q) => {
            if (err) throw err;
            const queueName = q.queue;
            console.log(`Queue ${queueName} created and bound to exchange ${exchangeName}`);
            channel.bindQueue(queueName, exchangeName, '');

            // Store the queue name in the map
            const consumerTag = channel.consume(queueName, (msg) => {
                if (msg.content) {
                    socket.emit('message', msg.content.toString());
                }
            }, { noAck: true });

            // Update the map with the new queue and consumer tag
            clientQueueMap.set(socket.id, { queueName, consumerTag, exchangeName });
        });
    });

    socket.on('sendMessage', (data) => {
        const { exchangeName, message } = data;
        console.log(`Client ${socket.id} sending message to exchange ${exchangeName}: ${message}`);
        channel.publish(exchangeName, '', Buffer.from(message));
    });

    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnected`);
        const clientData = clientQueueMap.get(socket.id);
        if (clientData) {
            const { queueName, consumerTag } = clientData;

            if (consumerTag && queueName) {
                // Clean up: Cancel consumer and delete the queue
                channel.cancel(consumerTag.consumerTag, () => {
                    channel.deleteQueue(queueName);
                    console.log(`Queue ${queueName} deleted`);
                    clientQueueMap.delete(socket.id); // Remove from map
                });
            }
        }
    });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

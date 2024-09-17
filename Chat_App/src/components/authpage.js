import React, { useState } from 'react'; // Importing React and useState hook
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for handling navigation
import './AuthPage.css'; // Importing CSS file for styling
import eyeOpen from '../assets/eye-open.png';  // Importing eye-open icon for toggling password visibility
import eyeClosed from '../assets/eye-closed.png';  // Importing eye-closed icon for toggling password visibility

// Defining the AuthPage functional component
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Setting state to toggle between Login and Sign Up views
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Setting state to handle Forgot Password view
  const [username, setUsername] = useState(''); // Setting state to store username input
  const [password, setPassword] = useState(''); // Setting state to store password input
  const [retypePassword, setRetypePassword] = useState(''); // Setting state to store retyped password for Sign Up
  const [showPassword, setShowPassword] = useState(false); // Setting state to toggle password visibility
  const [error, setError] = useState(''); // Setting state to handle and display error messages
  const navigate = useNavigate(); // Using useNavigate hook for navigating between routes

  // Handling the Login process
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};  // Retrieving stored users from localStorage
    if (users[username] && users[username].password === password) { // Checking if username exists and password matches
      localStorage.setItem('activeUser', username);  // Setting active user in localStorage
      navigate('/chats');  // Navigating to the chats page
    } else {
      setError('Invalid username or password');  // Setting error message if login fails
    }
  };

  // Handling the Sign Up process
  const handleSignUp = () => {
    if (password !== retypePassword) { // Checking if passwords match
      setError('Passwords do not match');  // Setting error message if passwords don't match
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};  // Retrieving stored users from localStorage
    if (users[username]) { // Checking if username already exists
      setError('Username already exists');  // Setting error message if username already exists
      return;
    }

    users[username] = { password };  // Adding new user to the users object
    localStorage.setItem('users', JSON.stringify(users));  // Saving updated users object in localStorage
    alert('Signup successful! Please login with your credentials.');  // Alerting user of successful signup
    setIsLogin(true);  // Switching to Login view
    setUsername('');  // Clearing the username input
    setPassword('');  // Clearing the password input
    setRetypePassword('');  // Clearing the retype password input
    setError('');  // Clearing any error messages
  };

  // Handling the Forgot Password process
  const handleForgotPassword = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};  // Retrieving stored users from localStorage
    if (users[username]) { // Checking if username exists
      users[username].password = password;  // Updating user's password
      localStorage.setItem('users', JSON.stringify(users));  // Saving updated users object in localStorage
      alert('Password reset successful! Please login with your new password.');  // Alerting user of successful password reset
      setIsForgotPassword(false);  // Switching to Login view
      setIsLogin(true);  // Switching to Login view
      setUsername('');  // Clearing the username input
      setPassword('');  // Clearing the password input
      setError('');  // Clearing any error messages
    } else {
      setError('Username does not exist');  // Setting error message if username does not exist
    }
  };

  // Handling the visibility toggle of the password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);  // Toggling the showPassword state
  };
  
  return (
    <div className="auth-container"> {/* Creating main container for authentication forms */}
      {/* Rendering Login View */}
      {isLogin && !isForgotPassword && (
        <div className="login-container"> {/* Creating container for Login form */}
          <h2>Login</h2> {/* Rendering heading for Login form */}
          {error && <p className="error">{error}</p>}  {/* Displaying error message if any */}
          <input
            type="text"
            placeholder="Username"
            value={username}  // Binding username input value to state
            onChange={(e) => setUsername(e.target.value)}  // Updating username state on change
          />
          <div className="password-container"> {/* Creating container for password input and visibility toggle */}
            <input
              type={showPassword ? 'text' : 'password'}  // Setting conditional input type based on showPassword state
              placeholder="Password"
              value={password}  // Binding password input value to state
              onChange={(e) => setPassword(e.target.value)}  // Updating password state on change
            />
            <img
              src={showPassword ? eyeClosed : eyeOpen}  // Toggling eye icon based on showPassword state
              alt="Toggle Password Visibility"
              className="eye-icon"
              onClick={togglePasswordVisibility}  // Toggling password visibility on click
            />
          </div>
          <div className="login-options"> {/* Creating container for remember me and forgot password options */}
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe"><a>Remember_me</a></label> {/* Creating Remember me checkbox */}
            </div>
            <button
              className="forgot-password-link"
              onClick={() => setIsForgotPassword(true)}  // Switching to Forgot Password view
            >
              Forgot Password?
            </button>
          </div>
          <button onClick={handleLogin}>Login</button>  {/* Creating Login button */}
          <button onClick={() => setIsLogin(false)}>New User? Sign Up</button>  {/* Switching to Sign Up view */}
        </div>
      )}

      {/* Rendering Sign Up View */}
      {!isLogin && (
        <div className="signup-container"> {/* Creating container for Sign Up form */}
          <h2>Sign Up</h2> {/* Rendering heading for Sign Up form */}
          {error && <p className="error">{error}</p>}  {/* Displaying error message if any */}
          <input
            type="text"
            placeholder="Username"
            value={username}  // Binding username input value to state
            onChange={(e) => setUsername(e.target.value)}  // Updating username state on change
          />
          <div className="password-container"> {/* Creating container for password input and visibility toggle */}
            <input
              type={showPassword ? 'text' : 'password'}  // Setting conditional input type based on showPassword state
              placeholder="Password"
              value={password}  // Binding password input value to state
              onChange={(e) => setPassword(e.target.value)}  // Updating password state on change
            />
            <img
              src={showPassword ? eyeClosed : eyeOpen}  // Toggling eye icon based on showPassword state
              alt="Toggle Password Visibility"
              className="eye-icon"
              onClick={togglePasswordVisibility}  // Toggling password visibility on click
            />
          </div>
          <div className="password-container"> {/* Creating container for retype password input */}
            <input
              type={showPassword ? 'text' : 'password'}  // Setting conditional input type based on showPassword state
              placeholder="Retype Password"
              value={retypePassword}  // Binding retype password input value to state
              onChange={(e) => setRetypePassword(e.target.value)}  // Updating retype password state on change
            />
            <img
              src={showPassword ? eyeClosed : eyeOpen}  // Toggling eye icon based on showPassword state
              alt="Toggle Password Visibility"
              className="eye-icon"
              onClick={togglePasswordVisibility}  // Toggling password visibility on click
            />
          </div>
          <div className="terms-container"> {/* Creating container for terms and conditions checkbox */}
            <input type="checkbox" id="terms" />
            <label htmlFor="terms"><div style={{ marginTop: '2px' }}>Agreeing to the terms & conditions</div></label>
          </div>
          <button onClick={handleSignUp}>Sign Up</button>  {/* Creating Sign Up button */}
          <button onClick={() => setIsLogin(true)}>Back to Login</button>  {/* Switching to Login view */}
        </div>
      )}

      {/* Rendering Forgot Password View */}
      {isForgotPassword && (
        <div className="forgot-password-container"> {/* Creating container for Forgot Password form */}
          <h2>Forgot Password</h2> {/* Rendering heading for Forgot Password form */}
          {error && <p className="error">{error}</p>}  {/* Displaying error message if any */}
          <input
            type="text"
            placeholder="Username"
            value={username}  // Binding username input value to state
            onChange={(e) => setUsername(e.target.value)}  // Updating username state on change
          />
          <div className="password-container"> {/* Creating container for new password input */}
            <input
              type={showPassword ? 'text' : 'password'}  // Setting conditional input type based on showPassword state
              placeholder="New Password"
              value={password}  // Binding new password input value to state
              onChange={(e) => setPassword(e.target.value)}  // Updating new password state on change
            />
            <img
              src={showPassword ? eyeClosed : eyeOpen}  // Toggling eye icon based on showPassword state
              alt="Toggle Password Visibility"
              className="eye-icon"
              onClick={togglePasswordVisibility}  // Toggling password visibility on click
            />
          </div>
          <button onClick={handleForgotPassword}>Reset Password</button>  {/* Creating Reset Password button */}
          <button onClick={() => { setIsForgotPassword(false); setIsLogin(true); }}>Back to Login</button>  {/* Switching back to Login view */}
        </div>
      )}
    </div>
  );
};

export default AuthPage;

# Health Risk Profile Visualization Tool

This repository includes the code for a basic **Health Risk Profile Visualization Tool**. This tool, created in Python with the help of **Streamlit** and **Plotly**, enables users to enter demographic and lifestyle data to get a broad health risk evaluation. It aims to assist users in understanding their positioning within specific health risk classifications, considering factors like **BMI**, **age**, **smoking habits**, and **number of children**. Furthermore, it provides a visual comparison of the user's inputs against a larger dataset.

---

## Context

In the field of healthcare, recognizing significant health risk determinants such as BMI, age, and smoking status can aid in pinpointing individuals who may benefit from specific healthcare interventions. This tool offers users a fundamental health risk evaluation, assisting them in understanding their positioning within broader risk categories based on these attributes.

Inspired by initial health screening methods, this tool illustrates how data-driven solutions can enhance health awareness. While it remains an elementary tool, it showcases the potential for utilizing data science to provide personalized health insights.

---

## Features

- **User Engagement**: Gathers demographic and lifestyle information such as age, BMI, smoking habits, and number of children.
- **Health Risk Evaluation**: Determines a health risk level (Low, Moderate, High) based on user responses, utilizing widely recognized health metrics.
- **Graphical Comparisons**: Delivers histograms that illustrate how the user's BMI and age relate to the distribution found in a broader dataset.

---

## Screenshots

### Main Interface
![](./screenshots/IDS_png1.png)

### BMI and Age Distribution Comparison
![](./screenshots/IDS_png2.png)

---

## To Utilize the Tool

1. **Input Personal Details**:  
   Make use of the interactive sliders and dropdown menus to provide information such as age, BMI, smoking status, and number of dependents.

2. **Examine Health Risk Classification**:  
   The tool will indicate a risk level (Low, Moderate, High) depending on your inputs.

3. **Contrast with Dataset**:  
   Observe how your BMI and age measure up against the general population in the dataset through the histograms.

4. **Review Health Recommendations**:  
   Based on your determined risk level, go through the health recommendations presented at the bottom.

5. **Run the Tool**:

   **Navigate to the Project Directory**:
   - Open your terminal and change to the directory where the project is located. For example:
     ```bash
     cd /path/to/Project_IDS
     ```

   **Activate the Virtual Environment**:
   - If you haven’t already set up the virtual environment, you can do so by running:
     ```bash
     python3 -m venv health_risk_tool
     ```
   - Once created, activate the virtual environment:
     ```bash
     source health_risk_tool/bin/activate
     ```
   - You should see `(health_risk_tool)` at the beginning of your terminal prompt, indicating that the virtual environment is active.

   **Install Dependencies**:
   - With the virtual environment activated, install the required packages:
     ```bash
     pip install pandas matplotlib seaborn plotly streamlit
     ```

   **Run the Tool**:
   - After activating the virtual environment and installing dependencies, run the following command to start the Streamlit app:
     ```bash
     streamlit run health_risk_profile.py
     ```
   - This command will start a local server. Open the URL provided in your terminal (typically `http://localhost:8501`) in your browser to access the tool.

   **Interact with the Tool**:
   - Once the app is running in your browser, you can enter personal details, view your health risk classification, and compare your BMI and age with the dataset distributions.

---

## Future Enhancements

This tool offers a fundamental health risk evaluation and has the potential for various improvements:

- **Machine Learning Integration**: Incorporate a machine learning model to generate a more precise, data-based risk evaluation.
- **Expanded Health Metrics**: Include additional metrics such as blood pressure or physical activity to expand the range of the risk evaluation.
- **Tailored Health Recommendations**: Provide more specific guidance based on the individual’s comprehensive profile for a customized experience.

---

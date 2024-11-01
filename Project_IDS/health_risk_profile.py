import pandas as pd
import streamlit as st
import plotly.express as px

# Load the dataset
data = pd.read_csv('insurance.csv')

# Set up the Streamlit app title and description
st.title("Health Risk Profile Visualization Tool")
st.write("""
This tool allows you to explore health risk profiles based on demographic and lifestyle information.
Enter your information below to see your health risk category.
""")

# User inputs for age, BMI, number of children, and smoker status
age = st.slider("Age", 18, 100, 30)
bmi = st.slider("BMI", 15, 50, 25)
children = st.slider("Number of Children", 0, 5, 0)
smoker = st.selectbox("Smoker Status", ["yes", "no"])

# Define a function to calculate the risk category
def calculate_risk(age, bmi, smoker):
    if smoker == "yes" and bmi > 30:
        return "High Risk"
    elif bmi > 25 and age > 50:
        return "Moderate Risk"
    else:
        return "Low Risk"

# Determine the risk category based on user inputs
risk_category = calculate_risk(age, bmi, smoker)
st.write(f"Your Health Risk Category: {risk_category}")

# Visualization: BMI distribution in the dataset with user's BMI highlighted
fig = px.histogram(data, x="bmi", nbins=20, title="BMI Distribution in Dataset")
fig.add_vline(x=bmi, line_width=3, line_dash="dash", line_color="red", annotation_text="Your BMI")
st.plotly_chart(fig)

# Visualization: Age distribution in the dataset with user's age highlighted
fig2 = px.histogram(data, x="age", nbins=20, title="Age Distribution in Dataset")
fig2.add_vline(x=age, line_width=3, line_dash="dash", line_color="blue", annotation_text="Your Age")
st.plotly_chart(fig2)

# Display health recommendations based on the calculated risk category
if risk_category == "High Risk":
    st.write("Recommendation: Consider lifestyle changes, such as quitting smoking or managing BMI.")
elif risk_category == "Moderate Risk":
    st.write("Recommendation: Maintain regular health check-ups to monitor key health metrics.")
else:
    st.write("Recommendation: Keep up with healthy habits to maintain a low risk profile.")

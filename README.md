# NetWealth App - Setup Guide for macOS

## Overview
This application is a .NET MAUI project, designed to provide a cross-platform solution for managing personal finance with authentication and secure features. The app includes a user-friendly interface, built-in password management, and personalized settings.

## Prerequisites
To run this MAUI project, ensure you have the following installed on your Mac:

- **.NET SDK 8.0 or higher**: [Download here](https://dotnet.microsoft.com/download/dotnet).
- **Visual Studio 2022 for Mac (17.3 or later)**: [Download here](https://visualstudio.microsoft.com/), with the ".NET Multi-platform App UI development" workload enabled.
- **JetBrains Rider (2023.1 or later)**: [Download here](https://www.jetbrains.com/rider/), with the required .NET MAUI plugins installed.
- **Xcode** (for iOS simulator support): [Download from the App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12).
- **MAUI Workloads** for building Android, iOS, and Mac Catalyst applications.

> **Note:** .NET MAUI supports building for macOS through Mac Catalyst, and for iOS if you want to test the app on an iOS simulator or device.

## Setting Up the Project

### 1. Clone the Repository
First, clone the NetWealth repository to your local machine:

```bash
git clone https://github.com/yourusername/NetWealth.git
cd NetWealth
```
### 2. Install .NET MAUI and Dependencies
Make sure .NET MAUI workloads are installed. Open your terminal and run:

```bash
dotnet workload install maui-android maui-ios maui-maccatalyst
```
### 3. Verify .NET and MAUI Installation
Check that the .NET SDK and MAUI workloads are correctly installed:

```bash
dotnet --list-sdks
dotnet --list-workloads
```
You should see maui-android, maui-ios, and maui-maccatalyst in the workload list.

### 4. Restore Project Dependencies
To install any required libraries for the project, run:

```bash
dotnet restore
```

### 5. Configuring Emulators or Devices

- **For iOS**: Ensure that Xcode is installed. You can use Xcode's built-in iOS simulator for testing.
  - Open Xcode, go to **Preferences > Locations**, and make sure **Command Line Tools** is set to the latest version.

- **For Mac Catalyst**: This will run the application as a macOS desktop app.
  - **Note**: You may need to enable Developer Mode on your Mac to run local builds.

### 6. Running the App

Below are the specific commands to build and run the app on different platforms.

- **Mac Catalyst (Desktop App)**: To run the application as a macOS app:

  ```bash
  dotnet build -t:Run -f net8.0-maccatalyst
  ```
- **iOS (Simulator)**: To run the app on an iOS simulator (requires Xcode):

  ```bash
  dotnet build -t:Run -f net8.0-ios
  ```
> **Note**: For physical iOS device testing, you need an Apple Developer account and provisioning profiles set up in Xcode.

### 7. Running the Project in an IDE

#### Visual Studio for Mac
1. Open the `NetWealth.sln` solution file in Visual Studio for Mac.
2. Select the target platform (e.g., iOS Simulator or Mac Catalyst).
3. Press **F5** or click on the **Run** button to build and start the app.

#### JetBrains Rider
1. Open JetBrains Rider and load the `NetWealth.sln` solution file.
2. In the **Run Configurations** dropdown (usually at the top right), select the target platform (e.g., Mac Catalyst for macOS desktop or iOS for iOS simulator).
3. Click on the **Run** button or press **Shift+F10** to build and run the app.

> **Note**: Ensure that JetBrains Rider has the Xcode path set up under **Preferences > Languages & Frameworks > .NET Core > SDKs**, so it can locate iOS build targets if running on an iOS simulator.

### OOP Concepts Used
The application incorporates key Object-Oriented Programming principles:

- **Encapsulation**: Sensitive data like user credentials are encapsulated within the `User` class in the `Models` folder.
- **Inheritance**: All page classes inherit from `ContentPage`, allowing code reuse across the interface.
- **Polymorphism**: Methods like `OnAppearing()` in different pages demonstrate polymorphism by overriding base behaviors.

### Common Issues and Troubleshooting

- **App not starting on iOS simulator**:
  - Ensure that the iOS simulator is configured and running.
  - Rebuild the project with:

    ```bash
    dotnet clean
    dotnet build
    ```

- **Navigation issues or page not found errors**:
  - Ensure `AppShell.xaml` includes all routes, e.g.:

    ```xml
    <ShellContent Title="Login" ContentTemplate="{DataTemplate local:LoginPage}" Route="LoginPage" />
    ```
- **Unresolved dependencies or missing libraries**:
  - Run `dotnet restore` to ensure all dependencies are loaded.

### Additional Notes
- Ensure that all required images (e.g., `netwealth_logo.png`, `eye_open.png`, `eye_close.png`) are correctly placed in the `Resources/Images` folder.
- Use Visual Studio for Mac or JetBrains Rider for easier debugging and development, especially if you are testing on multiple simulators or devices.

### Support
If you encounter any issues, please refer to the official .NET MAUI Documentation or reach out to the project maintainer.

With this guide, you should be able to set up, build, and run the NetWealth app on macOS using .NET MAUI, with the option to use either Visual Studio for Mac or JetBrains Rider.


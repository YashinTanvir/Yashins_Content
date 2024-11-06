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
# Chat App

This is a feature-rich chat application built using React and Firebase. It allows users to communicate in real-time with a clean and responsive interface.

## Features

- **Real-time Messaging**: Send and receive messages instantly.
- **User Authentication**: Secure login and registration using Firebase Authentication.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Message History**: View past conversations with other users.
- **User Avatars**: Display user avatars in chat for a personalized experience.
- **Typing Indicators**: See when the other user is typing a message.
- **Read Receipts**: Know when your messages have been read.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
   ```

2. **Install the dependencies**:
   ```sh
   npm install
   ```

3. **Firebase Configuration**:
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication and Firestore Database.
   - Create a `.env` file in the root directory and add your Firebase configuration:
     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

4. **Start the development server**:
   ```sh
   npm start
   ```

## Usage

1. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.

2. **User Registration and Login**:
   - Sign up with your email and password or log in if you already have an account.

3. **Start Chatting**:
   - Select a user to start a conversation and enjoy real-time messaging.

## Project Structure

- **`src/components`**: Contains the React components used in the application.
- **`src/contexts`**: Contains the context providers for authentication and other global states.
- **`src/firebase`**: Contains the Firebase configuration and initialization.
- **`public`**: Contains the static files and the `index.html` file.

## Deployment

To deploy the application to Firebase Hosting, follow these steps:

1. **Build the application**:
   ```sh
   npm run build
   ```

2. **Deploy to Firebase**:
   ```sh
   firebase deploy
   ```

## Contributing

Contributions are welcome! If you have any improvements or bug fixes, please open an issue or submit a pull request. Make sure to follow the project's code of conduct.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
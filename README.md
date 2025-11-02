# 📝 PasteBin Clone - Your Code Snippet Savior! 🚀

This project is a simple yet powerful PasteBin clone that allows users to create, store, and share code snippets or any text-based content. It provides a user-friendly interface for managing pastes, complete with features for searching, editing, and deleting them. This application solves the problem of quickly sharing code snippets or text notes with others, offering a convenient and organized way to store and access them.

## 🚀 Key Features

- **Create Pastes:** Easily create new pastes with a title and content. ✍️
- **View Pastes:** Display individual pastes with their title, content, and creation date. 👓
- **Edit Pastes:** Modify existing pastes to keep your snippets up-to-date. ✏️
- **Delete Pastes:** Remove pastes that are no longer needed. 🗑️
- **Search Pastes:** Quickly find pastes by searching for keywords in the title or content. 🔍
- **Share Pastes:** Generate shareable links for easy sharing. 🔗
- **Responsive Design:** Works seamlessly on various devices. 📱💻

## 🛠️ Tech Stack

*   **Frontend:**
    *   React: JavaScript library for building user interfaces.
    *   Redux Toolkit: For state management.
    *   React Router DOM: For handling routing and navigation.
    *   Tailwind CSS: For styling the user interface.
    *   react-hot-toast: For displaying toast notifications.
*   **Backend:**
    *   Node.js: JavaScript runtime environment.
    *   Express: Web application framework for Node.js.
    *   Mongoose: MongoDB object modeling tool.
    *   cors: Middleware for enabling Cross-Origin Resource Sharing.
    *   dotenv: Loads environment variables from a `.env` file.
*   **Database:**
    *   MongoDB: NoSQL database for storing paste data.

## 📦 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)
- MongoDB installed and running

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd pastebin-clone
    ```

2.  **Install dependencies for the client:**

    ```bash
    cd client
    npm install
    ```

3.  **Install dependencies for the server:**

    ```bash
    cd ../server
    npm install
    ```

4.  **Create a `.env` file in the `server` directory** with the following variables:

    ```
    PORT=5000 # Or any other port you prefer
    MONGO_URI=<your-mongodb-connection-string>
    ```

    Replace `<your-mongodb-connection-string>` with your actual MongoDB connection string.

### Running Locally

1.  **Start the backend server:**

    ```bash
    cd server
    npm start
    ```

2.  **Start the frontend development server:**

    ```bash
    cd client
    npm start
    ```

    The frontend application should now be running at `http://localhost:3000` (or another port if specified).

## 📂 Project Structure

```
pastebin-clone/
├── client/
│   ├── public/
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Paste.jsx
│   │   │   └── ViewPaste.jsx
│   │   ├── redux/
│   │   │   └── pasteSlice.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   ├── store.js
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/
│   ├── controllers/
│   │   └── pasteController.js
│   ├── models/
│   │   └── Paste.js
│   ├── routes/
│   │   └── pasteRoutes.js
│   ├── index.js
│   ├── package.json
│   └── .env
├── .gitignore
├── README.md
└── ...
```


## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

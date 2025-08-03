# PasteBin Clone 📝

A simple yet powerful PasteBin clone built with React, Redux, and Tailwind CSS. This project allows users to create, view, edit, and share text snippets easily. It leverages Redux for state management and local storage for persistence, ensuring a seamless user experience.

## 🚀 Key Features

- **Create Pastes:** Easily create new text snippets with a title and content.
- **View Pastes:** View individual pastes with their title, content, and creation date.
- **Edit Pastes:** Modify existing pastes to update their content.
- **Delete Pastes:** Remove pastes that are no longer needed.
- **Share Pastes:** Generate shareable links for pastes.
- **Search Pastes:** Quickly find pastes by searching for keywords in their titles or content.
- **Local Storage Persistence:** Pastes are stored in local storage, so they persist even after the browser is closed.
- **Responsive Design:** The application is designed to be responsive and work well on different screen sizes.
- **Toast Notifications:** Provides feedback to the user through toast notifications.

## 🛠️ Tech Stack

- **Frontend:**
    - React
    - Redux Toolkit
    - React Router DOM
    - Tailwind CSS
    - react-hot-toast
- **Build Tool:**
    - Vite

## 📦 Getting Started

### Prerequisites

- Node.js (>=18)
- npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd <project-directory>
    ```

3.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:5173` (or the port Vite assigns).

## 📂 Project Structure

```
pastebin-clone/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Home.jsx
│   │   ├── Navbar.jsx
│   │   ├── Paste.jsx
│   │   └── ViewPaste.jsx
│   ├── redux/
│   │   └── pasteSlice.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── store.js
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── package-lock.json
└── vite.config.js
```



## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request.



## 📬 Contact

If you have any questions or suggestions, feel free to contact me at [maury.ritesh2005@gmail.com]
## 💖 Thanks

Thank you for checking out this PasteBin clone project! I hope it's helpful and that you find it interesting.



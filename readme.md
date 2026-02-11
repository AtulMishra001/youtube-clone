# YouTube Clone - MERN Stack Capstone Project

## 📽️ Project Overview
This project is a full-stack YouTube clone built using the MERN stack (MongoDB, Express, React, Node.js). It replicates core video-sharing functionalities, including user authentication, video playback, channel management, and real-time interaction through comments and likes. The application is designed to be fully responsive, ensuring a high-quality user experience across desktop, tablet, and mobile devices.

## 🛠️ Technologies Used

### Frontend
* **React.js (Vite)**: For building the user interface with high performance.
* **Tailwind CSS**: For modern, responsive styling and layout.
* **React Router**: For client-side navigation and routing.
* **Axios**: For making HTTP requests to the backend API.
* **React Icons**: For professional iconography (Material Design, IonIcons).

### Backend
* **Node.js & Express.js**: For building a scalable and secure RESTful API.
* **MongoDB & Mongoose**: For flexible data modeling and cloud database storage.
* **JWT (JSON Web Tokens)**: For secure, token-based user authentication.
* **ES Modules**: Modern JavaScript syntax for clean and maintainable backend code.

## 🚀 Features
* **Authentication**: JWT-based login and signup with secure password handling.
* **Home Page**: Dynamic video grid with title search and category-based filtering.
* **Responsive Navigation**: Toggleable sidebar and a mobile-optimized search overlay.
* **Video Player**: Seamless playback with like/dislike interactions and view counting.
* **Comment System**: Full CRUD (Create, Read, Update, Delete) functionality for comments.
* **My Channels**: Users can create channels and manage them.


## 📂 Folder Structure
```bash
/youtube-clone
├── /backend
│   ├── /controllers    # API logic (auth, video, channel, comment)
│   ├── /models         # Database schemas (User, Video, Channel, Comment)
│   ├── /routes         # Express endpoints
│   ├── /middleware     # Authentication guards (protect)
│   └── server.js       # Main entry point
└── /frontend
    ├── /src
    │   ├── /components # Navbar, Sidebar, VideoCard, Loader, etc.
    │   ├── /context    # AuthContext for global state
    │   ├── /pages      # Home, VideoDetail, MyChannels, ManageVideo, etc.
    │   ├── /utils      # Axios instance and helpers
    │   └── App.jsx     # Main routing and layout
    └── vite.config.js
```

## ⚙️ Setup and Installation
### Prerequisites
1. Node.js installed
2. MongoDB Atlas account (or local MongoDB instance)

## Backend Installation

```
cd backend
npm install
# Create a .env file in backend folder and add your credentials:
# PORT=5000
# MONGO_URI=your_mongodb_atlas_url
# JWT_SECRET=your_jwt_secret
npm start
```

## Frontend Installation

```
cd frontend
npm install
npm run dev
```

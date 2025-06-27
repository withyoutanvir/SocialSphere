# 🌐 SocialSpher — Real-Time Chat App

**SocialSpher** is a real-time chat application built with the MERN stack. It enables secure, instant communication between users with a responsive UI, real-time messaging, and online status indicators — all hosted on modern cloud platforms.

## 🔗 Live URLs

- 🖥️ **Frontend** (Netlify): [https://socialsphere0.netlify.app](https://socialsphere0.netlify.app)


---

## 🚀 Features

- 🔐 JWT-based Authentication (Signup/Login)
- 💬 Real-time One-to-One Messaging with Socket.io
- 🟢 Online/Offline Status
- 🔍 Search Users
- 🌓 Dark/Light Mode
- 📱 Mobile-Friendly UI
- ☁️ Deployment: Netlify + Render

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Zustand
- Axios
- Lucide Icons
- React Router DOM

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.io
- JWT + bcryptjs + cookie-parser
- CORS + dotenv

---

## 📁 Folder Structure

SocialSpher/
├── backend/ # Express backend
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── middleware/
│ └── server.js
│
├── frontend/ # React frontend
│ ├── components/
│ ├── pages/
│ ├── store/
│ └── App.jsx, main.jsx
│
├── .env # Environment variables
├── netlify.toml # Netlify config
└── README.md


# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

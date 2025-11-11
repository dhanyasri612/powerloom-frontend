# 🧶 Powerloom - MERN Full Stack Application

Powerloom is a full-featured MERN (MongoDB, Express, React, Node.js) web application designed for managing textile production data, loom operations, orders, and analytics. It includes an admin dashboard, real-time socket updates, and secure authentication.

## 🚀 Live Demo
- 🖥️ Frontend (React + Vite): https://powerloom-frontend-rpgj.vercel.app  
- ⚙️ Backend (Node + Express): https://powerloom-backend.onrender.com  

## 🧩 Tech Stack
| Layer | Technology |
|--------|-------------|
| Frontend | React, Vite, Axios, TailwindCSS |
| Backend | Node.js, Express.js, Socket.IO |
| Database | MongoDB Atlas (Cloud) |
| Authentication | JWT (JSON Web Token) |
| Hosting | Vercel (Frontend) + Render (Backend) |

## 📁 Folder Structure
Powerloom/
├── server/                   # Express backend
│   ├── config/               # Database config (db.js)
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── uploads/              # Uploaded files
│   ├── server.js             # Main server file
│   └── .env                  # Environment variables
│
├── src/                      # React frontend
│   ├── components/           # Reusable UI components
│   ├── pages/                # Page-level views
│   ├── services/             # API calls
│   ├── styles/               # CSS / Tailwind files
│   ├── App.jsx               # Main app entry
│   └── main.jsx              # ReactDOM render
│
├── package.json
└── vite.config.js

## ⚙️ Environment Variables

### Backend (.env)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/test
JWT_SECRET=anyrandomsecret
PORT=5000

> You can change `/test` to `/powerloom` to use a specific database name.

### Frontend (.env)
If using Vite:
VITE_API_BASE_URL=https://powerloom-backend.onrender.com
If using Create React App:
REACT_APP_API_BASE_URL=https://powerloom-backend.onrender.com

## 🧠 Features
✅ Admin Authentication (JWT-secured)  
✅ Product & Order Management (CRUD operations)  
✅ Real-time Loom Updates (Socket.IO)  
✅ Analytics Dashboard with Metrics  
✅ Image/File Upload Route  
✅ Responsive UI (Tailwind + React)  

## 🛠️ Installation (Local Setup)

### 1️⃣ Clone the Repository
git clone https://github.com/<your-username>/powerloom.git
cd powerloom

### 2️⃣ Backend Setup
cd server
npm install

Create `.env` inside `/server`:
MONGO_URI=your-mongodb-uri
JWT_SECRET=anyrandomsecret
PORT=5000

Run backend:
npm start
Backend runs at http://localhost:5000

### 3️⃣ Frontend Setup
cd ..
npm install
npm run dev
Frontend runs at http://localhost:5173

## ☁️ Deployment Guide

### Backend (Render)
1. Push backend repo to GitHub  
2. Create a new Render Web Service  
3. Add Environment Variables:
   - MONGO_URI
   - JWT_SECRET
   - PORT  
4. Deploy  
✅ Backend URL → https://powerloom-backend.onrender.com

### Frontend (Vercel)
1. Import frontend repo to Vercel  
2. Add Environment Variable:
   VITE_API_BASE_URL=https://powerloom-backend.onrender.com
3. Build Command → `npm run build`  
4. Output Directory → `dist`  
5. Deploy  
✅ Frontend URL → https://powerloom-frontend-rpgj.vercel.app

## 👨‍💻 Default Admin Login
Email: admin@example.com  
Password: Admin123!  

If forgotten, create a new admin in MongoDB `users` collection manually:
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "$2b$10$Rp6Vzq2LL94Y0JX9MfN3kOZtLCmDi/1QFrAXFM4Vi/BmxpdL03YhG",
  "role": "admin"
}
This hash equals password `Admin123!`.

## 🧰 Useful Commands
npm start → Start backend server  
npm run dev → Run frontend locally  
npm run build → Build production frontend  
npm install → Install dependencies  

## 🪄 Common Issues
Network Error → Wrong backend URL → Check VITE_API_BASE_URL  
Slow Load → Render app sleeping → Use UptimeRobot  
CORS blocked → Backend origin missing → Update CORS config in server.js  
Invalid credentials → Password hash mismatch → Update bcrypt hash in MongoDB  

## 🧠 Future Improvements
- Add email-based password reset  
- Pagination and search in admin dashboard  
- Role-based access control  
- Cloudinary image hosting  

## 📜 License
This project is open-source and available under the MIT License.

## 💬 Contact
Author: Dhanyasri Kalisamy  
GitHub: https://github.com/dhanyasri612

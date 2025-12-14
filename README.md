# 📝 Full-Stack Todo App

A full-stack Todo application with authentication, built using **React**, **Node.js**, **Express**, and **MongoDB**.

This project demonstrates a complete CRUD workflow, secure JWT-based authentication, and user-specific data access.

---

## 🚀 Features

- User registration & login
- JWT authentication
- Create, read, update, delete todos
- Mark todos as completed
- Edit todo title (double click)
- Todos are private (per user)
- Persistent storage with MongoDB
- Clean and responsive UI

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Fetch API
- CSS

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcryptjs

---

## 📂 Project Structure

```text
frontend/
  ├─ src/
  │  ├─ App.jsx
  │  ├─ index.css
  │  └─ main.jsx
  └─ index.html

backend/
  ├─ models/
  │  ├─ User.js
  │  └─ Todo.js
  ├─ middleware/
  │  └─ auth.js
  ├─ index.js
  └─ .env
🔐 Authentication Flow

User registers with email & password

Password is hashed using bcrypt

JWT token is issued on login

Token is stored in localStorage

Protected routes require Authorization: Bearer <token>

📡 API Endpoints
Auth

POST /register

POST /login

GET /me

Todos (protected)

GET /todos

POST /todos

PATCH /todos/:id

DELETE /todos/:id

⚙️ Environment Variables

Backend .env file:

MONGO_URL=your_mongodb_atlas_url
JWT_SECRET=your_secret_key

▶️ Run Locally
Backend
npm install
node index.js

Frontend
npm install
npm run dev

🌍 Deployment

Backend: Render

Database: MongoDB Atlas

Frontend: Vercel

💡 What This Project Shows

Full-stack development skills

Secure authentication

REST API design

MongoDB data modeling

React state management

Clean and maintainable code

👤 Author

Built by Ilona Hohilchyn
Junior Full-Stack Developer


 
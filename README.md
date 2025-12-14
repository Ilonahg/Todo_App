📝 Full-Stack Todo App

A full-stack Todo application with authentication, built using React, Node.js, Express, and MongoDB.

This project demonstrates a complete CRUD workflow, JWT-based authentication, and user-specific data access.

🚀 Features

User login with JWT authentication

Protected API routes

Create, read, update, delete todos

Mark todos as completed

Todos are private (per user)

Persistent storage with MongoDB

Clean and responsive UI

⚠️ For demo purposes, authentication is limited to a predefined user.

🛠 Tech Stack
Frontend

React (Vite)

Fetch API

CSS

Backend

Node.js

Express

MongoDB + Mongoose

JWT

bcryptjs

📂 Project Structure
Frontend
src/
 ├─ App.jsx
 ├─ api.js
 ├─ index.css
 └─ main.jsx

Backend
models/
 ├─ User.js
 └─ Todo.js
middleware/
 └─ auth.js
index.js
.env

🔐 Authentication Flow

User logs in with email & password

Password is verified using bcrypt

JWT token is issued on login

Token is stored in localStorage

Protected routes require
Authorization: Bearer <token>

📡 API Endpoints
Auth

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

🌍 Live Demo

- **Frontend (Vercel):**  
  https://todo-frontend-5mgukftvb-ilonahgs-projects.vercel.app/

- **Backend API (Render):**  
  https://todo-app-kcy6.onrender.com/
  
## 🔐 Demo Credentials  
Use the following credentials to test the app:
- Email: **test@test.com**
- Password: **123456**

## ▶️ Run Locally

### Backend

npm install
node index.js

### Frontend

npm install
npm run dev

🌍 Deployment

Backend: Render

Database: MongoDB Atlas

Frontend: Vercel

💡 What This Project Shows

Full-stack development skills

Secure authentication with JWT

REST API design

MongoDB data modeling

React state management

Clean and maintainable code

👤 Author

Ilona Hohilchyn
Junior Full-Stack Developer

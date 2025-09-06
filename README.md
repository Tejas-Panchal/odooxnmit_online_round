# odooxnmit_online_round
# SynergySphere – Advanced Team Collaboration Platform

SynergySphere is a modern team collaboration platform designed to act as the **central nervous system** for teams. It helps users stay organized, communicate effectively, and manage projects without friction. Unlike traditional project management tools, SynergySphere focuses on **proactive collaboration** — catching potential issues early and keeping teams aligned.

This project was built as part of a **rapid development challenge (8-hour MVP)**, showcasing core full-stack development skills across frontend, backend, and database design.

---

## Table of Contents
- [Features](#features-mvp--round-1)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation--setup](#installation--setup)
- [Usage](#usage)
  - [User Roles](#user-roles)
  - [API Endpoints](#api-endpoints-core)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)

---

## Features 
- **User Authentication:** Secure registration and login system.  
- **Project Management:** Create and manage projects with assigned team members.  
- **Task Management:** Assign tasks with deadlines, track statuses (To-Do, In Progress, Done).  
- **Team Collaboration:** Project-specific threaded discussions to keep conversations contextual.  
- **Progress Tracking:** Clear visualization of project and task progress.  
- **Notifications:** Basic event-driven notifications (e.g., new task assigned, task status updated).  
- **Responsive UI:** Desktop "command center" experience plus lightweight, mobile-friendly design.  

---

## System Architecture
SynergySphere follows a **client-server model** with clear separation of concerns:

- **Backend (/backend):**  
  Node.js/Express REST API handling authentication, project & task management, discussions, and notifications.  

- **Frontend (/frontend):**  
  React SPA providing responsive desktop and mobile-ready interfaces.  

- **Database:**  
  MongoDB for storing users, projects, tasks, and discussions with efficient indexing for performance.  

---

## Technology Stack

### Backend
- Node.js + Express.js  
- MongoDB + Mongoose (ODM)  
- JSON Web Tokens (JWT) – Authentication  
- bcryptjs – Password hashing  
- SendGrid: For transactional email notifications.
- Multer: Middleware for handling file uploads.

### Frontend
- React: JavaScript library for building user interfaces.
- Redux Toolkit: For predictable and efficient global state management.
- React Router: For client-side routing.
- Material-UI (MUI): For a comprehensive suite of UI components.
- Axios: For making HTTP requests to the backend API.
- React-Toastify: For user-friendly notifications. 

---

## Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
Make sure you have installed:
- Node.js (v14+)  
- npm (bundled with Node.js)  
- MongoDB (local or Atlas)  

### Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/<your-username>/synergysphere
cd synergysphere
```
2. Set up the backend: 
```bash
cd backend
npm install
```
3. Set up Frontend :
```bash
cd ../frontend
npm install
```
 The frontend is configured to proxy API requests to the backend running on localhost:5000.
 
4. Run the application :
     - To start the backend server, run this from the /backend directory:
        ```bash
          npm run server
        ```
     - To start the frontend development server, open a new terminal and run this from the /frontend directory:
        ```bash
        npm start
        ```
  The frontend will be available at http://localhost:3000 and the backend at http://localhost:5000.

---
## Usage

### User Roles
- Admin/Manager :
    - Create projects
    - Add/remove members
    - Assign tasks
- Team Member :
    - View assigned tasks
    - Update progress
    - Participate in discussions
### API Endpoints
The core API endpoints are documented within the source code using comments. You can use a tool like Postman to interact with them directly at http://localhost:5000/api.





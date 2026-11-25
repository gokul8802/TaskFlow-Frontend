# TaskFlow – Task Management Application

TaskFlow is a responsive task management application built using React. It allows users to securely register, log in, and manage their daily tasks through an interactive dashboard.

## Features

- User Registration and Login
- JWT-based Authentication
- Protected Routes
- Create, View, Update and Delete Tasks
- Task Status Management
- Dashboard with Task Summary
- Form Validation
- Loading and Error States
- Responsive User Interface
- REST API Integration

## Tech Stack

- React
- JavaScript
- Vite
- React Router DOM
- CSS
- Fetch API
- Node.js and Express REST API

## Project Structure

```text
src/
├── components/
│   ├── Loader.jsx
│   └── Navbar.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── TaskDetails.jsx
│   └── TaskForm.jsx
├── services/
│   └── api.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/gokul8802/TaskFlow-Frontend.git
```

### 2. Navigate to the Project

```bash
cd TaskFlow-Frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and add:

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Start the Backend

Ensure the TaskFlow backend is running on port 5000.

### 6. Start the Frontend

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Production Build

To generate the production build:

```bash
npm run build
```

## API Integration

The frontend communicates with the TaskFlow REST API.

Main API endpoints:

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/tasks`
- POST `/api/tasks`
- GET `/api/tasks/:id`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

## Author

Gokul Raj

GitHub: https://github.com/gokul8802

---

Developed as part of the Valentius Kryptix Internship – WA-3.
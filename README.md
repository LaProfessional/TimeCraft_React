http://timecraft-react.delfinnnn.online/

# ⏰ TimeCraft (React)

**TimeCraft** is a simple web-based daily planner built for educational purposes. The project is implemented using **React** to practice working with:

- CRUD operations  
- RESTful APIs  
- Authentication (bcrypt + JWT)  
- A modern frontend stack  

This project is a React-based version of [TimeCraft_JS](https://github.com/LaProfessional/TimeCraft_JS), originally written in vanilla JavaScript. The main goal is to compare architectural approaches, usability, and scalability between React and plain JS applications.

---

## 🚀 Key Features

- 📅 Add, delete, and edit tasks (CRUD)  
- 🧾 Store data using an API  
- 🔐 Registration and login using `bcrypt` and `JWT`  
- 🧠 React hooks for state management  
- ⚛️ Structured application with a component-based architecture  

---

## 🧱 Project Architecture

`src/` contains the main project structure: `components/` (reusable UI components), `pages/` (Planner, Login, etc.), `hooks/` (custom React hooks), `utils/` (helper functions), `assets/` (styles, icons, and other resources), `App.jsx` (main app component), and `main.jsx` (entry point).

**Technologies Used:**

- React (v18+)  
- React Router DOM  
- bcrypt + JWT (backend integration)  
- Vite (fast build tool, replacing CRA)  
- Tailwind CSS (if enabled)  
- ESLint + Prettier (for code quality and formatting)

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/LaProfessional/TimeCraft_React.git
cd TimeCraft_React
Install dependencies:

bash
Copy
Edit
npm install
Run the development server:

bash
Copy
Edit
npm run dev
Open your browser and navigate to:

arduino
Copy
Edit
http://localhost:5173
⚠️ Don’t forget to set up the backend server if you're using API and authentication!

🔄 Comparison with the JavaScript Version
There is a vanilla JavaScript counterpart to this project: TimeCraft_JS.
This comparison helps evaluate:

Code reusability

Logic and UI structure

Scalability and maintainability

Approaches to state management and routing

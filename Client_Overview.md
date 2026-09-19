# StudyBuddy Project Overview
*(A simple guide for non-technical stakeholders)*

Welcome to the overview of the **StudyBuddy** project! This document is designed to give you a clear, easy-to-understand explanation of how the application is built, the technologies it uses, and how the different parts communicate with each other.

---

## 1. The Big Picture: How is it Structured?
Modern web applications like StudyBuddy are typically divided into three main components. Think of it like a restaurant:
*   **The Frontend (The Dining Area):** This is what the user sees and interacts with. It’s the visual interface, the buttons, the forms, and the animations.
*   **The Backend (The Kitchen):** This is where the heavy lifting happens. It processes requests, applies business logic, and manages the rules of the application.
*   **The Database (The Pantry):** This is where all the data (user profiles, study materials, courses) is securely stored and organized.

When a user clicks a button on the **Frontend** (e.g., "Sign In"), a request is sent to the **Backend**, which checks the credentials against the **Database**, and then sends a response back to update the user's screen.

---

## 2. The Frontend: What the User Sees
The Frontend is built to be fast, interactive, and visually appealing.

*   **Core Technology:** Built using **React**. React allows us to create interactive, "app-like" experiences in the web browser without constantly reloading the page.
*   **Styling & Design:** We use **Tailwind CSS**. This is a design framework that allows us to build beautiful, modern, and mobile-friendly interfaces very quickly.
*   **Animations:** Powered by **Framer Motion**, which gives the application smooth, modern animations and transitions to make it feel premium.
*   **Icons & Charts:** We use **Lucide React** for clean, consistent icons and **Recharts** to display data visually (like progress tracking or statistics).
*   **State Management:** Managed by **Zustand**. This keeps track of what the user is doing (like being logged in or viewing a specific course) across different pages seamlessly.
*   **Engine:** Powered by **Vite**, making the application incredibly fast to load and run.

---

## 3. The Backend: The Brain of the Application
The Backend handles the logic, security, and communication with the database.

*   **Core Technology:** Built using **Node.js** and **Express**. This is a highly popular, robust environment that allows us to run our server efficiently and handle many users at once.
*   **Language:** Both the frontend and backend are written in **TypeScript**. TypeScript is a stricter version of JavaScript that catches errors *before* the application runs, making the software much more reliable and less prone to crashing.
*   **Security & Authentication:** 
    *   We use **JSON Web Tokens (JWT)** to securely keep users logged in.
    *   It also supports **Google Authentication**, allowing users to sign in seamlessly using their Google accounts.
    *   Passwords are securely scrambled (hashed) using **bcrypt** so they are never stored in plain text.

---

## 4. The Database: Where Data Lives
*   **Database Tooling:** We use **Prisma**. Prisma acts as a bridge between our Backend code and the Database itself. It makes talking to the database safer and faster, ensuring our data structure remains consistent.
*   **Database System:** The system is designed to work with **PostgreSQL** (a powerful, industry-standard database) for live production, ensuring high performance, scalability, and security for your user data.

---

## 5. Hosting & Deployment: Where it Lives on the Internet
*   **Hosting Platform:** The application is configured to be deployed on **Render**. Render is a modern, reliable cloud platform that hosts both our Backend API and our Frontend website, making sure they are always online, secure, and ready for users to access.

---

### Summary
The StudyBuddy application is built using a modern, industry-standard **"Tech Stack."** It is designed not just to work well today, but to be scalable, secure, and easy to maintain as your user base and feature requirements grow in the future.

# Employee Management System (MERN Stack)

An industrial-level Employee Management System built with the **MERN Stack** (MongoDB, Express, React, Node.js). This application features role-based access control (RBAC), JWT authentication, and a modern UI using **shadcn/ui** and **Tailwind CSS**.

## Key Features

- **Secure Authentication:** JWT-based login with secure password hashing (bcrypt).
- **busts Role-Based Access Control (RBAC):**
  - **Admin:** Full access (Add, Edit, Delete, View Employees).
  - **Staff:** Read-only access (View Employee List).
- **Salary Calculation:** Automated logic to calculate total salary based on Basic + (OT Hours * OT Rate).
- **Modern UI:** Built with **shadcn/ui** and **Tailwind CSS** for a professional, responsive look.
- **Advanced Features:** Real-time data updates, secure API endpoints, and clean MVC architecture.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, shadcn/ui, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Security:** JSON Web Tokens (JWT), Bcryptjs

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas Account

### 1. Clone the Repository
\`\`\`bash
git clone <https://github.com/iratnayak/ems-backend.git>
cd ems-mern-app
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd ems-backend
npm install
# Create a .env file and add:
# MONGO_URI=your_mongodb_connection_string
# PORT=5001
npm run dev
\`\`\`

### 3. Frontend Setup
\`\`\`bash
cd ems-frontend
npm install
npm run dev
\`\`\`

---
Developed by ** Isuru Rathnayake ** - Software Engineer
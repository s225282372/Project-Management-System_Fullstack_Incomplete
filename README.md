
# 🌐 IT Project Management System (Full-Stack)

This is a full-stack project management web application for IT teams. It includes a **React.js frontend** and an **ASP.NET Core Web API backend**, supported by **Entity Framework Core** and **SQL Server**.

> 🔐 Role-based access for: Administrator, Project Manager, Systems Analyst, and Web Developer

---

## 🚀 Features

### Backend (ASP.NET Core Web API)
- RESTful API using ASP.NET Core
- Entity Framework Core for database access
- ASP.NET Identity for authentication and role management
- Role seeding and default admin creation
- Swagger integration for API documentation

### Frontend (React.js)
- Modern UI built with React
- Role-based dynamic routing and UI
- JWT authentication and protected routes
- Role-specific dashboards:
  - Admin: User management
  - PM: Project and task creation
  - Analyst & Developer: View and update assigned tasks

---

## 🔧 Technologies Used

| Layer        | Tech Stack                         |
|--------------|-------------------------------------|
| Frontend     | React.js, Bootstrap, Axios          |
| Backend      | ASP.NET Core Web API, EF Core       |
| Auth         | ASP.NET Identity, JWT Bearer Tokens |
| Database     | SQL Server                          |
| Docs & Tools | Swagger, Postman, GitHub            |

---

## 🏗️ System Architecture

```
[ React Frontend ] ⇄ [ ASP.NET Core API ] ⇄ [ SQL Server DB ]
```

---

## 🔐 User Roles and Permissions

| Role              | Dashboard Access | Manage Users | Create Projects | Assign Tasks | View Tasks | Update Task Status |
|-------------------|------------------|---------------|------------------|---------------|-------------|---------------------|
| Administrator     | ✅               | ✅            | ❌               | ❌            | ❌          | ❌                  |
| Project Manager   | ✅               | ❌            | ✅               | ✅            | ✅          | ❌                  |
| Systems Analyst   | ✅               | ❌            | ❌               | ❌            | ✅          | ✅                  |
| Web Developer     | ✅               | ❌            | ❌               | ❌            | ✅          | ✅                  |

---

## 📸 Screenshots

this is the progress so far, the *Admin* can add, view, delete and update the employees:
![Screenshot (91)](https://github.com/user-attachments/assets/93a80322-4cd8-48ac-ad45-d68460075b6d)


---

## 🧪 Sample API Endpoints

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/projects`
- `POST /api/projects`
- `POST /api/tasks`
- `PUT /api/tasks/{id}/status`

---

## ✍️ Author

- **Maselaelo Glen**
- Final-Year Software Engineering Student 

---
**⚠️Note: This is also incomplete, still under construction too🏗️**

*Open to any suggestions, contributions and forks are welcome*

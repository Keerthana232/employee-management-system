# Employee Management System

A full-stack web application to manage employees and departments, built with Java Spring Boot on the backend and HTML, CSS, Bootstrap, and JavaScript on the frontend.

**GitHub:** https://github.com/Keerthana232/employee-management-system
**Live Demo:** Live Demo: https://employee-management-system-zeta-gray.vercel.app

---

## Technologies Used

**Backend:** Java, Spring Boot, Spring Data JPA (Hibernate), PostgreSQL, Maven
**Frontend:** HTML, CSS, Bootstrap 5, JavaScript (Fetch API)
**Tools:** Eclipse/IntelliJ IDEA, VS Code, Git, GitHub, Postman

---

## Features

### Employee Management
- Add, view, update, and delete employee records
- Each employee linked to a department (name, email, phone, salary, joining date)
- Search employees by name or email in real time
- Filter employee list by department

### Department Management
- Add, view, update, and delete departments
- Department list dynamically reflected across the application (dropdowns, filters)

### Dashboard
- Live statistics: total employees, total departments, highest salary, average salary
- Recent employees table for a quick overview

### Reports
- Total, highest, lowest, and average salary reports
- Department-wise employee count with percentage share
- Click on a department to instantly view only that department's employees (drill-down navigation)

### Architecture
- RESTful APIs built with Spring Boot, consumed by the frontend using the Fetch API
- Layered backend structure: Controller → Service → Repository → Entity
- Responsive sidebar-based admin UI

---

## Project Structure

```
employee-management-system/
├── backend/                  # Spring Boot project
│   └── src/main/java/.../
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── entity/
│       ├── exception/
│       └── config/
├── frontend/                 # Static frontend
│   ├── index.html            # Dashboard
│   ├── css/style.css
│   ├── js/
│   │   ├── dashboard.js
│   │   ├── employee.js
│   │   ├── department.js
│   │   └── report.js
│   └── pages/
│       ├── employees.html
│       ├── addEmployee.html
│       ├── editEmployee.html
│       ├── departments.html
│       └── reports.html
└── README.md
```

---

## How to Run Locally

### Backend
1. Open the `backend` folder in Eclipse/IntelliJ as a Maven project
2. Update database credentials in `src/main/resources/application.properties`:
   ```
   spring.datasource.url=jdbc:postgresql://localhost:5432/employee_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
3. Run the main application class
4. Backend starts on `http://localhost:8080`

### Frontend
1. Open the `frontend` folder in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Make sure the backend is running before using the app

---

## API Endpoints (Sample)

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/employees` | Get all employees |
| POST | `/employees/save` | Add a new employee |
| PUT | `/employees/{id}` | Update an employee |
| DELETE | `/employees/{id}` | Delete an employee |
| GET | `/employees/department/{name}` | Get employees by department |
| GET | `/employees/reports/total` | Total employee count |
| GET | `/employees/reports/highestSalary` | Highest salary |
| GET | `/employees/reports/averageSalary` | Average salary |
| GET | `/departments` | Get all departments |
| POST | `/departments` | Add a new department |
| PUT | `/departments/{id}` | Update a department |
| DELETE | `/departments/{id}` | Delete a department |

---

## Author

Keerthana
Trained in Java Full Stack Development at Code99 IT Academy

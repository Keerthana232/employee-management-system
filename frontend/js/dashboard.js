const API_BASE = "http://localhost:8080";

fetch(API_BASE + "/employees/reports/total")
  .then(res => res.json())
  .then(data => {
    document.getElementById("totalEmployees").innerText = data;
  });

fetch(API_BASE + "/departments")
  .then(res => res.json())
  .then(data => {
    document.getElementById("totalDepartments").innerText = data.length;
  });

fetch(API_BASE + "/employees/reports/highestSalary")
  .then(res => res.json())
  .then(data => {
    document.getElementById("highestSalary").innerText = "₹" + data;
  });

fetch(API_BASE + "/employees/reports/averageSalary")
  .then(res => res.json())
  .then(data => {
    document.getElementById("averageSalary").innerText = "₹" + data.toFixed(2);
  });

// Recent employees (first 5 from the full list)
fetch(API_BASE + "/employees")
  .then(res => res.json())
  .then(data => {
    let tbody = document.getElementById("recentEmployees");
    if (!tbody) return;

    let recent = data.slice(0, 5);

    tbody.innerHTML = "";

    recent.forEach(emp => {
      tbody.innerHTML += `
        <tr>
          <td>${emp.empId}</td>
          <td>${emp.empName}</td>
          <td>${emp.email}</td>
          <td>${emp.department ? emp.department.deptName : "-"}</td>
          <td>₹${emp.salary}</td>
        </tr>
      `;
    });
  });

const BASE_URL = "http://localhost:8080/employees/reports";

// Total Employees
fetch(BASE_URL + "/total")
.then(res => res.json())
.then(data => {
    document.getElementById("total").innerText = data;
});

// Highest Salary
fetch(BASE_URL + "/highestSalary")
.then(res => res.json())
.then(data => {
    document.getElementById("highest").innerText = "₹" + data;
});

// Lowest Salary
fetch(BASE_URL + "/lowestSalary")
.then(res => res.json())
.then(data => {
    document.getElementById("lowest").innerText = "₹" + data;
});

// Average Salary
fetch(BASE_URL + "/averageSalary")
.then(res => res.json())
.then(data => {
    document.getElementById("average").innerText = "₹" + data.toFixed(2);
});

// ---------------- Click a department -> view its employees ----------------

function goToDeptEmployees(deptId) {
    window.location.href = "employees.html?deptId=" + deptId;
}

// ---------------- Department-wise Employee Count ----------------

Promise.all([
    fetch("http://localhost:8080/departments").then(res => res.json()),
    fetch("http://localhost:8080/employees").then(res => res.json())
])
.then(([departments, employees]) => {

    let tbody = document.getElementById("deptCountTable");
    if (!tbody) return;

    let totalEmployees = employees.length;

    // Count employees per department id
    let counts = {};
    employees.forEach(emp => {
        if (emp.department) {
            let id = emp.department.deptId;
            counts[id] = (counts[id] || 0) + 1;
        }
    });

    tbody.innerHTML = "";

    departments.forEach(dept => {
        let count = counts[dept.deptId] || 0;
        let percent = totalEmployees > 0 ? ((count / totalEmployees) * 100).toFixed(0) : 0;

        tbody.innerHTML += `
        <tr style="cursor:pointer;" onclick="goToDeptEmployees(${dept.deptId})" title="Click to view ${dept.deptName} employees">
            <td>${dept.deptName}</td>
            <td>${count}</td>
            <td>
                <div class="progress" style="height:8px;">
                    <div class="progress-bar bg-primary" style="width:${percent}%"></div>
                </div>
                <small class="text-muted">${percent}%</small>
            </td>
        </tr>
        `;
    });
});


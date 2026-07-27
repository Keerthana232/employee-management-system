const BASE_URL = "http://localhost:8080/employees";
const DEPT_URL = "http://localhost:8080/departments";

// ---------------- Employee List ----------------

function renderRows(data) {
    let table = document.getElementById("employeeTable");
    if (!table) return;

    table.innerHTML = "";

    data.forEach(emp => {
        table.innerHTML += `
        <tr>
            <td>${emp.empId}</td>
            <td>${emp.empName}</td>
            <td>${emp.email}</td>
            <td>${emp.phone}</td>
            <td>₹${emp.salary}</td>
            <td>${emp.joiningDate}</td>
            <td>${emp.department ? emp.department.deptName : "-"}</td>
            <td>
                <button class="btn btn-warning btn-sm btn-icon" title="Edit"
                    onclick="editEmployee(${emp.empId})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm btn-icon" title="Delete"
                    onclick="deleteEmployee(${emp.empId})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
        `;
    });
}

function loadEmployees() {
    let table = document.getElementById("employeeTable");
    if (!table) return;

    fetch(BASE_URL)
        .then(res => res.json())
        .then(data => renderRows(data));
}

// ---------------- Department dropdown (filter + forms) ----------------

function populateDepartmentSelect(selectEl, selectedId) {
    fetch(DEPT_URL)
        .then(res => res.json())
        .then(depts => {
            depts.forEach(dept => {
                let opt = document.createElement("option");
                opt.value = dept.deptId;
                opt.text = dept.deptName;
                if (selectedId && String(selectedId) === String(dept.deptId)) {
                    opt.selected = true;
                }
                selectEl.appendChild(opt);
            });
        });
}

let deptFilterEl = document.getElementById("departmentFilter");
if (deptFilterEl) {
    const urlParams = new URLSearchParams(window.location.search);
    const preselectDeptId = urlParams.get("deptId");

    populateDepartmentSelect(deptFilterEl, preselectDeptId);

    if (preselectDeptId) {
        // Wait for the options to be added before triggering the filter
        setTimeout(() => filterDepartment(), 300);
    }
}

let deptFormEl = document.getElementById("department");
if (deptFormEl && !document.getElementById("editEmployeeForm")) {
    populateDepartmentSelect(deptFormEl);
}

// ---------------- Delete ----------------

function deleteEmployee(id) {
    if (confirm("Delete this employee?")) {
        fetch(BASE_URL + "/" + id, {
            method: "DELETE"
        })
        .then(() => {
            alert("Employee Deleted");
            loadEmployees();
        });
    }
}

// ---------------- Open Edit Page ----------------

function editEmployee(id) {
    window.location.href = "editEmployee.html?id=" + id;
}

// ---------------- Add Employee ----------------

let addForm = document.getElementById("employeeForm");

if (addForm) {

    addForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let employee = {
            empName: empName.value,
            email: email.value,
            phone: phone.value,
            salary: salary.value,
            joiningDate: joiningDate.value,
            department: {
                deptId: department.value
            }
        };

        fetch(BASE_URL + "/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
        .then(() => {
            alert("Employee Added");
            window.location = "employees.html";
        });
    });
}

// ---------------- Edit Employee ----------------

let editForm = document.getElementById("editEmployeeForm");

if (editForm) {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    fetch(BASE_URL + "/" + id)
        .then(res => res.json())
        .then(emp => {
            empName.value = emp.empName;
            email.value = emp.email;
            phone.value = emp.phone;
            salary.value = emp.salary;
            joiningDate.value = emp.joiningDate;

            let deptSelect = document.getElementById("department");
            populateDepartmentSelect(deptSelect, emp.department ? emp.department.deptId : null);
        });

    editForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let employee = {
            empName: empName.value,
            email: email.value,
            phone: phone.value,
            salary: salary.value,
            joiningDate: joiningDate.value,
            department: {
                deptId: department.value
            }
        };

        fetch(BASE_URL + "/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
        .then(() => {
            alert("Employee Updated");
            window.location = "employees.html";
        });
    });
}

loadEmployees();

// ---------------- Search ----------------

function searchEmployee() {
    let search = document.getElementById("searchEmployee").value.toLowerCase();
    let rows = document.querySelectorAll("#employeeTable tr");

    rows.forEach(row => {
        let name = row.cells[1].innerText.toLowerCase();
        let email = row.cells[2].innerText.toLowerCase();

        if (name.includes(search) || email.includes(search)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// ---------------- Filter by Department ----------------

function filterDepartment() {
    let deptSelect = document.getElementById("departmentFilter");
    let deptId = deptSelect.value;

    if (deptId === "") {
        loadEmployees();
        return;
    }

    // Backend's /department/{name} endpoint matches by department NAME, not ID
    let deptName = deptSelect.options[deptSelect.selectedIndex].text;

    fetch(BASE_URL + "/department/" + encodeURIComponent(deptName))
        .then(res => res.json())
        .then(data => renderRows(data));
}

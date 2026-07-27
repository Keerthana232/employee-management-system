const DEPT_URL = "http://localhost:8080/departments";

// ---------------- Load Departments ----------------

function loadDepartments() {

    fetch(DEPT_URL)
    .then(res => res.json())
    .then(data => {

        let table = document.getElementById("departmentTable");

        if (table) {

            table.innerHTML = "";

            data.forEach(dept => {

                table.innerHTML += `
                <tr>
                    <td>${dept.deptId}</td>
                    <td>${dept.deptName}</td>
                    <td>
                        <button class="btn btn-warning btn-sm btn-icon" title="Edit"
                            onclick="editDepartment(${dept.deptId}, '${dept.deptName}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-danger btn-sm btn-icon" title="Delete"
                            onclick="deleteDepartment(${dept.deptId})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
                `;

            });

        }

    });

}

// ---------------- Save Department ----------------

function saveDepartment() {

    let deptName = document.getElementById("deptName").value;

    if (deptName == "") {
        alert("Enter Department Name");
        return;
    }

    fetch(DEPT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            deptName: deptName
        })
    })
    .then(response => response.json())
    .then(() => {
        alert("Department Added");
        document.getElementById("deptName").value = "";
        loadDepartments();
    });

}

// ---------------- Edit Department ----------------

function editDepartment(id, name) {

    let newName = prompt("Edit Department Name", name);

    if (newName == null || newName == "")
        return;

    fetch(DEPT_URL + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            deptName: newName
        })
    })
    .then(() => {
        alert("Department Updated");
        loadDepartments();
    });

}

// ---------------- Delete Department ----------------

function deleteDepartment(id) {

    if (!confirm("Delete this department?")) {
        return;
    }

    fetch(DEPT_URL + "/" + id, {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(message => {
        alert(message);
        loadDepartments();
    })
    .catch(() => {
        alert("Server Error");
    });

}

loadDepartments();

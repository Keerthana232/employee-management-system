package com.employee.EmployeManagemnetSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.employee.EmployeManagemnetSystem.entity.Department;
import com.employee.EmployeManagemnetSystem.service.DepartmentService;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService dserv;

    @PostMapping
    public Department saveDepartment(@RequestBody Department dept) {
        return dserv.saveDepartment(dept);
    }

    @GetMapping
    public List<Department> getAllDepartments() {
        return dserv.getAllDepartments();
    }

    @GetMapping("/{id}")
    public Department getDepartmentById(@PathVariable int id) {
        return dserv.getDepartmentById(id);
    }

    @PutMapping("/{id}")
    public Department updateDepartment(@PathVariable int id,
                                       @RequestBody Department dept) {
        return dserv.updateDepartment(id, dept);
    }
    @DeleteMapping("/{id}")

    public ResponseEntity<String> deleteDepartmentById(@PathVariable int id) {

        try {

            dserv.deleteDepartmentById(id);

            return ResponseEntity.ok("Department deleted successfully.");

        } catch (DataIntegrityViolationException e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Cannot delete this department because employees are assigned to it.");

        } catch (RuntimeException e) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Department not found.");

        }

    }

    @DeleteMapping
    public String deleteAllDepartments() {
        return dserv.deleteAllDepartments();
    }
}
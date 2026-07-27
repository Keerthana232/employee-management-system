package com.employee.EmployeManagemnetSystem.service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import org.springframework.dao.DataIntegrityViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.EmployeManagemnetSystem.entity.Department;
import com.employee.EmployeManagemnetSystem.repository.DepartmentRepository;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository drepo;

    
    public Department saveDepartment(Department dept) {
        return drepo.save(dept);
    }

    
    public List<Department> getAllDepartments() {
        return drepo.findAll();
    }

    
    public Department getDepartmentById(int id) {
        return drepo.findById(id).orElse(null);
    }

    
    public Department updateDepartment(int id, Department dept) {

        Department existingDepartment = drepo.findById(id).orElse(null);

        if (existingDepartment != null) {

            existingDepartment.setDeptName(dept.getDeptName());

            return drepo.save(existingDepartment);
        }

        return null;
    }
    @Transactional
    public void deleteDepartmentById(int id) {

        Department dept = drepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        drepo.delete(dept);

        drepo.flush();
    }    

    
    public String deleteAllDepartments() {

        drepo.deleteAll();

        return "All departments deleted successfully.";
    }
}
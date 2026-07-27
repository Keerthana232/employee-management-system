package com.employee.EmployeManagemnetSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.employee.EmployeManagemnetSystem.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Integer>{

    
    List<Employee> findByEmpName(String empName);

    
    List<Employee> findByDepartmentDeptName(String deptName);

    

    @Query("SELECT COUNT(e) FROM Employee e")
    long getTotalEmployees();

    @Query("SELECT MAX(e.salary) FROM Employee e")
    Double getHighestSalary();

    @Query("SELECT MIN(e.salary) FROM Employee e")
    Double getLowestSalary();

    @Query("SELECT AVG(e.salary) FROM Employee e")
    Double getAverageSalary();

}
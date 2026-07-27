package com.employee.EmployeManagemnetSystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.EmployeManagemnetSystem.entity.Employee;
import com.employee.EmployeManagemnetSystem.exception.ResourceNotFoundException;
import com.employee.EmployeManagemnetSystem.repository.EmployeeRepository;

@Service
public class EmployeeServ {
	@Autowired
	EmployeeRepository erepo;
	
	public Employee saveEmployee(Employee emp) {
		return erepo.save(emp);
		
	}
	public List<Employee> saveAllEmployees(List<Employee> employees) {
	    return erepo.saveAll(employees);
	}
	public List<Employee> getAllEmployees(){
		return erepo.findAll();
	}
	public Employee getEmployeeById(int id) {

	    return erepo.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

	}
	public Employee updateEmployee(int id, Employee emp) {

	    Employee existingEmployee = erepo.findById(id).orElse(null);

	    if (existingEmployee != null) {

	        existingEmployee.setEmpName(emp.getEmpName());
	        existingEmployee.setEmail(emp.getEmail());
	        existingEmployee.setPhone(emp.getPhone());
	        existingEmployee.setSalary(emp.getSalary());
	        existingEmployee.setJoiningDate(emp.getJoiningDate());
	        existingEmployee.setDepartment(emp.getDepartment());

	        return erepo.save(existingEmployee);
	    }

	    throw new ResourceNotFoundException("Employee not found");
	}
	public String deleteAllEMployees() {
		 erepo.deleteAll();
		 return "ALL Emlpyees deleted";
		
	}
	public String deleteById(int id) {

	    Employee employee = erepo.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

	    erepo.delete(employee);

	    return "Employee deleted successfully.";

	}
	// Search

	public List<Employee> searchEmployeeByName(String name){

	    return erepo.findByEmpName(name);

	}


	// Filter

	public List<Employee> filterByDepartment(String deptName){

	    return erepo.findByDepartmentDeptName(deptName);

	}

	public long totalEmployees(){

	    return erepo.getTotalEmployees();

	}

	public Double highestSalary(){

	    return erepo.getHighestSalary();

	}

	public Double lowestSalary(){

	    return erepo.getLowestSalary();

	}

	public Double averageSalary(){

	    return erepo.getAverageSalary();

	}
	public List<Employee> getEmployeesByDepartment(String deptName) {
	    return erepo.findByDepartmentDeptName(deptName);
	}
}

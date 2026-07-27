package com.employee.EmployeManagemnetSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employee.EmployeManagemnetSystem.entity.Employee;
import com.employee.EmployeManagemnetSystem.service.EmployeeServ;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
	@Autowired
	EmployeeServ eserv;

	@PostMapping("/save")
	public Employee saveEmployee(@Valid @RequestBody Employee emp) {
		return eserv.saveEmployee(emp);
	}
	@PostMapping("/saveAll")
	public List<Employee> saveAllEmployees(@RequestBody List<Employee> employees) {
	    return eserv.saveAllEmployees(employees);
	}
	@GetMapping
	public List<Employee> getAllEmployees(){
		return eserv.getAllEmployees();
	}
	@GetMapping("/{id}")
	public Employee getEmployeeById(@PathVariable int id) {
		return eserv.getEmployeeById(id);
	}
	@PutMapping("/{id}")
	public Employee updateEmployee(@Valid @PathVariable int id,
	                               @RequestBody Employee emp) {
	    return eserv.updateEmployee(id, emp);
	}
	

	@DeleteMapping
	public String deleteAllEmployees() {
		 eserv.deleteAllEMployees();
		 return "deleted";
	}
	@DeleteMapping("/{id}")
public String deleteById( @PathVariable int id) {
		
		eserv.deleteById(id);
		return "Employee deleted successfully.";
	}
	
	@GetMapping("/search")
	public List<Employee> searchEmployee(@RequestParam String name){

	    return eserv.searchEmployeeByName(name);

	}

	@GetMapping("/filter")
	public List<Employee> filterDepartment(@RequestParam String deptName){

	    return eserv.filterByDepartment(deptName);

	}

	@GetMapping("/reports/total")
	public long totalEmployees(){

	    return eserv.totalEmployees();

	}


	@GetMapping("/reports/highestSalary")
	public Double highestSalary(){

	    return eserv.highestSalary();

	}


	@GetMapping("/reports/lowestSalary")
	public Double lowestSalary(){

	    return eserv.lowestSalary();

	}


	@GetMapping("/reports/averageSalary")
	public Double averageSalary(){

	    return eserv.averageSalary();

	}
	@GetMapping("/department/{deptName}")
	public List<Employee> getEmployeesByDepartment(@PathVariable String deptName) {
	    return eserv.getEmployeesByDepartment(deptName);
	}
}

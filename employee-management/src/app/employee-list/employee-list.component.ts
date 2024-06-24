import { Component,OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
    employees: Employee[] = [];
    newEmployee: Employee = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      position: '',
      department: ''
    };
  
    constructor(private employeeService: EmployeeService) { }
  
    ngOnInit(): void {
      this.getEmployees();
    }
  
    getEmployees(): void {
      this.employeeService.getEmployees().subscribe(
        (employees) => this.employees = employees,
        (error) => console.error('Error fetching employees:', error)
      );
    }

    deleteEmployee(id: any): void {
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          this.employees = this.employees.filter(emp => emp.id !== id);
        },
        (error) => console.error('Error deleting employee:', error)
      );
    }

    addEmployee(): void {
      console.log(this.newEmployee); 
      this.employeeService.addEmployee(this.newEmployee).subscribe(
        (employee) => {
          this.employees.push(employee);
          this.newEmployee = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            position: '',
            department: ''
          };
        },
        (error) => {
          console.error('Error adding employee:', error);
          // console.error('Error details:', error.error); 

          // if (error.error && error.error.errors) {
          //   for (const [field, errors] of Object.entries(error.error.errors)) {
          //     console.error(`Validation error in field "${field}": ${errors}`);
          //   }
          // }
        }
      );
    }
     
  
}

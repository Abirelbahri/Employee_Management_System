import { Component,OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
    employees: Employee[] = [];
  
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

}

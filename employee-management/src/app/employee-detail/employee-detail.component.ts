import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployee(id).subscribe(employee => this.employee = employee);
  }
}

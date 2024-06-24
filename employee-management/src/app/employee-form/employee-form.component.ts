import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  imports : [RouterModule , CommonModule, FormsModule, ReactiveFormsModule ]
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.employeeService.getEmployee(id).subscribe(employee => this.employeeForm.patchValue(employee));
    }
  }

  onSubmit(): void {
    const employeeData = this.employeeForm.value;
  
    if (this.isEdit) {
      const id = this.route.snapshot.paramMap.get('id')!;
      employeeData.id = id;
      this.employeeService.updateEmployee(id, employeeData).subscribe(
        () => this.router.navigate(['/']),
        (error) => console.error('Error updating employee:', error)
      );
    } else {
      this.employeeService.addEmployee(employeeData).subscribe(
        () => this.router.navigate(['/']),
        (error) => console.error('Error adding employee:', error)
      );
    }
  }
  
}

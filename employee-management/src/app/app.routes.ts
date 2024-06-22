import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

export const routes: Routes = [
    { path: '', component: EmployeeListComponent },
    { path: 'employee/:id', component: EmployeeDetailComponent },
    { path: 'add', component: EmployeeFormComponent },
    { path: 'edit/:id', component: EmployeeFormComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

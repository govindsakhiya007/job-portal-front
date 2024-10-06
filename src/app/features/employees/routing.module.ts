import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '../employees/list/list.component';
import { CreateEditComponent } from '../employees/create-edit/create-edit.component';

const routes: Routes = [
	{ path: '', component: ListComponent }, // Default route for listing employees
	{ path: 'create', component: CreateEditComponent }, // Create new employee
	{ path: 'edit/:id', component: CreateEditComponent }, // Edit existing employee
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
	
export class RoutingModule { }
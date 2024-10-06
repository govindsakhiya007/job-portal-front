import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'employees',
		loadChildren: () => import('./features/employees/employees.module').then(m => m.EmployeesModule)
	},
	{ path: '', redirectTo: '/employees', pathMatch: 'full' }, // Default route redirects to employee list
	{ path: '**', redirectTo: '/employees' } // Wildcard route for handling 404s
];
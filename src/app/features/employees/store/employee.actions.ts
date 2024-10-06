import { createAction, props } from '@ngrx/store';
import { Employee } from '../../../core/models/employee.model';

// Action for creating an employee
export const createEmployee = createAction(
	'[Employee] Create Employee',
	props<{ employee: Employee }>()
);

// Action for updating an employee
export const updateEmployee = createAction(
	'[Employee] Update Employee',
	props<{ id: string; employee: Employee }>()
);

// Action for deleting an employee
export const deleteEmployee = createAction(
	'[Employee] Delete Employee',
	props<{ id: number }>()
);

// Action for loading all employees
export const loadEmployees = createAction('[Employee] Load Employees');

// Action for successfully loaded employees
export const loadEmployeesSuccess = createAction(
	'[Employee] Load Employees Success',
	props<{ employees: Employee[] }>()
);

// Action for failed employee loading
export const loadEmployeesFailure = createAction(
	'[Employee] Load Employees Failure',
	props<{ error: any }>()
);
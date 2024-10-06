// employee.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as EmployeeActions from './employee.actions';
import { Employee } from '../../../core/models/employee.model';

// Define the state shape for employee management
export interface EmployeeState {
  employees: Employee[]; // List of employees
  error: string | null; // Error state
}

// Initial state of the employee feature
export const initialState: EmployeeState = {
  employees: [],
  error: null,
};

// Create the reducer function
export const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    error: null,
  })),
  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(EmployeeActions.createEmployee, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    loading: false
  })),
  on(EmployeeActions.updateEmployee, (state) => ({
    ...state,
    error: null, // Reset error on update
  })),
  on(EmployeeActions.deleteEmployee, (state) => ({
    ...state,
    error: null, // Reset error on delete
  }))
);

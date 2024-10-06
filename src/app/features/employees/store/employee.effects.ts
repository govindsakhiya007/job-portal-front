import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as EmployeeActions from './employee.actions';

import { EmployeeService } from '../../../core/services/employee.service';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}

  // Effect for loading all employees
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      mergeMap(() =>
        this.employeeService.getEmployees().pipe(
          map(employees => EmployeeActions.loadEmployeesSuccess({ employees })),
          catchError(error => of(EmployeeActions.loadEmployeesFailure({ error })))
        )
      )
    )
  );

  // Effect for creating an employee
  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.createEmployee),
      mergeMap(action =>
        this.employeeService.createEmployee(action.employee).pipe(
          map(employee => {
            return EmployeeActions.loadEmployees(); // Reload employee list
          }),
          catchError(error => of(EmployeeActions.loadEmployeesFailure({ error })))
        )
      )
    )
  );

  // Effect for updating an employee
  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      mergeMap(action =>
        this.employeeService.updateEmployee(action.id, action.employee).pipe(
          map(() => {
            return EmployeeActions.loadEmployees(); // Reload employee list
          }),
          catchError(error => of(EmployeeActions.loadEmployeesFailure({ error })))
        )
      )
    )
  );

  // Effect for deleting an employee
  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      mergeMap(action =>
        this.employeeService.deleteEmployee(action.id).pipe(
          map(() => {
            return EmployeeActions.loadEmployees(); // Reload employee list
          }),
          catchError(error => of(EmployeeActions.loadEmployeesFailure({ error })))
        )
      )
    )
  );
}

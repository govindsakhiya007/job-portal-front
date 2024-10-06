import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';

@Component({
	selector: 'employees-list',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './list.component.html',
	styleUrl: './list.component.scss'
})

export class ListComponent implements OnInit {
	employees: Employee[] = [];

	constructor(private employeeService: EmployeeService) { }

	ngOnInit(): void {
		this.loadEmployees();
	}
	
	loadEmployees() {
		this.employeeService.getEmployees().subscribe((data) => {
			this.employees = data;
		});
	}

	deleteEmployee(id: number | undefined) {
		if (id) {
			this.employeeService.deleteEmployee(id).subscribe(() => {
				this.loadEmployees();
			});
		}
	}
}

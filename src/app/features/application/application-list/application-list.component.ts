import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ApplicationService } from '../../../core/services/application.service';

@Component({
	selector: 'app-application-list',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './application-list.component.html',
	styleUrl: './application-list.component.scss'
})

export class ApplicationListComponent {
	applications: any[] = [];

	constructor(
		private applicationService: ApplicationService,
		private toastr: ToastrService
	) {}

	ngOnInit() {
		this.getApplications();
	}

	getApplications() {
		this.applicationService.getApplications().subscribe({
			next: (data) => {
				this.applications = data;
			},
			error: (err) => {
				this.toastr.error(err.message || 'Application get failed!');
			}
		});
	}

	updateStatus(application: any) {
		this.applicationService.updateApplicationStatus(application.id, application.status).subscribe({
			next: () => {
				this.toastr.success('Status updated successfully', 'Jobs');
			},
			error: (err) => {
				this.toastr.error(err.message || 'Jobs apply failed!');
			}
		});
	}
}

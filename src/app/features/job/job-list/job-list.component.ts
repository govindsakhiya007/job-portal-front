import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { JobService } from '../../../core/services/job.service';

@Component({
	selector: 'app-job-list',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './job-list.component.html',
	styleUrl: './job-list.component.scss'
})

export class JobListComponent {
	jobs: any[] = [];
	userRole: string | null = '';

	constructor(private jobService: JobService) {}

	ngOnInit(): void {
		this.userRole = localStorage.getItem('role');
		this.fetchJobs();
	}

	fetchJobs(): void {
		this.jobService.getJobs().subscribe((response) => {
			this.jobs = response;
		});
	}
}
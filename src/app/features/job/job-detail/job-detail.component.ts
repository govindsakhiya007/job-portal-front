import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { JobService } from '../../../core/services/job.service';

@Component({
	selector: 'app-job-detail',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './job-detail.component.html',
	styleUrl: './job-detail.component.scss'
})

export class JobDetailComponent {
	job: any;
	jobId!: number;

	constructor(
		private route: ActivatedRoute,
		private jobService: JobService,
		private router: Router,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.jobId = Number(this.route.snapshot.paramMap.get('id'));
		this.getJobDetails();
	}

	getJobDetails() {
		this.jobService.getJobById(this.jobId).subscribe({
			next: (data) => {
				this.job = data;
			},
			error: (err) => {
				this.toastr.error(err.message || 'Jobs get failed!');
			}
		});
  	}
}

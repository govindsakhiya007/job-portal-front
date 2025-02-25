import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApplicationService } from '../../../core/services/application.service';

@Component({
	selector: 'app-job-apply',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterModule],
	templateUrl: './job-apply.component.html',
	styleUrl: './job-apply.component.scss'
})

export class JobApplyComponent {
	applicationForm!: FormGroup;
	jobId!: number;

	constructor(
		private fb: FormBuilder,
		private applicationService: ApplicationService,
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		// this.jobId = Number(this.route.snapshot.paramMap.get('id'));

		this.applicationForm = this.fb.group({
			cover_letter: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
			job_id: Number(this.route.snapshot.paramMap.get('id'))
		});
	}

	onSubmit() {
		if (this.applicationForm.valid) {
			this.applicationService.applyForJob(this.applicationForm.value).subscribe({
				next: () => {
					this.toastr.success('Application submitted successfully!', 'Jobs');
					this.router.navigate(['/jobs']);
				},
				error: (err) => {
					this.toastr.error(err.message || 'Jobs apply failed!');
				}
			});
		}	
	}
}

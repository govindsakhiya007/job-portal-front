import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { JobService } from '../../../core/services/job.service';

@Component({
	selector: 'app-job-create',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterModule],
	templateUrl: './job-create.component.html',
	styleUrl: './job-create.component.scss'
})

export class JobCreateComponent {
	jobForm!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private jobService: JobService,
		private router: Router,
		private toastr: ToastrService,
	) {
		this.jobForm = this.fb.group({
			title: ['', [Validators.required, Validators.maxLength(255)]],
			company_name: ['', [Validators.required, Validators.maxLength(255)]],
			location: ['', [Validators.required, Validators.maxLength(255)]],
			salary: ['', [Validators.required, Validators.min(0)]],
			description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
		});
	}

	onSubmit() {
		if (this.jobForm.invalid) {
			return;
		}

		this.jobService.createJob(this.jobForm.value).subscribe({
			next: () => {
				this.toastr.success('Jobs created successfully', 'Jobs');
				this.router.navigate(['/jobs']);
			},
			error: (err) => {
				this.toastr.error(err.message || 'Jobs create failed!');
			}
		});
	}
}

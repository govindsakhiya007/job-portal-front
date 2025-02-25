import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})

export class LoginComponent {
	loginForm: FormGroup;
	passwordFieldType: string = 'password';

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		private authService: AuthService
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	togglePasswordVisibility() {
		this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
	}

	onSubmit() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		this.authService.login(this.loginForm.value).subscribe({
			next: (response) => {
				if (response?.token) {
					localStorage.setItem('token', response.token);
					localStorage.setItem('role', response.role);

					this.toastr.success('Logged in successfully', 'User');
					this.router.navigate(['/jobs']);
				}
			},
			error: (err) => {
				this.toastr.error(err.message || 'Login failed!');
			}
		});
	}
}

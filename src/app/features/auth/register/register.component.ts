import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})

export class RegisterComponent {
	registerForm: FormGroup;
	passwordFieldType: string = 'password';
	confirmPasswordFieldType: string = 'password';

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		private authService: AuthService
	) {
		this.registerForm = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
			email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
			password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
			password_confirmation: ['', [Validators.required]],
			role: ['', [Validators.required]]
		}, { validator: this.passwordMatchValidator }
	);
	}

	passwordMatchValidator(form: FormGroup) {
		const password = form.get('password')?.value;
		const confirmPassword = form.get('password_confirmation')?.value;
		return password === confirmPassword ? null : { passwordMismatch: true };
	}

	togglePasswordVisibility() {
		this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
	}

	toggleConfirmPasswordVisibility() {
		this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
	}

	onSubmit() {
		if (this.registerForm.invalid) {
			return;
		}

		this.authService.register(this.registerForm.value).subscribe({
			next: (response) => {
				this.toastr.success('Registration successfully', 'User');
				this.router.navigate(['/auth/login']);
			},
			error: (err) => {
				this.toastr.error(err.message || 'Registration failed!');
			}
		});
	}
}
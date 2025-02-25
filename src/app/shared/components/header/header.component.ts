import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
	
export class HeaderComponent {
	userRole = '';

    constructor(
		private authService: AuthService,
		private router: Router,
		private toastr: ToastrService
	) {
        this.userRole = this.authService.getUserRole();
    }

    logout() {
		this.authService.logout().subscribe({
			next: () => {
				this.toastr.success('Logout successfully', 'user');
				this.router.navigate(['/auth/login']);
			},
			error: (err) => {
				this.toastr.error('Logout failed', 'user');
			}
		});
    }
}

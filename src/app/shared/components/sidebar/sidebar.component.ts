import { Component } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
	userRole = '';
	
	constructor(
		private authService: AuthService,
	) {
		this.userRole = this.authService.getUserRole();
	}
}

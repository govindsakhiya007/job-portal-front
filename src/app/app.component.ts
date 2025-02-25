import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module'; // Import SharedModule
import { CoreModule } from './core/core.module'; // Import CoreModule

import { AuthService } from './core/services/auth.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		SharedModule,
		CoreModule,
		CommonModule
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
  
export class AppComponent {
	title = 'Job Portal';
	isAuthenticated = false;

	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.isAuthenticated = this.authService.isAuthenticated();

		// Listen for auth changes
		this.authService.authStatus$.subscribe(status => {
			this.isAuthenticated = status;
		});
	}
}

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {	
	const authService = inject(AuthService);
	const router = inject(Router);

	const userRole = authService.getUserRole();
	const requiredRole = route.data?.['role'];

	if (userRole === requiredRole) {
		return true;
	}

	router.navigate(['/']);
	return false;
};

import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const router = inject(Router);
	const token = localStorage.getItem('token');

	const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

	return next(authReq).pipe(
		catchError((error: HttpErrorResponse) => {
			let errorMessage = 'An unexpected error occurred!';

			if (error.status === 401) {
				errorMessage = 'Unauthorized! Please log in again.';
				localStorage.removeItem('token');
				router.navigate(['/auth/login']);
			} else if (error.status === 403) {
				errorMessage = 'Forbidden! You do not have permission to access this resource.';
			} else if (error.status === 500) {
				errorMessage = 'Server error! Please try again later.';
			}

			return throwError(() => new Error(errorMessage));
		})
	);
};


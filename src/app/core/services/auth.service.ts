import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject } from 'rxjs';

import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
	authStatus$ = this.authStatus.asObservable();
	
	constructor(
		private http: HttpClient,
		private router: Router
	) {}

	register(user: User): Observable<User> {
		return this.http.post<User>(`${environment.apiBaseUrl}/register`, user);
	}

	login(credentials: { email: string; password: string }): Observable<User> {
		return this.http.post<User>(`${environment.apiBaseUrl}/login`, credentials).pipe(
			tap(() => {
				this.authStatus.next(true);
			})
		);
	}

	isAuthenticated(): boolean {
		return !!localStorage.getItem('token');
	}

	getUserRole(): string  {
		return localStorage.getItem('role') ?? '';
	}

	logout() {
		return this.http.post(`${environment.apiBaseUrl}/logout`, {}).pipe(
			tap(() => {
				localStorage.removeItem('token');
				localStorage.removeItem('role');

				this.authStatus.next(false);
				this.router.navigate(['/login']);
			})
		);
	}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Application } from '../models/application.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class ApplicationService {
	private apiUrl = `${environment.apiBaseUrl}/applications`;

	constructor(private http: HttpClient) {}

	applyForJob(application: Application): Observable<Application> {
		return this.http.post<Application>(`${environment.apiBaseUrl}/jobs/${application.job_id}/apply`, application);
	}

	getApplications(): Observable<Application[]> {
		return this.http.get<Application[]>(this.apiUrl);
	}

	updateApplicationStatus(id: number, status: string): Observable<Application> {
		return this.http.patch<Application>(`${this.apiUrl}/${id}/status`, { status });
	}
}

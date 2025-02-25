import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Job } from '../models/job.model';
import { environment } from '../../../environments/environment';

@Injectable({	
	providedIn: 'root'
})

export class JobService {
	private apiUrl = `${environment.apiBaseUrl}/jobs`;

	constructor(private http: HttpClient) {}

	getJobs(): Observable<Job[]> {
		return this.http.get<Job[]>(this.apiUrl);
	}

	getJobById(id: number): Observable<Job> {
		return this.http.get<Job>(`${this.apiUrl}/${id}`);
	}

	createJob(job: Job): Observable<Job> {
		return this.http.post<Job>(this.apiUrl, job);
	}
}

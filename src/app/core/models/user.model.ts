export interface User {
	id: number;
	name: string;
	email: string;
	password?: string;
	role: 'employer' | 'applicant';
	token?: string;
}
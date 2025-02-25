export interface Application {
	id: number;
	job_id: number;
	user_id: number;
	cover_letter: string;
	status: 'pending' | 'accepted' | 'rejected';
}

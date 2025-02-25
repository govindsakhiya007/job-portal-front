import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
	},
	{
		path: 'jobs',
		loadChildren: () => import('./features/job/job.module').then(m => m.JobModule),
		canActivate: [authGuard]
	},
	{
		path: 'applications',
		loadChildren: () => import('./features/application/application.module').then(m => m.ApplicationModule),
		canActivate: [authGuard, roleGuard],
		data: { role: 'employer' }
	},
	{ path: '', redirectTo: '/jobs', pathMatch: 'full' },
	{ path: '**', redirectTo: '' }
];
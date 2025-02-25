import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../../core/guards/auth.guard';
import { roleGuard } from '../../core/guards/role.guard';

import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { JobApplyComponent } from './job-apply/job-apply.component';

const routes: Routes = [
	{ path: '', component: JobListComponent },
	{
		path: 'create',
		component: JobCreateComponent,
		canActivate: [authGuard, roleGuard],
		data: { role: 'employer' }
	},
	{ path: ':id', component: JobDetailComponent },
	{
		path: ':id/apply',
		component: JobApplyComponent,
		canActivate: [authGuard, roleGuard],
		data: { role: 'applicant' }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class JobRoutingModule { }

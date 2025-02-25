import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { roleGuard } from '../../core/guards/role.guard';

import { ApplicationListComponent } from './application-list/application-list.component';

const routes: Routes = [
	{
		path: '',
		component: ApplicationListComponent,
		canActivate: [authGuard, roleGuard],
		data: { role: 'employer' }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class ApplicationRoutingModule { }

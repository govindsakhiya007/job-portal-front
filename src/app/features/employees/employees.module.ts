import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';

import { ListComponent } from '../employees/list/list.component';
import { CreateEditComponent } from '../employees/create-edit/create-edit.component';

@NgModule({
	imports: [
		CommonModule,
		RoutingModule,
		ListComponent,
		CreateEditComponent
	],
	exports: [ListComponent, CreateEditComponent]
})

export class EmployeesModule { }

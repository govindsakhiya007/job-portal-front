import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgWizardModule, NgWizardConfig, THEME, StepChangedArgs, NgWizardService } from 'ng-wizard';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Employee } from '../../../core/models/employee.model';
import * as EmployeeActions from '../../employees/store/employee.actions';
import { EmployeeService } from '../../../core/services/employee.service';
  
@Component({
	selector: 'employees-create-edit',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, NgWizardModule],
	templateUrl: './create-edit.component.html',
	styleUrl: './create-edit.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateEditComponent implements OnInit {
	ngWizardConfig: NgWizardConfig;
	employeeForm: FormGroup;
	currentStepIndex: number = 0; // Track current step index
	totalSteps: number = 2; // Set the total number of steps
	isEditMode: boolean = false;
	employeeId: string | null = null;
	imageFile: File | null = null;
	imagePreview: string | null = null;
	maxImageSize = 2 * 1024 * 1024; // 2 MB

	constructor(
		private formBuilder: FormBuilder,
		private ngWizardService: NgWizardService,
		private store: Store<Employee>,
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		private employeeService: EmployeeService
	) {
		this.employeeForm = this.formBuilder.group({
			global_ID: ['', Validators.required],
			unit_Id: ['', Validators.required],
			employee_type: ['', Validators.required],
			employee_Id: ['', Validators.required],
			salute: ['', Validators.required],
			first_name: ['', Validators.required],
			middle_name: [''],
			last_name: ['', Validators.required],
			gender: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
			window_login_Id: [''],
			domain_name: [''],
			direct_indirect: ['', Validators.required],
			deputation_start_date: [''],
			deputation_end_date: [''],
			deputation_location: [''],
			shift_rule: [''],
			remarks: [''],
			interview_date: [''],
			unit_DOJ: ['', Validators.required],
			group_DOJ: ['', Validators.required],
			confirmed: [false],
			confirmation_date: [''],
			extended_month: [''],
			extended_date_reason: [''],
			current_group_experiences: [''],
			department: [''],
			select_code: [''],
			designation: [''],
			grade: [''],
			location: [''],
			resignation_date: [''],
			unit_DOL: [''],
			group_DOL: [''],
			reason_for_leaving: [''],
			retirement_Date: [''],
			profile_img: ['', Validators.required],
			dob: ['', Validators.required],
			birth_place: [''],
			physical_status: [''],
			blood_group: [''],
			national_Id: ['', Validators.required],
			personal_email: ['', Validators.email],
			pan_no: ['', Validators.required],
			aadhar_no: [''],
			company_PF_no: [''],
			pran_number: [''],
			labour_card_no: [''],
			passport_no: [''],
			issued_on: [''],
			valid_upto: [''],
			place_Of_issue: ['']
		});

		this.ngWizardConfig = {
			selected: 0,
			theme: THEME.dots,
			toolbarSettings: {
				showNextButton: false, // Hide default Next button
				showPreviousButton: false, // Show Previous button
			}
		};
	}

	ngOnInit(): void {
		this.employeeId = this.route.snapshot.paramMap.get('id');
		if (this.employeeId) {
			this.isEditMode = true;
			this.loadEmployeeData(this.employeeId);
		}
	}

	private loadEmployeeData(id: string) {
		this.employeeService.getEmployee(id).pipe(
			catchError((error) => {
				return of(null);
			})
		).subscribe((employee: Employee | null) => {
			if (employee) {
				this.employeeForm.patchValue(employee);
				this.imagePreview = employee.profile_img || null;
			}
		});
	}

	onImageSelected(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			const file = target.files[0];
			if (file.size > this.maxImageSize) {
				this.toastr.error('Employee', 'Image size exceeds the maximum limit of 2 MB');
				this.employeeForm.get('image')?.reset();
				this.imagePreview = null;
				return;
			}
			this.imageFile = file;
			const reader = new FileReader();
			reader.onload = () => {
				this.imagePreview = reader.result as string;
			};
			reader.readAsDataURL(file);
		}
	}

	// Navigate to next step with validation check
	goToNextStep() {
		if (this.isStepValid(this.currentStepIndex)) {
		  this.ngWizardService.next(); // Go to next step if valid
		} else {
		  this.employeeForm.markAllAsTouched(); // Show validation errors
		}
	}
	
	// Move to previous step
	goToPreviousStep() {
		this.ngWizardService.previous();
	}
	
	// Submit form
	onSubmit() {
		console.log(this.employeeForm.invalid)
		if (this.employeeForm.invalid) {
			this.employeeForm.markAllAsTouched();
			return;
		}
	  
		const employeeData = this.employeeForm.value;
		if (this.imageFile) {
			const formData = new FormData();
			formData.append('image', this.imageFile);
			Object.keys(employeeData).forEach(key => {
				formData.append(key, employeeData[key]);
			});
		}

		if (this.isEditMode) {
			this.store.dispatch(EmployeeActions.updateEmployee({ id: this.employeeId!, employee: employeeData }));
			this.router.navigate(['/employees']);
		} else {
			this.store.dispatch(EmployeeActions.createEmployee({ employee: employeeData }));
			this.router.navigate(['/employees']);
		}
	}
	
	// Validate the current step's fields
	isStepValid(stepIndex: number): boolean {
		if (stepIndex === 0) { // Validate General Details step
			return this.employeeForm.controls['global_ID'].valid &&
				this.employeeForm.controls['unit_Id'].valid &&
				this.employeeForm.controls['employee_type'].valid &&
				this.employeeForm.controls['employee_Id'].valid &&
				this.employeeForm.controls['salute'].valid &&
				this.employeeForm.controls['first_name'].valid &&
				this.employeeForm.controls['middle_name'].valid &&
				this.employeeForm.controls['last_name'].valid &&
				this.employeeForm.controls['gender'].valid &&
				this.employeeForm.controls['email'].valid &&
				this.employeeForm.controls['mobile'].valid &&
				this.employeeForm.controls['window_login_Id'].valid &&
				this.employeeForm.controls['domain_name'].valid &&
				this.employeeForm.controls['direct_indirect'].valid &&
				this.employeeForm.controls['deputation_start_date'].valid &&
				this.employeeForm.controls['deputation_end_date'].valid &&
				this.employeeForm.controls['deputation_location'].valid &&
				this.employeeForm.controls['shift_rule'].valid &&
				this.employeeForm.controls['remarks'].valid &&
				this.employeeForm.controls['interview_date'].valid &&
				this.employeeForm.controls['unit_DOJ'].valid &&
				this.employeeForm.controls['group_DOJ'].valid &&
				this.employeeForm.controls['confirmed'].valid &&
				this.employeeForm.controls['confirmation_date'].valid &&
				this.employeeForm.controls['extended_month'].valid &&
				this.employeeForm.controls['extended_date_reason'].valid &&
				this.employeeForm.controls['current_group_experiences'].valid &&
				this.employeeForm.controls['department'].valid &&
				this.employeeForm.controls['select_code'].valid &&
				this.employeeForm.controls['designation'].valid &&
				this.employeeForm.controls['grade'].valid &&
				this.employeeForm.controls['location'].valid &&
				this.employeeForm.controls['resignation_date'].valid &&
				this.employeeForm.controls['unit_DOL'].valid &&
				this.employeeForm.controls['group_DOL'].valid &&
				this.employeeForm.controls['reason_for_leaving'].valid &&
				this.employeeForm.controls['retirement_Date'].valid;
		} else if (stepIndex === 1) { // Validate Personal Details step
			return this.employeeForm.controls['dob'].valid &&
				this.employeeForm.controls['birth_place'].valid &&
				this.employeeForm.controls['physical_status'].valid &&
				this.employeeForm.controls['blood_group'].valid &&
				this.employeeForm.controls['national_Id'].valid &&
				this.employeeForm.controls['personal_email'].valid &&
				this.employeeForm.controls['pan_no'].valid &&
				this.employeeForm.controls['aadhar_no'].valid &&
				this.employeeForm.controls['company_PF_no'].valid &&
				this.employeeForm.controls['pran_number'].valid &&
				this.employeeForm.controls['labour_card_no'].valid &&
				this.employeeForm.controls['passport_no'].valid &&
				this.employeeForm.controls['issued_on'].valid &&
				this.employeeForm.controls['valid_upto'].valid &&
				this.employeeForm.controls['place_Of_issue'].valid;
		}
		return true;
	}
	
	// Step change event to track current step index
	stepChanged(args: StepChangedArgs) {
		this.currentStepIndex = args.step.index;
	}
	
	// Check if current step is the first step
	isFirstStep(): boolean {
		return this.currentStepIndex === 0;
	}
	
	// Check if current step is the last step
	isLastStep(): boolean {
		return this.currentStepIndex === this.totalSteps - 1;
	}

	generateGlobalId() {
		this.employeeForm.patchValue({
			global_ID: 'global_' + new Date().getTime()
		});
	}
}
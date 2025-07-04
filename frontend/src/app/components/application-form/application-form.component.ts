import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-8 mx-auto">
          <h2 class="mb-4">{{ isEdit ? 'Edit Application' : 'New Application' }}</h2>
          
          <form [formGroup]="applicationForm" (ngSubmit)="onSubmit()">
            <div class="card">
              <div class="card-header">
                <h5>Job Information</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="position" class="form-label">Position *</label>
                    <input type="text" class="form-control" id="position" formControlName="position">
                    <div class="invalid-feedback" *ngIf="applicationForm.get('position')?.invalid && applicationForm.get('position')?.touched">
                      Position is required
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="company" class="form-label">Company *</label>
                    <input type="text" class="form-control" id="company" formControlName="company">
                    <div class="invalid-feedback" *ngIf="applicationForm.get('company')?.invalid && applicationForm.get('company')?.touched">
                      Company is required
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">Job Description</label>
                  <textarea class="form-control" id="description" rows="3" formControlName="description"></textarea>
                </div>
                <div class="mb-3">
                  <label for="requirements" class="form-label">Requirements</label>
                  <textarea class="form-control" id="requirements" rows="3" formControlName="requirements"></textarea>
                </div>
              </div>
            </div>

            <div class="card mt-4">
              <div class="card-header">
                <h5>Personal Information</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName" class="form-label">First Name *</label>
                    <input type="text" class="form-control" id="firstName" formControlName="firstName">
                    <div class="invalid-feedback" *ngIf="applicationForm.get('firstName')?.invalid && applicationForm.get('firstName')?.touched">
                      First name is required
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="lastName" class="form-label">Last Name *</label>
                    <input type="text" class="form-control" id="lastName" formControlName="lastName">
                    <div class="invalid-feedback" *ngIf="applicationForm.get('lastName')?.invalid && applicationForm.get('lastName')?.touched">
                      Last name is required
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="email" class="form-label">Email *</label>
                    <input type="email" class="form-control" id="email" formControlName="email">
                    <div class="invalid-feedback" *ngIf="applicationForm.get('email')?.invalid && applicationForm.get('email')?.touched">
                      Valid email is required
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="phone" class="form-label">Phone *</label>
                    <input type="tel" class="form-control" id="phone" formControlName="phone">
                    <div class="invalid-feedback" *ngIf="applicationForm.get('phone')?.invalid && applicationForm.get('phone')?.touched">
                      Phone is required
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">Address</label>
                  <textarea class="form-control" id="address" rows="2" formControlName="address"></textarea>
                </div>
                <div class="mb-3">
                  <label for="coverLetter" class="form-label">Cover Letter</label>
                  <textarea class="form-control" id="coverLetter" rows="5" formControlName="coverLetter"></textarea>
                </div>
                <div class="mb-3">
                  <label for="resumeUrl" class="form-label">Resume URL</label>
                  <input type="url" class="form-control" id="resumeUrl" formControlName="resumeUrl">
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-between mt-4">
              <button type="button" class="btn btn-secondary" (click)="goBack()">Cancel</button>
              <button type="submit" class="btn btn-primary" [disabled]="applicationForm.invalid">
                {{ isEdit ? 'Update' : 'Submit' }} Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card-header {
      background-color: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
    .invalid-feedback {
      display: block;
    }
    .form-control.ng-invalid.ng-touched {
      border-color: #dc3545;
    }
  `]
})
export class ApplicationFormComponent implements OnInit {
  applicationForm: FormGroup;
  isEdit = false;
  applicationId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.applicationForm = this.fb.group({
      position: ['', Validators.required],
      company: ['', Validators.required],
      description: [''],
      requirements: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      coverLetter: [''],
      resumeUrl: ['']
    });
  }

  ngOnInit() {
    this.applicationId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.applicationId;
    
    if (this.isEdit) {
      this.loadApplication();
    }
  }

  loadApplication() {
    if (this.applicationId) {
      this.applicationService.getApplication(this.applicationId).subscribe(
        (application: Application) => {
          this.applicationForm.patchValue(application);
        }
      );
    }
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      if (this.isEdit) {
        this.updateApplication();
      } else {
        this.createApplication();
      }
    }
  }

  createApplication() {
    this.applicationService.createApplication(this.applicationForm.value).subscribe(
      () => {
        this.router.navigate(['/applications']);
      }
    );
  }

  updateApplication() {
    if (this.applicationId) {
      this.applicationService.updateApplication(this.applicationId, this.applicationForm.value).subscribe(
        () => {
          this.router.navigate(['/applications']);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/applications']);
  }
}

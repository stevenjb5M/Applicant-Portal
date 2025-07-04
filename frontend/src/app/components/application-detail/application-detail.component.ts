import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container" *ngIf="application">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Application Details</h2>
            <div>
              <a [routerLink]="['/applications', application.id, 'edit']" class="btn btn-outline-primary me-2">
                Edit
              </a>
              <button class="btn btn-outline-danger" (click)="deleteApplication()">
                Delete
              </button>
            </div>
          </div>

          <div class="row">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header">
                  <h5>{{ application.position }} at {{ application.company }}</h5>
                  <span class="badge" [ngClass]="getStatusClass(application.status)">
                    {{ application.status }}
                  </span>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <h6>Job Description</h6>
                      <p>{{ application.description || 'No description provided' }}</p>
                    </div>
                    <div class="col-md-6">
                      <h6>Requirements</h6>
                      <p>{{ application.requirements || 'No requirements specified' }}</p>
                    </div>
                  </div>
                  
                  <hr>
                  
                  <div class="row">
                    <div class="col-md-6">
                      <h6>Cover Letter</h6>
                      <p>{{ application.coverLetter || 'No cover letter provided' }}</p>
                    </div>
                    <div class="col-md-6">
                      <h6>Resume</h6>
                      <p *ngIf="application.resumeUrl">
                        <a [href]="application.resumeUrl" target="_blank" class="btn btn-sm btn-outline-primary">
                          View Resume
                        </a>
                      </p>
                      <p *ngIf="!application.resumeUrl" class="text-muted">No resume uploaded</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-4">
              <div class="card">
                <div class="card-header">
                  <h5>Personal Information</h5>
                </div>
                <div class="card-body">
                  <p><strong>Name:</strong> {{ application.firstName }} {{ application.lastName }}</p>
                  <p><strong>Email:</strong> {{ application.email }}</p>
                  <p><strong>Phone:</strong> {{ application.phone }}</p>
                  <p><strong>Address:</strong> {{ application.address || 'Not provided' }}</p>
                  <p><strong>Applied:</strong> {{ application.appliedDate | date:'medium' }}</p>
                </div>
              </div>
              
              <div class="card mt-3" *ngIf="application.notes">
                <div class="card-header">
                  <h5>Notes</h5>
                </div>
                <div class="card-body">
                  <p>{{ application.notes }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-4">
            <button class="btn btn-secondary" (click)="goBack()">Back to Applications</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container" *ngIf="!application">
      <div class="text-center">
        <h3>Application not found</h3>
        <p>The application you're looking for doesn't exist or has been removed.</p>
        <a routerLink="/applications" class="btn btn-primary">Back to Applications</a>
      </div>
    </div>
  `,
  styles: [`
    .badge {
      font-size: 0.9rem;
      margin-left: 10px;
    }
    .card-header {
      background-color: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
    .card-header h5 {
      margin-bottom: 0;
      display: inline-block;
    }
  `]
})
export class ApplicationDetailComponent implements OnInit {
  application: Application | null = null;
  applicationId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  ngOnInit() {
    this.applicationId = this.route.snapshot.paramMap.get('id');
    if (this.applicationId) {
      this.loadApplication();
    }
  }

  loadApplication() {
    if (this.applicationId) {
      this.applicationService.getApplication(this.applicationId).subscribe(
        (application: Application) => {
          this.application = application;
        },
        error => {
          console.error('Error loading application:', error);
        }
      );
    }
  }

  deleteApplication() {
    if (this.applicationId && confirm('Are you sure you want to delete this application?')) {
      this.applicationService.deleteApplication(this.applicationId).subscribe(
        () => {
          this.router.navigate(['/applications']);
        },
        error => {
          console.error('Error deleting application:', error);
        }
      );
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-warning';
      case 'approved': return 'bg-success';
      case 'rejected': return 'bg-danger';
      case 'interview': return 'bg-info';
      default: return 'bg-secondary';
    }
  }

  goBack() {
    this.router.navigate(['/applications']);
  }
}

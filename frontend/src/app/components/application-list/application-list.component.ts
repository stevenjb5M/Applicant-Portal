import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-4">My Applications</h2>
          
          <div class="mb-3">
            <a routerLink="/applications/new" class="btn btn-primary">
              <i class="bi bi-plus"></i> New Application
            </a>
          </div>

          <div class="card">
            <div class="card-body">
              <div class="table-responsive" *ngIf="applications.length > 0; else noApplications">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Position</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Applied Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let application of applications">
                      <td>{{ application.position }}</td>
                      <td>{{ application.company }}</td>
                      <td>
                        <span class="badge" [ngClass]="getStatusClass(application.status)">
                          {{ application.status }}
                        </span>
                      </td>
                      <td>{{ application.appliedDate | date:'short' }}</td>
                      <td>
                        <a [routerLink]="['/applications', application.id]" class="btn btn-sm btn-outline-primary me-2">
                          View
                        </a>
                        <a [routerLink]="['/applications', application.id, 'edit']" class="btn btn-sm btn-outline-secondary">
                          Edit
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <ng-template #noApplications>
                <div class="text-center py-5">
                  <h4>No applications yet</h4>
                  <p class="text-muted">Create your first application to get started!</p>
                  <a routerLink="/applications/new" class="btn btn-primary">Create Application</a>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .badge {
      font-size: 0.75rem;
    }
    .table th {
      border-top: none;
      font-weight: 600;
    }
  `]
})
export class ApplicationListComponent implements OnInit {
  applications: Application[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.applicationService.getApplications().subscribe(
      applications => this.applications = applications
    );
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
}

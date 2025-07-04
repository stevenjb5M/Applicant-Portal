import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1 class="display-4 mb-4">Welcome to Applicant Portal</h1>
          <p class="lead mb-5">Manage your job applications efficiently and effectively</p>
          
          <div class="row">
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">Submit Application</h5>
                  <p class="card-text">Create and submit your job application with all required documents.</p>
                  <a routerLink="/applications/new" class="btn btn-primary">Apply Now</a>
                </div>
              </div>
            </div>
            
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">View Applications</h5>
                  <p class="card-text">Track the status of all your submitted applications.</p>
                  <a routerLink="/applications" class="btn btn-outline-primary">View All</a>
                </div>
              </div>
            </div>
            
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">Update Profile</h5>
                  <p class="card-text">Keep your information up to date for better opportunities.</p>
                  <button class="btn btn-outline-secondary" disabled>Coming Soon</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .display-4 {
      font-weight: 300;
    }
  `]
})
export class HomeComponent {}

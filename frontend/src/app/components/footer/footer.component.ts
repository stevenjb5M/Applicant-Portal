import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-light text-center py-3 mt-5">
      <div class="container">
        <p class="mb-0">&copy; 2025 Applicant Portal. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      border-top: 1px solid #dee2e6;
      margin-top: auto;
    }
  `]
})
export class FooterComponent {}

import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (submit)="onSubmit($event)">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" [(ngModel)]="email" name="email" required class="form-control">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" [(ngModel)]="password" name="password" required class="form-control">
        </div>
        @if (error()) {
          <p class="error">{{ error() }}</p>
        }
        <button type="submit" class="btn btn-primary" [disabled]="loading()">
          {{ loading() ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  `,
    styles: [`
    .login-container { max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
    .form-group { margin-bottom: 15px; }
    .error { color: red; }
    .btn { width: 100%; }
  `]
})
export class LoginComponent {
    email = '';
    password = '';
    loading = signal(false);
    error = signal<string | null>(null);

    private authService = inject(AuthService);
    private router = inject(Router);

    async onSubmit(event: Event) {
        event.preventDefault();
        this.loading.set(true);
        this.error.set(null);

        try {
            const response = await fetch(`${environment.apiUrl}/login_check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: this.email, password: this.password })
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            this.authService.login(data.token);
            this.router.navigate(['/products']);
        } catch (err: any) {
            this.error.set(err.message || 'Login failed');
        } finally {
            this.loading.set(false);
        }
    }
}

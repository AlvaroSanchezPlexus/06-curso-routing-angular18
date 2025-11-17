import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Iniciar Sesión</h1>

        @if (errorMessage()) {
          <div class="error-message">
            {{ errorMessage() }}
          </div>
        }

        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="username"
              required
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              required
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button
            type="submit"
            [disabled]="!loginForm.form.valid || isLoading()">
            @if (isLoading()) {
              Iniciando sesión...
            } @else {
              Iniciar Sesión
            }
          </button>
        </form>

        <div class="demo-credentials">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>Usuario: admin / user</p>
          <p>Contraseña: cualquier texto</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .login-card {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 400px;
    }
  `]
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  username = '';
  password = '';
  errorMessage = signal('');
  isLoading = signal(false);
  private returnUrl = '';

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    setTimeout(() => {
      const loggedIn = this.authService.login(this.username, this.password);

      if (loggedIn) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.errorMessage.set('Usuario o contraseña incorrectos');
      }
      this.isLoading.set(false);
    }, 1000);
  }
}

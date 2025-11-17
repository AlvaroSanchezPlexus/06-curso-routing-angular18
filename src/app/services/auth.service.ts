// auth.service.ts
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUserSignal = signal<User | null>(null);
  private readonly tokenSignal = signal<string | null>(null);

  // Señales públicas (readonly)
  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = signal(false);

  constructor(private readonly router: Router) {
    this.loadFromStorage();
  }

  login(username: string, password: string): boolean {
    // Simulación de login
    if (username && password) {
      const user: User = {
        id: 1,
        username,
        email: `${username}@example.com`,
        role: username === 'admin' ? 'admin' : 'user'
      };

      const token = 'fake-jwt-token-' + Date.now();

      this.currentUserSignal.set(user);
      this.tokenSignal.set(token);
      this.isAuthenticated.set(true);

      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      return true;
    }
    return false;
  }

  logout() {
    this.currentUserSignal.set(null);
    this.tokenSignal.set(null);
    this.isAuthenticated.set(false);

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  hasRole(role: string): boolean {
    return this.currentUser()?.role === role;
  }

  private loadFromStorage() {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userStr && token) {
      this.currentUserSignal.set(JSON.parse(userStr));
      this.tokenSignal.set(token);
      this.isAuthenticated.set(true);
    }
  }
}

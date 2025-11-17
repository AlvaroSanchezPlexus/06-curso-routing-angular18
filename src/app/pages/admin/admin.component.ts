import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <div class="admin-container">
      <h1>Panel de Administración</h1>
      <p>Esta área es solo para administradores.</p>
      <!-- Contenido exclusivo para administradores -->
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 2rem;
      background-color: #fff3cd;
      border: 1px solid #ffeeba;
      border-radius: 8px;
      max-width: 800px;
      margin: 2rem auto;
    }
  `]
})
export class AdminComponent {}

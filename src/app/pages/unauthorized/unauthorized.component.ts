import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="unauthorized-container">
      <h1>Acceso Denegado</h1>
      <p>No tienes permiso para ver esta página.</p>
      <a routerLink="/home">Volver al inicio</a>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      text-align: center;
      padding: 4rem;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
  `]
})
export class UnauthorizedComponent {}

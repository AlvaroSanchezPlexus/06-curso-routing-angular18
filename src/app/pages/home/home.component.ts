import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h1>Bienvenido a la Página de Inicio</h1>
      <p>Esta es una demostración del routing moderno en Angular 18.</p>

      <div class="cards">
        <div class="card" *ngFor="let feature of features">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .card {
      padding: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .card h3 {
      margin-top: 0;
      color: #007bff;
    }
  `]
})
export class HomeComponent {
  features = [
    {
      title: 'Standalone Components',
      description: 'Componentes independientes sin necesidad de módulos'
    },
    {
      title: 'provideRouter',
      description: 'Configuración funcional del router'
    },
    {
      title: 'View Transitions',
      description: 'Animaciones nativas entre rutas'
    }
  ];
}

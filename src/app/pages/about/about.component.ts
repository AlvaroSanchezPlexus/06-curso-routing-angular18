import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="page-container">
      <h1>Acerca de Angular 18</h1>
      <section>
        <h2>Novedades</h2>
        <ul>
          <li>Signals estables</li>
          <li>{{'Control Flow mejorado (@if, @for, @switch)'}} </li>
          <li>Standalone como opción por defecto</li>
          <li>Mejor rendimiento en hydration</li>
        </ul>
      </section>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 800px;
      margin: 0 auto;
    }

    section {
      margin-top: 2rem;
      padding: 1.5rem;
      background-color: #f5f5f5;
      border-radius: 8px;
    }

    ul {
      line-height: 2;
    }
  `]
})
export class AboutComponent {}

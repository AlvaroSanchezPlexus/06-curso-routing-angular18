import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="docs-container">
      <nav class="sidebar">
        <h3>Tabla de Contenidos</h3>
        <a [routerLink]="[]" [fragment]="'introduction'">Introducción</a>
        <a [routerLink]="[]" [fragment]="'installation'">Instalación</a>
        <a [routerLink]="[]" [fragment]="'configuration'">Configuración</a>
        <a [routerLink]="[]" [fragment]="'usage'">Uso</a>
        <a [routerLink]="[]" [fragment]="'examples'">Ejemplos</a>
      </nav>

      <main class="content">
        <section id="introduction">
          <h2>Introducción</h2>
          <p>Bienvenido a la documentación de Angular 18...</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        </section>

        <section id="installation">
          <h2>Instalación</h2>
          <p>Para instalar Angular 18, ejecuta el siguiente comando:</p>
          <pre><code>{{'npm install -g @angular/cli@18'}}</code></pre>
        </section>

        <section id="configuration">
          <h2>Configuración</h2>
          <p>Configura tu proyecto Angular con los siguientes pasos...</p>
          <ol>
            <li>Crea un nuevo proyecto</li>
            <li>Configura el routing</li>
            <li>Añade los componentes necesarios</li>
          </ol>
        </section>

        <section id="usage">
          <h2>Uso</h2>
          <p>Una vez configurado, puedes comenzar a usar Angular...</p>
        </section>

        <section id="examples">
          <h2>Ejemplos</h2>
          <p>Aquí encontrarás ejemplos prácticos...</p>
        </section>

        <button (click)="scrollToTop()" class="scroll-top">↑ Volver arriba</button>
      </main>
    </div>
  `,
  styles: [`
    .docs-container {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .sidebar {
      position: sticky;
      top: 2rem;
      height: fit-content;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .sidebar h3 {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .sidebar a {
      display: block;
      padding: 0.5rem 1rem;
      margin-bottom: 0.5rem;
      color: #495057;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .sidebar a:hover {
      background-color: #e9ecef;
    }

    .content section {
      margin-bottom: 3rem;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      scroll-margin-top: 2rem;
    }

    .content h2 {
      color: #007bff;
      margin-top: 0;
    }

    pre {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }

    .scroll-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      padding: 1rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      cursor: pointer;
      font-size: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .scroll-top:hover {
      background: #0056b3;
    }
  `]
})
export class DocumentationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private viewportScroller = inject(ViewportScroller);

  ngOnInit() {
    // Escuchar cambios en el fragment
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        // Esperar a que el DOM se actualice
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 100);
      }
    });
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}

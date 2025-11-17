import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="breadcrumbs" aria-label="breadcrumb">
      @for (crumb of breadcrumbs; track crumb.url; let last = $last) {
        @if (!last) {
          <a [routerLink]="crumb.url">{{ crumb.label }}</a>
          <span class="separator">/</span>
        } @else {
          <span class="current">{{ crumb.label }}</span>
        }
      }
    </nav>
  `,
  styles: [`
    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .breadcrumbs a {
      color: #007bff;
      text-decoration: none;
    }

    .breadcrumbs a:hover {
      text-decoration: underline;
    }

    .separator {
      color: #6c757d;
    }

    .current {
      color: #495057;
      font-weight: 600;
    }
  `]
})
export class BreadcrumbsComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  breadcrumbs: Breadcrumb[] = [];

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.buildBreadcrumbs(this.activatedRoute.root))
    ).subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });

    // Inicializar breadcrumbs
    this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    // Obtener label de la data de la ruta
    const label = route.routeConfig?.data?.['breadcrumb'];
    const path = route.routeConfig?.path || '';

    // Construir URL
    const nextUrl = path ? `${url}/${path}` : url;

    // Añadir breadcrumb si tiene label
    if (label) {
      breadcrumbs.push({
        label,
        url: nextUrl
      });
    }

    // Recursivo para hijos
    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }
}

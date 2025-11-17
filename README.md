# Curso de Routing y Navegación en Angular 18

## Módulo: Routing y Navegación

### Clase 1: Routing Moderno con provideRouter

#### 1. Introducción al Routing en Angular 18
Angular 18 introduce un enfoque completamente moderno para la configuración de rutas, eliminando la necesidad de `RouterModule` y adoptando el patrón de Standalone Components con `provideRouter`.

**Ventajas del nuevo enfoque:**
*   Configuración funcional: Más limpia y declarativa
*   Tree-shakeable: Mejor optimización del bundle
*   Standalone-first: Compatible con la arquitectura moderna de Angular
*   Tipado mejorado: Mejor soporte de TypeScript

#### 2. Configuración Básica del Router
##### 2.1. Estructura del proyecto
```
src/
├── app/
│ ├── pages/
│ │ ├── home/
│ │ │ └── home.component.ts
│ │ ├── about/
│ │ │ └── about.component.ts
│ │ └── contact/
│ │ └── contact.component.ts
│ ├── app.component.ts
│ ├── app.config.ts
│ └── app.routes.ts
```
##### 2.2. Definición de Rutas (app.routes.ts)
```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Inicio' // Título automático de la página
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'Acerca de'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contacto'
  },
  {
    path: '**',
    redirectTo: '/home' // Ruta 404
  }
];
```
##### 2.3. Configuración de la Aplicación (app.config.ts)
```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(), // Permite recibir parámetros como @Input()
      withViewTransitions() // Animaciones de transición entre rutas
    )
  ]
};
```
##### 2.4. Componente Principal (app.component.ts)
```typescript
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <a routerLink="/home" routerLinkActive="active">Inicio</a>
      <a routerLink="/about" routerLinkActive="active">Acerca de</a>
      <a routerLink="/contact" routerLinkActive="active">Contacto</a>
    </nav>

    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background-color: #333;
    }

    .navbar a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .navbar a:hover {
      background-color: #555;
    }

    .navbar a.active {
      background-color: #007bff;
    }

    main {
      padding: 2rem;
    }
  `]
})
export class AppComponent {
  title = 'Angular 18 Routing';
}
```

#### 3. Componentes de Página
##### 3.1. Home Component
```typescript
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
```
##### 3.2. About Component
```typescript
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
          <li>Control Flow mejorado (@if, @for, @switch)</li>
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
```
##### 3.3. Contact Component
```typescript
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="page-container">
      <h1>Contacto</h1>

      <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            [(ngModel)]="formData.name"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            [(ngModel)]="formData.email"
            required
          />
        </div>

        <div class="form-group">
          <label for="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            [(ngModel)]="formData.message"
            rows="5"
            required
          ></textarea>
        </div>

        <button type="submit" [disabled]="!contactForm.form.valid">
          Enviar
        </button>
      </form>

      @if (submitted()) {
        <div class="success-message">
          ¡Mensaje enviado correctamente!
        </div>
      }
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 600px;
      margin: 0 auto;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    button {
      width: 100%;
      padding: 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover:not(:disabled) {
      background-color: #0056b3;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .success-message {
      margin-top: 1.5rem;
      padding: 1rem;
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
      border-radius: 4px;
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  submitted = signal(false);

  onSubmit() {
    console.log('Form data:', this.formData);
    this.submitted.set(true);

    setTimeout(() => {
      this.submitted.set(false);
      this.formData = { name: '', email: '', message: '' };
    }, 3000);
  }
}
```

#### 4. Navegación Programática
```typescript
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-example',
  standalone: true,
  template: `
    <button (click)="goToAbout()">Ir a Acerca de</button>
    <button (click)="goBack()">Volver</button>
  `
})
export class ExampleComponent {
  private router = inject(Router);

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goBack() {
    // Usar Location para volver atrás
    window.history.back();
  }
}
```

#### 5. Características Avanzadas de `provideRouter`
##### 5.1. Opciones de Configuración
```typescript
import { provideRouter, withDebugTracing, withInMemoryScrolling, withRouterConfig } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,

      // Binding automático de parámetros
      withComponentInputBinding(),

      // Transiciones visuales
      withViewTransitions(),

      // Debug de navegación (solo desarrollo)
      withDebugTracing(),

      // Gestión del scroll
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      }),

      // Configuración personalizada
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      })
    )
  ]
};
```

#### 6. Ejercicios Prácticos
*   **Ejercicio 1: Crear una navegación básica**
    Crea una aplicación con 4 páginas: Home, Productos, Servicios y Blog. Implementa la navegación usando `routerLink` y estiliza el menú.
*   **Ejercicio 2: Página 404 personalizada**
    Crea un componente `NotFoundComponent` con un diseño atractivo y configúralo como ruta wildcard.
*   **Ejercicio 3: Títulos dinámicos**
    Implementa títulos de página personalizados para cada ruta usando la propiedad `title`.

#### 7. Resumen
En esta clase has aprendido:
*   ✅ Configurar el router con `provideRouter`
*   ✅ Definir rutas en el archivo `app.routes.ts`
*   ✅ Usar `RouterOutlet`, `RouterLink` y `RouterLinkActive`
*   ✅ Crear componentes standalone para páginas
*   ✅ Implementar navegación programática
*   ✅ Configurar opciones avanzadas del router

---

### Clase 2: Parámetros de Ruta y Query Params

#### 1. Introducción a los Parámetros
Los parámetros de ruta permiten crear rutas dinámicas que reciben información variable. Angular 18 ofrece múltiples formas de trabajar con parámetros.

**Tipos de parámetros:**
*   **Route Params:** `/products/:id` → Obligatorios y parte de la URL
*   **Query Params:** `/products?category=electronics&sort=price` → Opcionales
*   **Fragment:** `/products#features` → Anclas dentro de la página

#### 2. Route Parameters
##### 2.1. Definición de Rutas con Parámetros
```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductListComponent,
        title: 'Productos'
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        title: 'Detalle del Producto'
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        title: 'Editar Producto'
      }
    ]
  },
  {
    path: 'users/:userId/posts/:postId',
    component: PostDetailComponent,
    title: 'Detalle del Post'
  }
];
```
##### 2.2. Acceso Tradicional con `ActivatedRoute`
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-detail">
      @if (product) {
        <h1>{{ product.name }}</h1>
        <p class="price">{{ product.price | currency }}</p>
        <p>{{ product.description }}</p>

        <div class="actions">
          <button (click)="editProduct()">Editar</button>
          <button (click)="goBack()">Volver</button>
        </div>
      } @else {
        <p>Cargando producto...</p>
      }
    </div>
  `,
  styles: [`
    .product-detail {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .price {
      font-size: 2rem;
      color: #28a745;
      font-weight: bold;
      margin: 1rem 0;
    }

    .actions {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    button:first-child {
      background-color: #007bff;
      color: white;
    }

    button:last-child {
      background-color: #6c757d;
      color: white;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  product: any = null;

  ngOnInit() {
    // Método 1: Snapshot (valor actual)
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Product ID:', id);

    // Método 2: Observable (reactivo a cambios)
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      this.loadProduct(productId);
    });
  }

  loadProduct(id: string | null) {
    // Simular carga de datos
    this.product = {
      id,
      name: 'Laptop Gaming',
      price: 1299.99,
      description: 'Potente laptop para gaming con RTX 4070'
    };
  }

  editProduct() {
    this.router.navigate(['/products', this.product.id, 'edit']);
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
```
##### 2.3. Método Moderno con `@Input()` (Angular 16+)
```typescript
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail-modern',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-detail">
      <h1>Producto #{{ id }}</h1>

      @if (product) {
        <div class="product-info">
          <h2>{{ product.name }}</h2>
          <p class="price">{{ product.price | currency }}</p>
          <p>{{ product.description }}</p>
          <span class="category">Categoría: {{ product.category }}</span>
        </div>
      }

      <button (click)="goBack()">← Volver al listado</button>
    </div>
  `,
  styles: [`
    .product-detail {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .product-info {
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 8px;
      margin: 2rem 0;
    }

    .price {
      font-size: 2rem;
      color: #28a745;
      font-weight: bold;
      margin: 1rem 0;
    }

    .category {
      display: inline-block;
      background: #007bff;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      margin-top: 1rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      background-color: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
  `]
})
export class ProductDetailModernComponent implements OnInit {
  // Con withComponentInputBinding(), los parámetros se reciben como @Input()
  @Input() id?: string;

  private router = inject(Router);
  product: any = null;

  ngOnInit() {
    console.log('Product ID from @Input:', this.id);
    this.loadProduct();
  }

  loadProduct() {
    // Simular carga del producto
    this.product = {
      id: this.id,
      name: 'MacBook Pro M3',
      price: 2499.99,
      description: 'El portátil más potente de Apple',
      category: 'Computadoras'
    };
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
```
##### 2.4. Múltiples Parámetros
```typescript
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="post-container">
      <div class="breadcrumb">
        Usuario {{ userId }} → Post {{ postId }}
      </div>

      @if (post) {
        <article>
          <h1>{{ post.title }}</h1>
          <div class="meta">
            Por: <strong>{{ post.author }}</strong> |
            {{ post.date | date:'short' }}
          </div>
          <p>{{ post.content }}</p>
        </article>
      }
    </div>
  `,
  styles: [`
    .post-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .breadcrumb {
      padding: 0.5rem 1rem;
      background: #e9ecef;
      border-radius: 4px;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }

    article {
      line-height: 1.8;
    }

    .meta {
      color: #6c757d;
      margin: 1rem 0 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #dee2e6;
    }
  `]
})
export class PostDetailComponent implements OnInit {
  @Input() userId?: string;
  @Input() postId?: string;

  post: any = null;

  ngOnInit() {
    console.log('User ID:', this.userId, 'Post ID:', this.postId);
    this.loadPost();
  }

  loadPost() {
    this.post = {
      title: 'Introducción a Angular 18',
      author: 'Usuario ' + this.userId,
      date: new Date(),
      content: 'Contenido completo del post sobre Angular 18...'
    };
  }
}
```

#### 3. Query Parameters
##### 3.1. Lista de Productos con Filtros
```typescript
// product-list.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="products-container">
      <h1>Catálogo de Productos</h1>

      <div class="filters">
        <div class="filter-group">
          <label>Categoría:</label>
          <select [(ngModel)]="selectedCategory" (change)="applyFilters()">
            <option value="">Todas</option>
            <option value="electronics">Electrónica</option>
            <option value="clothing">Ropa</option>
            <option value="books">Libros</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Ordenar por:</label>
          <select [(ngModel)]="sortBy" (change)="applyFilters()">
            <option value="name">Nombre</option>
            <option value="price-asc">Precio (menor a mayor)</option>
            <option value="price-desc">Precio (mayor a menor)</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Buscar:</label>
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (input)="applyFilters()"
            placeholder="Buscar producto..."
          />
        </div>
      </div>

      <div class="products-grid">
        @for (product of filteredProducts(); track product.id) {
          <div class="product-card" (click)="viewProduct(product.id)">
            <h3>{{ product.name }}</h3>
            <p class="category">{{ product.category }}</p>
            <p class="price">{{ product.price | currency }}</p>
            <button>Ver detalles</button>
          </div>
        }
      </div>

      @if (filteredProducts().length === 0) {
        <p class="no-results">No se encontraron productos</p>
      }
    </div>
  `,
  styles: [`
    .products-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .filters {
      display: flex;
      gap: 1.5rem;
      margin: 2rem 0;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      flex-wrap: wrap;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      min-width: 200px;
    }

    .filter-group label {
      font-weight: 600;
      font-size: 0.9rem;
    }

    select, input {
      padding: 0.5rem;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 1rem;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .product-card {
      padding: 1.5rem;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .category {
      color: #6c757d;
      font-size: 0.9rem;
      text-transform: capitalize;
    }

    .price {
      font-size: 1.5rem;
      color: #28a745;
      font-weight: bold;
      margin: 1rem 0;
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    button:hover {
      background-color: #0056b3;
    }

    .no-results {
      text-align: center;
      padding: 3rem;
      color: #6c757d;
      font-size: 1.2rem;
    }
  `]
})
export class ProductListComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Estados
  selectedCategory = '';
  sortBy = 'name';
  searchTerm = '';

  // Datos
  private allProducts: Product[] = [
    { id: 1, name: 'Laptop HP', category: 'electronics', price: 899 },
    { id: 2, name: 'Camiseta Nike', category: 'clothing', price: 45 },
    { id: 3, name: 'JavaScript Book', category: 'books', price: 35 },
    { id: 4, name: 'iPhone 15', category: 'electronics', price: 999 },
    { id: 5, name: 'Jeans Levis', category: 'clothing', price: 80 },
    { id: 6, name: 'Angular Guide', category: 'books', price: 40 }
  ];

  filteredProducts = signal<Product[]>(this.allProducts);

  ngOnInit() {
    // Leer query params al iniciar
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      this.sortBy = params['sort'] || 'name';
      this.searchTerm = params['search'] || '';
      this.filterProducts();
    });
  }

  applyFilters() {
    // Actualizar URL con query params
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategory || null,
        sort: this.sortBy,
        search: this.searchTerm || null
      },
      queryParamsHandling: 'merge' // Mantener otros query params
    });

    this.filterProducts();
  }

  filterProducts() {
    let filtered = [...this.allProducts];

    // Filtrar por categoría
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    // Filtrar por búsqueda
    if (this.searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Ordenar
    switch (this.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    this.filteredProducts.set(filtered);
  }

  viewProduct(id: number) {
    // Navegar preservando query params
    this.router.navigate(['/products', id], {
      queryParamsHandling: 'preserve'
    });
  }
}
```
##### 3.2. Navegación con Query Params
```typescript
// Diferentes formas de navegar con query params

// 1. Con routerLink en template
`<a [routerLink]="['/products']" 
    [queryParams]="{category: 'electronics', sort: 'price'}">
  Electrónica
</a>`

// 2. Programáticamente
this.router.navigate(['/products'], {
  queryParams: { category: 'electronics', sort: 'price' }
});

// 3. Preservar query params existentes
this.router.navigate(['/products', productId], {
  queryParamsHandling: 'preserve' // Mantiene todos los query params
});

// 4. Merge (combinar) query params
this.router.navigate(['/products'], {
  queryParams: { page: 2 },
  queryParamsHandling: 'merge' // Combina con los existentes
});

// 5. Reemplazar completamente los query params
this.router.navigate(['/products'], {
  queryParams: { category: 'books' }
  // Por defecto reemplaza todos los query params
});
```

#### 4. Fragments (Anclas)
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewportScroller } from '@angular/common';

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
          <pre><code>npm install -g @angular/cli@18</code></pre>
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
```
##### 4.2. Navegación con Fragments
```typescript
// En el componente
import { Router } from '@angular/router';

constructor(private router: Router) {}

navigateToSection(section: string) {
  this.router.navigate(['/docs'], {
    fragment: section,
    queryParams: { version: '18' }
  });
}

// En el template
<a [routerLink]="['/docs']"
   [fragment]="'installation'"
   [queryParams]="{version: '18'}">
  Ver instalación
</a>
```

#### 5. Parámetros Opcionales y Matrix URL
##### 5.1. Matrix URL Notation
Los parámetros de matriz son una alternativa a los query params, útiles para parámetros específicos de un segmento de ruta.
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent
  }
];

// Navegación con matrix params
// URL resultante: /products;category=electronics;price=low

// En el componente
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-example',
  standalone: true,
  template: `
    <button (click)="filterProducts()">Filtrar Electrónica Barata</button>
  `
})
export class ExampleComponent {
  private router = inject(Router);

  filterProducts() {
    this.router.navigate(['/products', {
      category: 'electronics',
      price: 'low'
    }]);
  }
}

// Leer matrix params
import { ActivatedRoute } from '@angular/router';

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const category = params.get('category');
    const price = params.get('price');
    console.log('Matrix params:', { category, price });
  });
}
```

#### 6. Casos de Uso Avanzados
##### 6.1. Sistema de Paginación Completo
```typescript
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <h1>Lista de Usuarios</h1>

      <div class="info-bar">
        <span>Total: {{ totalUsers }} usuarios</span>
        <span>Página {{ currentPage() }} de {{ totalPages() }}</span>
      </div>

      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (user of paginatedUsers(); track user.id) {
              <tr>
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <a [routerLink]="['/users', user.id]">Ver detalles</a>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <button
          (click)="goToPage(currentPage() - 1)"
          [disabled]="currentPage() === 1">
          ← Anterior
        </button>

        @for (page of pageNumbers(); track page) {
          <button
            (click)="goToPage(page)"
            [class.active]="page === currentPage()">
            {{ page }}
          </button>
        }

        <button
          (click)="goToPage(currentPage() + 1)"
          [disabled]="currentPage() === totalPages()">
          Siguiente →
        </button>
      </div>

      <div class="page-size">
        <label>Resultados por página:</label>
        <select [value]="pageSize()" (change)="changePageSize($event)">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }

    .info-bar {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 4px;
      margin: 1rem 0;
    }

    .users-table {
      overflow-x: auto;
      margin: 2rem 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #dee2e6;
    }

    th {
      background: #007bff;
      color: white;
      font-weight: 600;
    }

    tbody tr:hover {
      background: #f8f9fa;
    }

    .pagination {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin: 2rem 0;
    }

    .pagination button {
      padding: 0.5rem 1rem;
      border: 1px solid #dee2e6;
      background: white;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.3s;
    }

    .pagination button:hover:not(:disabled) {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }

    .pagination button.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }

    .pagination button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .page-size {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
    }

    .page-size select {
      padding: 0.5rem;
      border: 1px solid #ced4da;
      border-radius: 4px;
    }

    a {
      color: #007bff;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `]
})
export class UserListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Signals para estado reactivo
  currentPage = signal(1);
  pageSize = signal(10);

  // Datos simulados
  private allUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Usuario ${i + 1}`,
    email: `user${i + 1}@example.com`
  }));

  totalUsers = this.allUsers.length;

  // Computed signals
  totalPages = computed(() =>
    Math.ceil(this.totalUsers / this.pageSize())
  );

  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.allUsers.slice(start, end);
  });

  pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const delta = 2;
    const pages: number[] = [];

    for (let i = Math.max(2, current - delta);
         i <= Math.min(total - 1, current + delta);
         i++) {
      pages.push(i);
    }

    if (current - delta > 2) {
      pages.unshift(-1); // Ellipsis
    }
    if (current + delta < total - 1) {
      pages.push(-1); // Ellipsis
    }

    pages.unshift(1);
    if (total > 1) pages.push(total);

    return pages;
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const page = Number(params['page']) || 1;
      const size = Number(params['pageSize']) || 10;

      this.currentPage.set(page);
      this.pageSize.set(size);
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page,
        pageSize: this.pageSize()
      },
      queryParamsHandling: 'merge'
    });
  }

  changePageSize(event: Event) {
    const size = Number((event.target as HTMLSelectElement).value);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1, // Reset a página 1
        pageSize: size
      }
    });
  }
}
```
##### 6.2. Breadcrumbs Dinámicos
```typescript
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

// Configuración de rutas con breadcrumbs
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { breadcrumb: 'Inicio' }
  },
  {
    path: 'products',
    data: { breadcrumb: 'Productos' },
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        data: { breadcrumb: 'Detalle' }
      }
    ]
  }
];
```

#### 7. Ejercicios Prácticos
*   **Ejercicio 1: Blog con Categorías**
    Crea un sistema de blog donde:
    *   La lista de posts se pueda filtrar por categoría (query param)
    *   Los posts se paginen (query params: page, pageSize)
    *   Al hacer clic en un post, se navegue a `/posts/:id`
    *   Se mantengan los filtros al volver atrás
*   **Ejercicio 2: E-commerce con Filtros Avanzados**
    Implementa:
    *   Filtros múltiples: categoría, precio min/max, marca
    *   Ordenamiento: precio, nombre, popularidad
    *   Búsqueda por texto
    *   Paginación
    *   Preservar todos los filtros en la URL
*   **Ejercicio 3: Dashboard con Tabs**
    Crea un dashboard con pestañas donde:
    *   Cada tab es una ruta hija con su propio componente
    *   Se use fragment para scroll dentro de cada tab
    *   Se preserve la tab activa en la URL

#### 8. Resumen
En esta clase has aprendido:
*   ✅ Trabajar con parámetros de ruta (route params)
*   ✅ Usar `@Input()` para recibir parámetros automáticamente
*   ✅ Manejar query parameters para filtros y búsquedas
*   ✅ Implementar fragments para navegación interna
*   ✅ Crear sistemas de paginación completos
*   ✅ Construir breadcrumbs dinámicos
*   ✅ Preservar y combinar parámetros en navegación

---

### Clase 3: Guards y Lazy Loading

#### 1. Introducción a los Guards
Los Guards son mecanismos de protección que controlan el acceso a las rutas. En Angular 18, los guards se implementan como funciones en lugar de clases.

**Tipos de Guards:**
*   **CanActivate:** Controla si se puede activar una ruta
*   **CanActivateChild:** Controla rutas hijas
*   **CanDeactivate:** Controla si se puede salir de una ruta
*   **CanMatch:** Controla si una ruta puede coincidir
*   **Resolve:** Pre-carga datos antes de activar la ruta

#### 2. `CanActivate` - Guards de Autenticación
##### 2.1. Servicio de Autenticación
```typescript
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
  private currentUserSignal = signal<User | null>(null);
  private tokenSignal = signal<string | null>(null);

  // Señales públicas (readonly)
  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = signal(false);

  constructor(private router: Router) {
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
```
##### 2.2. Auth Guard Funcional
```typescript
// guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Guardar la URL intentada para redirección después del login
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};
```
##### 2.3. Role Guard
```typescript
// guards/role.guard.ts
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.currentUser();

    if (!user) {
      return router.createUrlTree(['/login']);
    }

    if (allowedRoles.includes(user.role)) {
      return true;
    }

    // Usuario autenticado pero sin permisos
    return router.createUrlTree(['/unauthorized']);
  };
};
```
##### 2.4. Aplicación de Guards en Rutas
```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Inicio'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar Sesión'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard], // Solo usuarios autenticados
    title: 'Dashboard'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [roleGuard(['admin'])], // Solo administradores
    title: 'Panel de Administración'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    title: 'Mi Perfil'
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    title: 'Acceso Denegado'
  }
];
```
##### 2.5. Componente de Login
```typescript
import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

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

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: 600;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
    }

    button {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    button:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-message {
      background: #fee;
      color: #c33;
      padding: 1rem;
      border-radius: 6px;
      margin-bottom: 1.5rem;
      border-left: 4px solid #c33;
    }

    .demo-credentials {
      margin-top: 2rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 6px;
      font-size: 0.9rem;
      text-align: center;
    }

    .demo-credentials p {
      margin: 0.25rem 0;
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  username = '';
  password = '';
  errorMessage = signal('');
  isLoading = signal(false);

  onLogin() {
    this.errorMessage.set('');
    this.isLoading.set(true);

    // Simular delay de autenticación
    setTimeout(() => {
      const success = this.authService.login(this.username, this.password);

      if (success) {
        // Obtener la URL de retorno o ir al dashboard
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      } else {
        this.errorMessage.set('Credenciales inválidas');
      }

      this.isLoading.set(false);
    }, 1000);
  }
}
```

#### 3. `CanDeactivate` - Prevenir Navegación
##### 3.1. Guard para Cambios No Guardados
```typescript
// guards/can-deactivate.guard.ts
import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
```
##### 3.2. Formulario con Protección
```typescript
import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../guards/can-deactivate.guard';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Editar Artículo</h1>

      @if (hasUnsavedChanges()) {
        <div class="warning-banner">
          ⚠️ Tienes cambios sin guardar
        </div>
      }

      <form #articleForm="ngForm">
        <div class="form-group">
          <label for="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            [(ngModel)]="article.title"
            (ngModelChange)="markAsModified()"
            required
          />
        </div>

        <div class="form-group">
          <label for="content">Contenido:</label>
          <textarea
            id="content"
            name="content"
            [(ngModel)]="article.content"
            (ngModelChange)="markAsModified()"
            rows="10"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="category">Categoría:</label>
          <select
            id="category"
            name="category"
            [(ngModel)]="article.category"
            (ngModelChange)="markAsModified()"
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="tecnologia">Tecnología</option>
            <option value="ciencia">Ciencia</option>
            <option value="cultura">Cultura</option>
          </select>
        </div>

        <div class="form-actions">
          <button
            type="button"
            (click)="saveArticle()"
            [disabled]="!articleForm.form.valid || isSaving()">
            @if (isSaving()) {
              Guardando...
            } @else {
              Guardar Cambios
            }
          </button>

          <button
            type="button"
            (click)="cancel()"
            class="btn-secondary">
            Cancelar
          </button>
        </div>
      </form>

      @if (saveSuccess()) {
        <div class="success-message">
          ✓ Artículo guardado correctamente
        </div>
      }
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .warning-banner {
      background: #fff3cd;
      color: #856404;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1.5rem;
      border-left: 4px solid #ffc107;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }

    input, textarea, select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 4px;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.3s;
    }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #007bff;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button[type="button"]:first-child {
      background-color: #007bff;
      color: white;
    }

    button[type="button"]:first-child:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background-color: #5a6268;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .success-message {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #d4edda;
      color: #155724;
      border-radius: 4px;
      border-left: 4px solid #28a745;
    }
  `]
})
export class EditArticleComponent implements CanComponentDeactivate {
  private router = inject(Router);

  article = {
    title: 'Mi Artículo Original',
    content: 'Contenido del artículo...',
    category: 'tecnologia'
  };

  private originalArticle = { ...this.article };

  hasUnsavedChanges = signal(false);
  isSaving = signal(false);
  saveSuccess = signal(false);

  markAsModified() {
    this.hasUnsavedChanges.set(true);
    this.saveSuccess.set(false);
  }

  saveArticle() {
    this.isSaving.set(true);

    // Simular guardado
    setTimeout(() => {
      console.log('Guardando artículo:', this.article);
      this.originalArticle = { ...this.article };
      this.hasUnsavedChanges.set(false);
      this.isSaving.set(false);
      this.saveSuccess.set(true);

      setTimeout(() => this.saveSuccess.set(false), 3000);
    }, 1500);
  }

  cancel() {
    if (this.hasUnsavedChanges()) {
      const confirmed = confirm('¿Estás seguro? Perderás todos los cambios no guardados.');
      if (confirmed) {
        this.router.navigate(['/articles']);
      }
    } else {
      this.router.navigate(['/articles']);
    }
  }

  // Implementación del guard
  canDeactivate(): boolean {
    if (this.hasUnsavedChanges()) {
      return confirm('Tienes cambios sin guardar. ¿Deseas salir de todas formas?');
    }
    return true;
  }
}

// Aplicar en las rutas
export const routes: Routes = [
  {
    path: 'articles/:id/edit',
    component: EditArticleComponent,
    canDeactivate: [canDeactivateGuard],
    title: 'Editar Artículo'
  }
];
```

#### 4. `Resolve` - Pre-carga de Datos
##### 4.1. Resolver Funcional
```typescript
// resolvers/product.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { of, delay } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

export const productResolver: ResolveFn<Product> = (route: ActivatedRouteSnapshot) => {
  const productId = route.paramMap.get('id');

  // Simular llamada HTTP
  const product: Product = {
    id: Number(productId),
    name: 'Producto Ejemplo',
    description: 'Descripción detallada del producto',
    price: 299.99,
    category: 'Electrónica',
    images: ['image1.jpg', 'image2.jpg']
  };

  // Simular delay de red
  return of(product).pipe(delay(1000));
};
```
##### 4.2. Múltiples Resolvers
```typescript
// resolvers/product-detail.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { forkJoin, of, delay } from 'rxjs';

export interface ProductDetailData {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
}

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: Date;
}

export const productDetailResolver: ResolveFn<ProductDetailData> = (route) => {
  const productId = Number(route.paramMap.get('id'));

  // Simular múltiples llamadas paralelas
  return forkJoin({
    product: of({
      id: productId,
      name: 'Laptop Gaming Pro',
      description: 'Potente laptop para gaming',
      price: 1499.99,
      category: 'Computadoras',
      images: ['laptop1.jpg', 'laptop2.jpg']
    }).pipe(delay(800)),

    reviews: of([
      {
        id: 1,
        author: 'Juan Pérez',
        rating: 5,
        comment: 'Excelente producto, muy recomendado',
        date: new Date('2024-01-15')
      },
      {
        id: 2,
        author: 'María García',
        rating: 4,
        comment: 'Buena calidad precio',
        date: new Date('2024-02-20')
      }
    ]).pipe(delay(600)),

    relatedProducts: of([
      {
        id: 2,
        name: 'Mouse Gaming',
        description: 'Mouse ergonómico',
        price: 49.99,
        category: 'Accesorios',
        images: ['mouse.jpg']
      },
      {
        id: 3,
        name: 'Teclado Mecánico',
        description: 'Teclado RGB',
        price: 89.99,
        category: 'Accesorios',
        images: ['keyboard.jpg']
      }
    ]).pipe(delay(500))
  });
};
```
##### 4.3. Componente con Datos Resueltos
```typescript
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductDetailData } from '../resolvers/product-detail.resolver';

@Component({
  selector: 'app-product-detail-resolved',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="product-container">
      @if (data) {
        <!-- Producto Principal -->
        <div class="product-main">
          <div class="product-images">
            <img [src]="data.product.images[0]" [alt]="data.product.name" />
          </div>

          <div class="product-info">
            <h1>{{ data.product.name }}</h1>
            <p class="category">{{ data.product.category }}</p>
            <p class="price">{{ data.product.price | currency }}</p>
            <p class="description">{{ data.product.description }}</p>

            <div class="actions">
              <button class="btn-primary">Añadir al Carrito</button>
              <button class="btn-secondary">Añadir a Favoritos</button>
            </div>
          </div>
        </div>

        <!-- Reseñas -->
        <section class="reviews-section">
          <h2>Reseñas ({{ data.reviews.length }})</h2>

          <div class="reviews-list">
            @for (review of data.reviews; track review.id) {
              <div class="review-card">
                <div class="review-header">
                  <strong>{{ review.author }}</strong>
                  <span class="rating">
                    @for (star of [1,2,3,4,5]; track star) {
                      <span [class.filled]="star <= review.rating">★</span>
                    }
                  </span>
                </div>
                <p>{{ review.comment }}</p>
                <small>{{ review.date | date:'short' }}</small>
              </div>
            }
          </div>
        </section>

        <!-- Productos Relacionados -->
        <section class="related-section">
          <h2>Productos Relacionados</h2>

          <div class="related-grid">
            @for (product of data.relatedProducts; track product.id) {
              <div class="related-card">
                <img [src]="product.images[0]" [alt]="product.name" />
                <h3>{{ product.name }}</h3>
                <p class="price">{{ product.price | currency }}</p>
                <a [routerLink]="['/products', product.id]">Ver detalles</a>
              </div>
            }
          </div>
        </section>
      }
    </div>
  `,
  styles: [`
    .product-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .product-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin-bottom: 3rem;
    }

    .product-images img {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .product-info h1 {
      margin: 0 0 0.5rem;
      color: #333;
    }

    .category {
      color: #6c757d;
      margin-bottom: 1rem;
    }

    .price {
      font-size: 2rem;
      color: #28a745;
      font-weight: bold;
      margin: 1.5rem 0;
    }

    .description {
      line-height: 1.6;
      color: #555;
      margin-bottom: 2rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
    }

    .btn-primary, .btn-secondary {
      padding: 1rem 2rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .btn-primary {
      background: #007bff;
      color: white;
      flex: 1;
    }

    .btn-primary:hover {
      background: #0056b3;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #5a6268;
    }

    .reviews-section, .related-section {
      margin-top: 3rem;
    }

    .reviews-section h2, .related-section h2 {
      margin-bottom: 1.5rem;
      color: #333;
    }

    .reviews-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .review-card {
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #007bff;
    }

    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .rating {
      color: #ffc107;
      font-size: 1.2rem;
    }

    .rating .filled {
      color: #ffc107;
    }

    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .related-card {
      padding: 1rem;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      text-align: center;
      transition: transform 0.3s;
    }

    .related-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .related-card img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .related-card h3 {
      font-size: 1rem;
      margin: 0.5rem 0;
    }

    .related-card .price {
      font-size: 1.2rem;
      margin: 0.5rem 0;
    }

    .related-card a {
      display: inline-block;
      margin-top: 0.5rem;
      color: #007bff;
      text-decoration: none;
    }

    .related-card a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .product-main {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductDetailResolvedComponent {
  // Los datos se reciben automáticamente como @Input
  @Input() data?: ProductDetailData;
}

// Configuración en las rutas
export const routes: Routes = [
  {
    path: 'products/:id',
    component: ProductDetailResolvedComponent,
    resolve: {
      data: productDetailResolver
    },
    title: 'Detalle del Producto'
  }
];
```

#### 5. Lazy Loading
##### 5.1. Lazy Loading Básico
```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent),
    title: 'Inicio'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component')
      .then(m => m.AboutComponent),
    title: 'Acerca de'
  },
  // Módulo completo con rutas hijas
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes')
      .then(m => m.ADMIN_ROUTES),
    canActivate: [roleGuard(['admin'])]
  },
  {
    path: 'shop',
    loadChildren: () => import('./features/shop/shop.routes')
      .then(m => m.SHOP_ROUTES)
  }
];
```
##### 5.2. Rutas Hijas con Lazy Loading
```typescript
// features/admin/admin.routes.ts
import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-layout/admin-layout.component')
      .then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component')
          .then(m => m.DashboardComponent),
        title: 'Admin - Dashboard'
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users.component')
          .then(m => m.UsersComponent),
        title: 'Admin - Usuarios'
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component')
          .then(m => m.SettingsComponent),
        title: 'Admin - Configuración'
      }
    ]
  }
];
```
##### 5.3. Layout Component para Admin
```typescript
// features/admin/admin-layout/admin-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-layout">
      <aside class="sidebar">
        <div class="logo">
          <h2>Admin Panel</h2>
        </div>

        <nav class="nav-menu">
          <a routerLink="/admin/dashboard" routerLinkActive="active">
            <span class="icon">📊</span>
            Dashboard
          </a>
          <a routerLink="/admin/users" routerLinkActive="active">
            <span class="icon">👥</span>
            Usuarios
          </a>
          <a routerLink="/admin/settings" routerLinkActive="active">
            <span class="icon">⚙️</span>
            Configuración
          </a>
        </nav>

        <div class="sidebar-footer">
          <a routerLink="/home">← Volver al sitio</a>
        </div>
      </aside>

      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: grid;
      grid-template-columns: 250px 1fr;
      min-height: 100vh;
    }

    .sidebar {
      background: #2c3e50;
      color: white;
      display: flex;
      flex-direction: column;
    }

    .logo {
      padding: 2rem 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .logo h2 {
      margin: 0;
      font-size: 1.5rem;
    }

    .nav-menu {
      flex: 1;
      padding: 1rem 0;
    }

    .nav-menu a {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      color: rgba(255,255,255,0.8);
      text-decoration: none;
      transition: all 0.3s;
    }

    .nav-menu a:hover {
      background: rgba(255,255,255,0.1);
      color: white;
    }

    .nav-menu a.active {
      background: #3498db;
      color: white;
      border-left: 4px solid #2980b9;
    }

    .icon {
      font-size: 1.3rem;
    }

    .sidebar-footer {
      padding: 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .sidebar-footer a {
      color: rgba(255,255,255,0.6);
      text-decoration: none;
    }

    .sidebar-footer a:hover {
      color: white;
    }

    .content {
      background: #ecf0f1;
      padding: 2rem;
      overflow-y: auto;
    }
  `]
})
export class AdminLayoutComponent {}
```
##### 5.4. Preloading Strategies
```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  PreloadAllModules,
  // QuicklinkStrategy // Alternativa más inteligente
} from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      // Precargar todos los módulos lazy después de la carga inicial
      withPreloading(PreloadAllModules)
    )
  ]
};
```
##### 5.5. Custom Preloading Strategy
```typescript
// strategies/selective-preload.strategy.ts
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SelectivePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Solo precargar rutas que tengan data.preload = true
    if (route.data?.['preload']) {
      const delay = route.data?.['preloadDelay'] || 0;

      console.log('Precargando:', route.path);

      return timer(delay).pipe(
        mergeMap(() => load())
      );
    }

    return of(null);
  }
}

// Uso en app.config.ts
import { withPreloading } from '@angular/router';
import { SelectivePreloadStrategy } from './strategies/selective-preload.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(SelectivePreloadStrategy)
    )
  ]
};

// En las rutas
export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes'),
    data: {
      preload: true, // Precargar esta ruta
      preloadDelay: 2000 // Esperar 2 segundos
    }
  },
  {
    path: 'rarely-used',
    loadChildren: () => import('./features/rarely-used/routes'),
    data: { preload: false } // No precargar
  }
];
```

#### 6. `CanMatch` - Control de Carga de Rutas
```typescript
// guards/feature-flag.guard.ts
import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';

// Servicio de feature flags
@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  private features = {
    betaFeatures: false,
    newDashboard: true,
    experimentalUI: false
  };

  isEnabled(feature: string): boolean {
    return this.features[feature as keyof typeof this.features] || false;
  }

  enable(feature: string) {
    if (feature in this.features) {
      this.features[feature as keyof typeof this.features] = true;
    }
  }
}

// Guard funcional
export const featureFlagGuard = (feature: string): CanMatchFn => {
  return () => {
    const featureService = inject(FeatureFlagService);
    return featureService.isEnabled(feature);
  };
};

// Uso en rutas
export const routes: Routes = [
  {
    path: 'beta',
    loadChildren: () => import('./features/beta/beta.routes'),
    canMatch: [featureFlagGuard('betaFeatures')]
  },
  {
    path: 'new-dashboard',
    loadComponent: () => import('./pages/new-dashboard/new-dashboard.component')
      .then(m => m.NewDashboardComponent),
    canMatch: [featureFlagGuard('newDashboard')]
  },
  // Ruta fallback si el feature está deshabilitado
  {
    path: 'new-dashboard',
    loadComponent: () => import('./pages/old-dashboard/old-dashboard.component')
      .then(m => m.OldDashboardComponent)
  }
];
```

#### 7. Proyecto Completo Integrado
```typescript
// app.routes.ts - Sistema Completo
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { canDeactivateGuard } from './guards/can-deactivate.guard';
import { productDetailResolver } from './resolvers/product-detail.resolver';

export const routes: Routes = [
  // Rutas Públicas
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent),
    title: 'Inicio'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component')
      .then(m => m.LoginComponent),
    title: 'Iniciar Sesión'
  },

  // Rutas Protegidas
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    canActivate: [authGuard],
    title: 'Dashboard'
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component')
      .then(m => m.ProfileComponent),
    canActivate: [authGuard],
    canDeactivate: [canDeactivateGuard],
    title: 'Mi Perfil'
  },

  // Módulo Admin (Lazy Loaded y protegido)
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes')
      .then(m => m.ADMIN_ROUTES),
    canActivate: [authGuard, roleGuard(['admin'])],
    data: { preload: true }
  },

  // Módulo Tienda (Lazy Loaded)
  {
    path: 'shop',
    loadChildren: () => import('./features/shop/shop.routes')
      .then(m => m.SHOP_ROUTES)
  },

  // Rutas con Resolver
  {
    path: 'products/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.component')
      .then(m => m.ProductDetailComponent),
    resolve: {
      productData: productDetailResolver
    },
    title: 'Detalle del Producto'
  },

  // Rutas con Feature Flags
  {
    path: 'new-features',
    loadComponent: () => import('./pages/new-features/new-features.component')
      .then(m => m.NewFeaturesComponent),
    canMatch: [featureFlagGuard('betaFeatures')]
  },

  // Rutas de Error
  {
    path: 'unauthorized',
    loadComponent: () => import('./pages/unauthorized/unauthorized.component')
      .then(m => m.UnauthorizedComponent),
    title: 'Acceso Denegado'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component')
      .then(m => m.NotFoundComponent),
    title: 'Página no Encontrada'
  }
];
```
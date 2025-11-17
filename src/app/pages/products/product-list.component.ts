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

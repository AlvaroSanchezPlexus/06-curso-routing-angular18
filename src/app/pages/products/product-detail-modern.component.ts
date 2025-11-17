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

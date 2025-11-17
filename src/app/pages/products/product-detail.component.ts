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

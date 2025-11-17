import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Editar Producto #{{ id }}</h1>

      <form (ngSubmit)="saveProduct()" #productForm="ngForm">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" id="name" name="name" [(ngModel)]="product.name" required>
        </div>

        <div class="form-group">
          <label for="price">Precio:</label>
          <input type="number" id="price" name="price" [(ngModel)]="product.price" required>
        </div>

        <div class="form-group">
          <label for="description">Descripción:</label>
          <textarea id="description" name="description" [(ngModel)]="product.description" rows="4"></textarea>
        </div>

        <div class="actions">
          <button type="submit" [disabled]="!productForm.form.valid">Guardar Cambios</button>
          <button type="button" (click)="cancel()">Cancelar</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 700px;
      margin: 2rem auto;
      padding: 2rem;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button[type="submit"] {
      background-color: #007bff;
      color: white;
    }

    button[type="button"] {
      background-color: #6c757d;
      color: white;
    }
  `]
})
export class ProductEditComponent implements OnInit {
  @Input() id?: string;

  product: any = {};

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    // Simular carga de datos del producto
    this.product = {
      id: this.id,
      name: 'Laptop Gaming',
      price: 1299.99,
      description: 'Potente laptop para gaming con RTX 4070'
    };
  }

  saveProduct() {
    console.log('Producto guardado:', this.product);
    this.router.navigate(['/products', this.id]);
  }

  cancel() {
    this.location.back();
  }
}

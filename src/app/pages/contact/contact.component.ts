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

import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  public username = signal<string>('Usuario_Admin');
  public errorMessage = signal<string>('');

  public saveSettings(): void {
    const val = this.username().trim();

    if (val.length < 5) {
      this.errorMessage.set('El nombre debe tener al menos 5 caracteres.');
      return;
    }

    this.errorMessage.set('');
    alert('Configuración guardada correctamente.');
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
  // Recibe :id automáticamente gracias a withComponentInputBinding() en app.config.ts
  @Input() id?: string;

  ngOnInit(): void {
    console.log('ID recibido de la ruta:', this.id);
  }
}

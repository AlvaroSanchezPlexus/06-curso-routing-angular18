import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
interface Post {
  id: number;
  title: string;
  category: string;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  // --- Estado con Signals ---
  public readonly searchTerm = signal<string>('');
  public readonly selectedCategory = signal<string>('');
  public readonly currentPage = signal<number>(1);

  // --- Datos Mock ---
  private readonly _allPosts: Post[] = [
    { id: 1, title: 'Introducción a Angular 18', category: 'tecnologia' },
    { id: 2, title: 'Recetas con TypeScript', category: 'cocina' },
    { id: 3, title: 'Signals: El futuro de Angular', category: 'tecnologia' },
    { id: 4, title: 'Viaje a Japón', category: 'viajes' },
  ];

  // --- Lógica de filtrado en el TS (Computed) ---
  public filteredPosts = computed(() => {
    return this._allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(this.searchTerm().toLowerCase());
      const matchesCategory = this.selectedCategory() === '' || post.category === this.selectedCategory();
      return matchesSearch && matchesCategory;
    });
  });

  ngOnInit(): void {
    // Sincronizamos la URL con nuestros Signals
    this._route.queryParams.subscribe(params => {
      if (params['search']) this.searchTerm.set(params['search']);
      if (params['category']) this.selectedCategory.set(params['category']);
      if (params['page']) this.currentPage.set(Number(params['page']));
    });
  }

  public onFilterChange(): void {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        search: this.searchTerm() || null,
        category: this.selectedCategory() || null,
        page: 1 // Reset a pág 1 al filtrar
      },
      queryParamsHandling: 'merge'
    });
  }

  public clearFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('');
    this.onFilterChange();
  }
}

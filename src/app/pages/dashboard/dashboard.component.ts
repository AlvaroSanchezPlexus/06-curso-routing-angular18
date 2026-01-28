import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  searchTerm: any;
  selectedCategory: any;

  public goToSection(section: string) {
    this._router.navigate(['/dashboard', 'stats'], { fragment: section });
  }
  public onFilterChange(): void {
    const term = this.searchTerm().trim();

    if (term.length > 0 && term.length < 3) {
      console.warn('El término de búsqueda es muy corto');
      return; 
    }

    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        search: term || null,
        category: this.selectedCategory() || null
      },
      queryParamsHandling: 'merge'
    });
  }
  public irAHome(): void {
    this._router.navigate(['/home']);
  }
}

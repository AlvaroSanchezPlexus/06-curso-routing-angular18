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

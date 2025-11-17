import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductListComponent } from './pages/products/product-list.component';
import { ProductDetailComponent } from './pages/products/product-detail.component';
import { ProductEditComponent } from './pages/products/product-edit.component';
import { PostDetailComponent } from './pages/posts/post-detail.component';
import { DocumentationComponent } from './pages/docs/documentation.component';
import { UserListComponent } from './pages/users/user-list.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Inicio',
    data: { breadcrumb: 'Inicio' }
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'Acerca de',
    data: { breadcrumb: 'Acerca de' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contacto',
    data: { breadcrumb: 'Contacto' }
  },
  {
    path: 'products',
    data: { breadcrumb: 'Productos' },
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        data: { breadcrumb: 'Detalle' }
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        data: { breadcrumb: 'Editar' }
      }
    ]
  },
  {
    path: 'users/:userId/posts/:postId',
    component: PostDetailComponent,
    title: 'Detalle del Post',
    data: { breadcrumb: 'Post' }
  },
  {
    path: 'docs',
    component: DocumentationComponent,
    title: 'Documentación',
    data: { breadcrumb: 'Documentación' }
  },
  {
    path: 'users',
    component: UserListComponent,
    title: 'Usuarios',
    data: { breadcrumb: 'Usuarios' }
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar Sesión'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard], // Solo usuarios autenticados
    title: 'Dashboard'
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [roleGuard(['admin'])], // Solo administradores
    title: 'Panel de Administración'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    title: 'Mi Perfil'
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    title: 'Acceso Denegado'
  },
  {
    path: '**',
    redirectTo: '/home' // Ruta 404
  }
];

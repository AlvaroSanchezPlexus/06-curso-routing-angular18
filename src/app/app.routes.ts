import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { PostDetailComponent } from './pages/posts/post-detail.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StatsComponent } from './pages/dashboard/stats/stats.component';
import { SettingsComponent } from './pages/dashboard/settings/settings.component';

export enum AppRoutes {
  HOME = 'home',
  ABOUT = 'about',
  CONTACT = 'contact',
  PRODUCTS = 'productos',
  SERVICES = 'servicios',
  BLOG = 'blog'
}

export const routes: Routes = [
  { path: '', redirectTo: `/${AppRoutes.HOME}`, pathMatch: 'full' },
  {
    path: AppRoutes.HOME,
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
    title: 'Inicio | Mi App'
  },
  {
    path: AppRoutes.PRODUCTS,
    loadComponent: () => import('./pages/products/product-list.component').then(c => c.ProductListComponent),
    title: 'Productos | Calidad Premium'
  },
  {
    path: AppRoutes.BLOG,
    loadComponent: () => import('./pages/blog-list/blog-list.component').then(c => c.BlogListComponent),
    title: 'Blog | Noticias'
  },
  {
    path: AppRoutes.ABOUT,
    loadComponent: () => import('./pages/about/about.component').then(c => c.AboutComponent),
    title: 'Sobre nosotros'
  },
  {
    path: AppRoutes.CONTACT,
    loadComponent: () => import('./pages/contact/contact.component').then(c => c.ContactComponent),
    title: 'Contacto'
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog-list/blog-list.component').then(c => c.BlogListComponent),
    title: 'Mi Blog | Listado'
  },
  {
    path: 'blog/:userId',
    loadComponent: () => import('./pages/posts/post-detail.component').then(c => c.PostDetailComponent),
    title: 'Leyendo Post...'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
    title: 'Panel de Control',
    children: [
      { path: '', redirectTo: 'stats', pathMatch: 'full' },
      { path: 'stats', loadComponent: () => import('./pages/dashboard/stats/stats.component').then(c => c.StatsComponent) },
      { path: 'settings', loadComponent: () => import('./pages/dashboard/settings/settings.component').then(c => c.SettingsComponent) },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404 - No encontrado'
  }
];

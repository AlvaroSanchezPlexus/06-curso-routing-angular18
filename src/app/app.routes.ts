import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
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
    component: HomeComponent,
    title: 'Inicio | Mi App'
  },
  {
    path: AppRoutes.PRODUCTS,
    component: HomeComponent, 
    title: 'Productos | Calidad Premium'
  },
  {
    path: AppRoutes.SERVICES,
    component: HomeComponent,
    title: 'Servicios | Lo que hacemos'
  },
  {
    path: AppRoutes.BLOG,
    component: BlogListComponent,
    title: 'Blog | Noticias'
  },
  {
    path: AppRoutes.ABOUT,
    component: AboutComponent,
    title: 'Sobre nosotros'
  },
  {
    path: AppRoutes.CONTACT,
    component: ContactComponent,
    title: 'Contacto'
  },
  {
    path: 'blog',
    component: BlogListComponent,
    title: 'Mi Blog | Listado'
  },
  {
    path: 'blog/:id',
    component: PostDetailComponent,
    title: 'Leyendo Post...'
  },
  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'stats', component: StatsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'stats', pathMatch: 'full' }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404 - No encontrado'
  }
];

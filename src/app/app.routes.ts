import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';

export const routes: Routes = [
    { path: '', loadComponent: () => import('../pages/home/home.page').then(module => module.HomePage) },
    { path: 'login', loadComponent: () => import('../pages/login/login.page').then(module => module.LoginPage) }
];
import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/home/home.page').then((module) => module.HomePage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../pages/login/login.page').then((module) => module.LoginPage),
  },
  {
    path: 'review-book',
    loadComponent: () =>
      import('../pages/review/review.page').then((module) => module.ReviewPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../pages/register/register.page').then(
        (module) => module.RegisterPage
      ),
  },
];

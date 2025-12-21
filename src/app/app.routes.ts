import { Routes } from '@angular/router';
import { RegisterPage } from './components/register-page/register-page';
import { SigninPage } from './components/signin-page/signin-page';
import { MainPage } from './components/main-page/main-page';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: MainPage},
    {path: 'register', component: RegisterPage},
    {path: 'login', component: SigninPage}
];

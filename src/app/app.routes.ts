import { Routes } from '@angular/router';
import { RegisterPage } from './components/register-page/register-page';
import { SigninPage } from './components/signin-page/signin-page';
import { MainPage } from './components/main-page/main-page';
import { JobDescriptionPage } from './components/job-description-page/job-description-page';
import { UserDashboardPage } from './components/user-dashboard-page/user-dashboard-page';
import { UploadResumePage } from './components/upload-resume-page/upload-resume-page';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: MainPage},
    {path: 'register', component: RegisterPage},
    {path: 'login', component: SigninPage},
    {path: 'job-description', component: JobDescriptionPage},
    {path: 'user-dashboard', component: UserDashboardPage},
    {path: 'upload', component: UploadResumePage}
];

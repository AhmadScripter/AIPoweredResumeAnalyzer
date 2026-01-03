import { Routes } from '@angular/router';
import { RegisterPage } from './components/register-page/register-page';
import { SigninPage } from './components/signin-page/signin-page';
import { MainPage } from './components/main-page/main-page';
import { JobDescriptionPage } from './components/job-description-page/job-description-page';
import { UserDashboardPage } from './components/user-dashboard-page/user-dashboard-page';
import { UploadResumePage } from './components/upload-resume-page/upload-resume-page';
import { AnalysisPage } from './components/analysis-page/analysis-page';
import { Pagenotfound } from './components/pagenotfound/pagenotfound';
import { PastAnalyses } from './components/past-analyses/past-analyses';
import { authGuard } from './Guards/auth-guard';
import { AboutPage } from './components/about-page/about-page';
import { ContactPage } from './components/contact-page/contact-page';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: MainPage },
    { path: 'about', component: AboutPage },
    { path: 'contact', component: ContactPage },
    { path: 'privacy-policy', component: PrivacyPolicy },
    { path: 'register', component: RegisterPage },
    { path: 'login', component: SigninPage },
    { path: 'job-description', component: JobDescriptionPage, canActivate: [authGuard] },
    { path: 'dashboard', component: UserDashboardPage, canActivate: [authGuard] },
    { path: 'upload', component: UploadResumePage, canActivate: [authGuard] },
    { path: 'analysis', component: AnalysisPage, canActivate: [authGuard] },
    { path: 'analysis-result/:id', component: AnalysisPage, canActivate: [authGuard] },
    { path: 'past-analysis', component: PastAnalyses, canActivate: [authGuard] },
    { path: '**', component: Pagenotfound }
];

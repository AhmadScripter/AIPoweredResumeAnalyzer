import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainPage } from "./components/main-page/main-page";
import { RegisterPage } from "./components/register-page/register-page";
import { NavbarPage } from "./components/navbar-page/navbar-page";
import { FooterPage } from "./components/footer-page/footer-page";
import { SigninPage } from './components/signin-page/signin-page';

@Component({
  selector: 'app-root',
  imports: [NavbarPage, FooterPage, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AIPoweredResumeAnalyzer');
}

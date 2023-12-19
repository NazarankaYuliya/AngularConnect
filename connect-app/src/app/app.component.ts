import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuthenticatedUser: boolean = false;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {
    this.isAuthenticatedUser = this.authService.isAuthenticatedUser();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

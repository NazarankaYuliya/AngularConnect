import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string;

  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.applyTheme();
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme();
  }

  private applyTheme() {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(this.currentTheme);
  }
}

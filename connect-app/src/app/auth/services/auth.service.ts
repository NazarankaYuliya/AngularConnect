import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  register() {
    console.log('you are registered!');
  }

  login() {
    console.log('you are logged in!');
  }
}

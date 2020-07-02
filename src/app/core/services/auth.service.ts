import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDataStorageService} from './user-data-storage.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userData: UserDataStorageService, private router: Router) {
  }

  async register(formData: object) {
    const response = await fetch(`${environment.apiUri}auth/register`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    // console.log(await response.json());
  }

  async login(formData: object) {
    const response = await fetch(`${environment.apiUri}auth/login`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();

    if (!!data.token) {

      this.userData.setToken(data.token);
      this.userData.setUserId(data.userId);

      // console.log(localStorage.getItem('token'));
      // console.log(localStorage.getItem('userId'));

      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}

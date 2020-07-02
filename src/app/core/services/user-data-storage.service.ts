import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataStorageService {

  setToken(token): void {
    localStorage.setItem('token', token);
  }
  setUserId(userId): void {
    localStorage.setItem('userId', userId);
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  getUserId(): string {
    return localStorage.getItem('userId');
  }
  removeToken(): void {
    localStorage.removeItem('token');
  }
  removeUserId(): void {
    localStorage.removeItem('userId');
  }
}

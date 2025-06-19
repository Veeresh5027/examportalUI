import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new BehaviorSubject<boolean>(this.isLogin());

  constructor(private http: HttpClient) {}

  // Get current user
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // Generate token
  generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // Login user: set token in local storage
  loginUser(token: any) {
    localStorage.setItem('token', token);
    this.loginStatusSubject.next(true); // Notify all components
    return true;
  }

  // Is user logged in
  isLogin(): boolean {
    const token = localStorage.getItem('token');
    return token !== undefined && token !== '' && token !== null;
  }

  // Logout user
  logout(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusSubject.next(false); // Notify all components
    return true;
  }

  // Get token
  getToken() {
    return localStorage.getItem('token');
  }

  // Set user
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get user
  getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) return JSON.parse(userStr);
    else {
      return null;
    }
  }

  // Get user role
  getUserRole() {
    let user = this.getUser();
    return user?.authorities[0]?.authority;
  }
}

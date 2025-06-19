import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user: any = null;

  constructor(public login: LoginService, private router: Router) {}

  ngOnInit(): void {
    // Initial check
    this.isLoggedIn = this.login.isLogin();
    this.user = this.login.getUser();

    // Listen for login/logout changes
    this.login.loginStatusSubject.asObservable().subscribe((status) => {
      this.isLoggedIn = status;
      this.user = this.login.getUser();
    });
  }

  public logout() {
    this.login.logout();
    // `loginStatusSubject` will notify the navbar to update automatically
    this.router.navigate(['/login']);
  }
}
  
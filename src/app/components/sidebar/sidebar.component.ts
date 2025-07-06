import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private login:LoginService, private router:Router){

  }

  public logout() {
    this.login.logout();
    // `loginStatusSubject` will notify the navbar to update automatically
    this.router.navigate(['/login']);
  }

}

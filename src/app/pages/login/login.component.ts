import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  }

  constructor(private snackBar:MatSnackBar, private login:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

 public formSubmit() {
  if (this.loginData.username.trim() === '' || this.loginData.username == null) {
    this.snackBar.open('User Name is required !!', 'Ok', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' });
    return;
  }

  if (this.loginData.password.trim() === '' || this.loginData.password == null) {
    this.snackBar.open('Password is required !!', 'Ok', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' });
    return;
  }

  this.login.generateToken(this.loginData).subscribe(
    (data: any) => {
      console.log('Token generated:', data);

      this.login.loginUser(data.token); // ✅ only sets token now

      this.login.getCurrentUser().subscribe(
        (user: any) => {
          console.log('User fetched:', user);

          this.login.setUser(user); // ✅ store user
          this.login.loginStatusSubject.next(true); // ✅ notify AFTER user is set

          // Redirect
          const role = this.login.getUserRole();
          if (role === 'ADMIN') {
            this.router.navigate(['admin']);
          } else if (role === 'NORMAL') {
            this.router.navigate(['user-dashboard/0']);
          } else {
            this.login.logout();
          }
        },
        (error) => {
          console.log('Error fetching user:', error);
        }
      );
    },
    (error) => {
      console.log('Token error:', error);
      this.snackBar.open('Something went wrong !!', 'Ok', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  );
}

  }


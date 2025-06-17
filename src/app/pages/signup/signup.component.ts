import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    firstName: '',

    //add user

    lastName: '',
    email: '',
    phone: ''
  }

  constructor(private userService:UserService, private snackBar:MatSnackBar) { } 
  ngOnInit(): void {
   
  }

  
  formSubmit(){
   console.log(this.user);
   if(this.user.username == '' || this.user.username == null){
    //  alert('Username is required');
     this.snackBar.open('Username is required !!', 'Ok', {
       duration: 3000,
       verticalPosition: 'top',
       horizontalPosition: 'right'
     });
     return;
   }

   //add user
   this.userService.addUser(this.user).subscribe(
    (data:any)=>{
      console.log(data);
      // alert('success');
      Swal.fire('Success !!', 'User is registered successfully and UserID is' + data.id, 'success');
    },
    (error)=>{
      console.log(error);
      // alert('something went wrong');
      this.snackBar.open('Something went wrong !!', 'Ok', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }
   )
  }

}

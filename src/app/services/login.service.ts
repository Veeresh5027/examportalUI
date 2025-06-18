import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {

   }
   //generate token
   generateToken(loginData:any){
     return this.http.post(`${baseUrl}/generate-token`,loginData);
   }

   //login user set token in local storage
   loginUser(token:any){
     localStorage.setItem('token',token);
     return true;
   }

   //isLogin
   isLogin(){
     if(localStorage.getItem('token') == undefined || localStorage.getItem('token') == '' || localStorage.getItem('token') == null){
       return false;
     }else{
       return true;
     }
   }

   //logout
   logout(){
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     return true;
   }

   //get token
   getToken(){
     return localStorage.getItem('token');
   }

   //set user details
   setUser(user:any){
     localStorage.setItem('user',JSON.stringify(user));
   }

   //get user details
   getUser(){
     let userStr = localStorage.getItem('user');
     if(userStr != null){
       return JSON.parse(userStr);
     }else{
       this.logout();
       return null;
     }
   }  

   //get user role
   getUserRole(){
     let user = this.getUser();
     return user.authorities[0].authority;
   }
}

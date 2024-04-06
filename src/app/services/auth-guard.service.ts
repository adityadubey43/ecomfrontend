import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { json } from 'express';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  role= localStorage.getItem( "role" );
  user: string | null;

  constructor(private router:Router, private userservice:UserService) { }
  isLoggedIn() {
    return localStorage.getItem('Token'); 
  }
  isAdmin(): boolean {
    return this.role === 'admin';
  }
  logout() {
    // Clear any user authentication state, such as removing tokens from localStorage
    localStorage.removeItem('Token');
    localStorage.removeItem('userId');
    console.log("inside logout");

  }
  setuserrole(Role:string){
    console.log("user roel set successfully"+Role)
    localStorage.setItem('role',Role);
    this.role = Role;
  }
  getuserrole(){
    return  this.role;
  }
  
}

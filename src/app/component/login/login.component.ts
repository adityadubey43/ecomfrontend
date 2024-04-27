import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit {
  user: any;
   constructor( private authguardService: AuthGuardService, private router:Router, private http: HttpClient, ){}

  Userid:any;
  token:any;
  messageemail:any;
  messagepass:any;
  showPassword: boolean = false;
  passshowtext:string = "Show Password";

  readonly APIurl = environment.apiUrl; 

  formData = {
   
    emailid: '',
    password:'',
   
  };

  login(){
    console.log(JSON.stringify(this.formData));

    this.http.post(this.APIurl+'/login',this.formData).subscribe((resultData:any)=>{
      this.token = resultData.token;
      this.user = resultData.userDetailsWithoutPassword
      localStorage.setItem('Token',this.token);
      localStorage.setItem('user',JSON.stringify(this.user));
      this.authguardService.setuserrole(this.user.role);
      console.log(this.user)
      console.log(this.user.role)
      if (this.user.role ==="admin"){
        this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/dashboard']);
      }
      
    },(err)=>{
      this.messageemail = err.error.errors.email;
      this.messagepass = err.error.errors.password;
      console.log(this.messagepass)
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    if (this.showPassword == false){
      this.passshowtext="Show Password";
    }else{
      this.passshowtext="Hide Password"
    }
    
}

ngOnInit(): void {
  this.authguardService.logout();
}

}


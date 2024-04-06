import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logedinnav',
  templateUrl: './logedinnav.component.html',
  styleUrls: ['./logedinnav.component.css']
})
export class LogedinnavComponent implements OnInit {
  sidebarOpen = false;
  showprof = false;
  name: any;
  email: any;
  mob: any;
  userId:any;

  len:any = 0;
  product: any;
  countrycode: any;


  constructor(private router: Router, private authguardService: AuthGuardService, private userservice: UserService) {

  }
  Logout() {
    this.authguardService.logout();

    this.router.navigate(['/']);
  }
  getdata() {
    this.userservice.displayuser().subscribe((resultData: any) => {
        this.userId = resultData.userdetails._id
        this.name = resultData.userdetails.name;
        this.email = resultData.userdetails.email;
        this.mob = resultData.userdetails.mobilenumber;
        this.countrycode = resultData.userdetails.countrycode
        window.localStorage.setItem('userId',this.userId);
        window.localStorage.setItem('country',this.countrycode);

    }, error => {
      console.error(error);
      // Handle error if any
    });
  }
    toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  Showprofile(){
      this.showprof=!this.showprof
  }

  

 

  
  ngOnInit(): void {
    this.getdata();
  }
}

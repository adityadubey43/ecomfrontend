import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  name: any;
  email: any;
  mob: any;

  sidebarOpen = false;


  constructor(private router: Router, private authguardService: AuthGuardService, private userservice: UserService) {

  }

  @Output() Darkmode = new EventEmitter<boolean>();

  darkmode = false;
  darkl: boolean | undefined;
  setlogout = true;




  toggle() {
    if (this.darkmode === true) {
      this.darkmode = false;
      this.Darkmode.emit(this.darkmode);

    } else {

      this.darkmode = true;
      this.Darkmode.emit(this.darkmode);

    }
    this.darkl = this.darkmode;
    // console.log(this.darkmode);
  }

  Logout() {
    this.authguardService.logout();

    this.router.navigate(['/']);
  }
  isloggedin() {
    return this.authguardService.isLoggedIn();
  }
  isAdmin(){
    return this.authguardService.isAdmin();
  }
  getdata() {
    this.userservice.displayuser().subscribe((resultData: any) => {
      this.authguardService.setuserrole(resultData.userdetails.role);
      console.log(resultData.userdetails.role)

      // Handle the result here
    }, error => {
      console.error(error);
      // Handle error if any
    });
  }
 
  
    toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    console.log("clicked toggle")
  }


  ngOnInit(): void {
    this.getdata();
  }




}

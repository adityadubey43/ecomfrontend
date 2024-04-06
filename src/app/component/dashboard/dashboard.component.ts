import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isOpen = false;
  products: any;
  name: any;
  email: string | undefined;
  mob: any;
  purchases: any;

  constructor(private router: Router, private userservice: UserService) {

  }
  getdata() {
    this.userservice.displayuser().subscribe((resultData: any) => {
      // console.log(resultData);
      this.name = resultData.userdetails.name;
      this.email = resultData.userdetails.email;
      this.mob = resultData.userdetails.mobilenumber;
      // Handle the result here
    }, error => {
      console.error(error);
      // Handle error if any
    });
  }
 
  toggleSidebar() {
    this.isOpen = !this.isOpen;
    console.log("togglesidebar")
  }

  ngOnInit(): void {

    this.getdata();
    
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  purchases: any;
  status:any;
  packageStatus:string = "Active";
  currentDate: Date;

  constructor(private http:HttpClient, private userservice:UserService){}

  getpurchasedata() {
    const id = window.localStorage.getItem('userId')
    if (id) {
      this.userservice.purchasedproducts(id).subscribe((resultdata: any) => {
        this.purchases = resultdata;
        console.log("user have purchased this many : "+this.purchases);
        this.currentDate = new Date();
        console.log("inside if "+this.purchases.endDate+this.currentDate);
        
      }, (error: any) => {
        console.error(error);
      });
    }

  }

ngOnInit(): void {
  this.getpurchasedata();
}

}

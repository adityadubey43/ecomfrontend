import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  localcartItems: any;
  userId: string | null;
  productid: any;
  quantity: number;
  detail: {
    _id: any; 
};
  constructor(private userService: UserService, private router: Router, private authguardservices:AuthGuardService) {}
  
  cartItems: any;

  getcartdata(){
     this.userId = localStorage.getItem('userId');
    console.log("Getting user ID from local storage:", this.userId);

    if (this.userId) {
      this.addlocatitems();
      // If user is logged in, fetch cart items from backend
      this.userService.getcart(this.userId).subscribe(
        (resultdata:any) => {
          // Handle successful response
          console.log("Cart response:", resultdata);
          this.cartItems= resultdata;
          console.log("cart items", this.cartItems);
        },
        (error) => {
          // Handle error
          console.error('Error fetching cart items:', error);
          // You can optionally set cartItems to an empty array or handle this error case differently
        }
      );
    } else {
      // If user is not logged in, retrieve cart items from local storage
      const storedItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      this.cartItems = storedItems;
      console.log(this.cartItems)
    }
      
}
  addlocatitems() {
    const storedItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItems = storedItems;
    console.log("inside push cart",this.cartItems);
    this.cartItems.forEach((item:any) => {
      
      this.productid = item.productId._id
      console.log("inside item",item)
      this.quantity = item.quantity
      console.log("local pushing items", this.productid,this.quantity,this.userId);
      this.userService.addtocart(this.userId,this.productid,this.quantity).subscribe((response:any)=>{
        alert("Added Successfully");

      });

    });
    localStorage.removeItem('cartItems');

  }
  buyProduct(product: { _id: any; },quantity:number) {
    // Navigate to the product details component
    this.detail = product;
    console.log(this.detail)
    this.productid = this.detail._id;
    this.quantity = quantity;
    console.log("product Quantity is"+this.productid);

    // this.router.navigate(['/details/', this.productid]);
    this.router.navigate(['/details/'],  { queryParams: { productid: this.productid, quantity: this.quantity } });
  }
  removeProduct(product: { _id: any; }){
    this.detail = product;
    console.log(this.detail)
    this.productid = this.detail._id;
    this.userService.rfcart(this.userId,this.productid).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
    }
    

  )}
  ngOnInit(): void {
    this.getcartdata();
  }
}

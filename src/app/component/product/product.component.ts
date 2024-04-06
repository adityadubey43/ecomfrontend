import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  detail: any;
  productid: any;
  quantity=1;
  userId = localStorage.getItem('userId');

  constructor(private router: Router, private userservice: UserService , private authguardservices:AuthGuardService) { }

  products: any;

  getProducts() {
    this.userservice.displayProducts().subscribe((resultData: any) => {
      this.products = resultData;
      // console.log(this.products);
    }, (error) => {
      console.error('Error fetching products:', error);
      // Handle error, show error message, etc.
    });
  }
  buyProduct(product: { id: any; }) {
    // Navigate to the product details component
    this.detail = product;
    console.log(this.detail)
    this.productid = this.detail._id;
    console.log("product id"+this.productid);

    this.router.navigate(['/details/'],  { queryParams: { productid: this.productid, quantity: this.quantity } });
  }
  addtocart(product: { id: any; }){
    this.detail = product;
    this.productid = this.detail._id;
    if (!this.authguardservices.isLoggedIn()) {
      this.storeItemLocally(product); 
    }else{
      this.userservice.addtocart(this.userId,this.productid,this.quantity).subscribe((response:any)=>{
        alert("Added Successfully");
      });
    }

    // Add item to the cart
  }

  storeItemLocally(product: any) {
    let storedItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = storedItems.find((item: { _id: any; }) => item._id === product._id);

    if (existingItem) {
        // If product is already stored locally, increase its quantity
        existingItem.quantity++;
    } else {
        // If product is not stored locally, add it
        storedItems.push({ productId: product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(storedItems));
}


  ngOnInit(): void {
    this.getProducts();

  }

}

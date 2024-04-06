import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { query } from 'express';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  name: any;
  email: any;
  mob: any;
  detail: { _id: any; };
  productid: any;
  totalPrice: number;
  selectedQuantity: number = 1;
  constructor(private router: Router, private route: ActivatedRoute, private userservice: UserService, private http: HttpClient) { }

  product!: Product;
  showPaypalButton: boolean = false;


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const productId = params['productid'];
      console.log(params)
      this.selectedQuantity = Number(params['quantity']);
      console.log(this.selectedQuantity);
     
      if (productId !== null) { // Check if productId is not null
        this.userservice.productdetails(productId).subscribe(product => {
          this.product = product;
        });
      } else {
        console.log('product not found');
      }
    });
  }
  changeQuantity(change: number) {
    console.log('Change:', change);
    const newQuantity = this.selectedQuantity + change;
    console.log('New Quantity:', newQuantity);
    if (newQuantity >= 1 && newQuantity <= 12) {
      this.selectedQuantity = newQuantity;
      console.log('Selected Quantity:', this.selectedQuantity);
    }
  }
  cnfbuyProduct(product: { _id: any; }) {
    // Navigate to the product details component
    console.log('Selected duration:', this.selectedQuantity);
    this.detail = product;
    console.log(this.detail)
    this.productid = this.detail._id;
    console.log("product id"+this.detail);
    this.router.navigate(['/confirm-payment'],  { queryParams: { productid: product._id, quantity: this.selectedQuantity } });
  }
  country(){
    return window.localStorage.getItem('country');
  }
}

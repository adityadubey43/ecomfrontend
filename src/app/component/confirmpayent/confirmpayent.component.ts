import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare var paypal: any;

@Component({
  selector: 'app-confirmpayent',
  templateUrl: './confirmpayent.component.html',
  styleUrls: ['./confirmpayent.component.css']
})
export class ConfirmpayentComponent implements OnInit {

  paypalClientId: string = environment.CLIENT_ID;

  @ViewChild('paypal', { static: true }) paypal: ElementRef
  name: any;
  email: any;
  mob: any;
  product: any;
  userID: any;
  totalPrice:number;
  duration:number;
  selectedQuantity:any;
  

  constructor(private router: Router, private route: ActivatedRoute, private userservice: UserService, private http: HttpClient) { }

  pricecountry = window.localStorage.getItem('country');
  country(){
    return this.pricecountry;
  }

  ngOnInit(): void {

    const paypalScript = document.createElement('script');
    paypalScript.src = `https://www.paypal.com/sdk/js?client-id=${this.paypalClientId}`;
    paypalScript.async = true;
    document.body.appendChild(paypalScript);
    
    this.userservice.displayuser().subscribe((resultData: any) => {
      this.userID = resultData.userdetails._id;
      this.name = resultData.userdetails.name;
      this.email = resultData.userdetails.email;
      this.mob = resultData.userdetails.mobilenumber;
    });

    this.route.queryParams.subscribe(params => {
      const productId = params['productid'];
      console.log(params)
      this.selectedQuantity = params['quantity'];
      console.log(this.selectedQuantity)

      if (productId !== null) { // Check if productId is not null
        this.userservice.productdetails(productId).subscribe(product => {
          this.product = product;
          console.log(this.product);
          if(this.pricecountry == 'India'){
            console.log(this.product.Indprice + this.selectedQuantity);
            this.totalPrice = this.product.Indprice*this.selectedQuantity;
            this.duration = Number(this.selectedQuantity);
            this.setupPaypalButtons('USD');
          }else if(this.pricecountry == 'USA'){
            this.totalPrice = this.product.USAprice*this.selectedQuantity;
            this.duration = Number(this.selectedQuantity);
            this.setupPaypalButtons('USD');
          }else if(this.pricecountry == 'UK'){
            this.totalPrice = this.product.UKprice*this.selectedQuantity;
            this.duration = Number(this.selectedQuantity);
            this.setupPaypalButtons('GBP');
          }
          
          
          console.log("totalpricing"+this.totalPrice);
           // Call method to set up PayPal buttons
        });
      } else {
        console.log('product not found');
      }
    });
  }
  setupPaypalButtons(code:string) {
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              description: this.product.productName,
              amount: {
                currency_code: code,
                value: this.totalPrice
              }
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          const transactionID = order.id; // Capture transaction ID

          // Send transaction ID to backend along with other data
          this.sendTransactionDetails(transactionID);
        },
        onError: (err: any) => {
          console.log(err);
        }
      })
      .render(this.paypal.nativeElement);
  }

  sendTransactionDetails(transactionID: string) {
    const quantity = this.selectedQuantity; // You may adjust this as needed
    const userId = window.localStorage.getItem('userId');

    if (userId && this.product._id) {
      // Send transaction details to backend
      this.userservice.buyproduct(userId, this.product._id, this.totalPrice, quantity, transactionID,this.duration).subscribe(resultData => {
        // Handle the response from the backend if needed
        alert("Thank you for purchasing");
        this.sendEmail(this.product.productName,this.totalPrice);
      });
    }
  }

  sendEmail(productName: string , pricing:number) {
    const emailjsData = {
      service_id: 'service_em94zlm',
      template_id: 'template_hyz8oq3',
      user_id: 'HynivT8cnH3oJvxMa',
      template_params: {
        name: this.name,
        email: this.email,
        message: productName,
        pricing: this.totalPrice
      }
    };

    this.http.post('https://api.emailjs.com/api/v1.0/email/send', emailjsData)
      .subscribe(response => {
        console.log('Email sent successfully:', response);
        alert("Submitted");
      }, error => {
        console.error('Error sending email:', error);
        this.router.navigate(['/purchase-details']);
      });
  }
}

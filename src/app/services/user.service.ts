import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  readonly APIurl = environment.apiUrl;

  displayuser(): Observable<any> {
    const token = localStorage.getItem('Token');
    // console.log("token is " + token)
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // console.log(headers)
      return this.http.get(this.APIurl + '/userdetail', { headers });
      
    } else {
      // Handle case where token doesn't exist (optional)
      console.log('Token not found in local storage');
      return throwError('Token not found in local storage');
    }
  }
  displayProducts(){

    return this.http.get(this.APIurl + '/products');

  }
  addProduct(productData: any): Observable<any> {
    return this.http.post<any>(this.APIurl + '/add-product', productData);
  }
  productdetails(productId: string): Observable<any>{
    // console.log("inside services"+productId)
    return this.http.get(this.APIurl + '/product/'+productId);
  }
  buyproduct(userId:string,productId:string,totalPrice:number,quantity:number,transactionID:string, duration:number):Observable<any>{
    const payload = { userId, productId, totalPrice, quantity,transactionID, duration };
    return this.http.post(this.APIurl+'/purchase',payload)
  }
  purchasedproducts(id:string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${id}`);
    return this.http.get(this.APIurl + '/purchase', { headers });
  }

addtocart(userId:any,productId:string,quantity:number){
  const payload = { userId, productId,quantity };
  return this.http.post(this.APIurl+'/addtocart',payload)
}
  getcart(userId:string){
    console.log("inside services",userId)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${userId}`);
    return this.http.get(this.APIurl + '/cart', { headers });
  }
  rfcart(userId:any,productId:string){
    console.log(productId);
    const payload = { userId, productId };
    return this.http.post(this.APIurl+'/remove',payload);
  }
}

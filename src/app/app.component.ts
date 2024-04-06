import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  names:any=[];
  constructor(private http: HttpClient) {}
  
  title = 'Conversion';
  readonly APIurl = environment.apiUrl;
  
  darkmo: boolean | undefined;
  GetData(darkmode:boolean){
    this.darkmo=darkmode;
  }
  Getuser(newUser:string){
    console.log(newUser);
  }
 displaydata(){
    this.http.get(this.APIurl+"/display").subscribe(data=>{
      console.log(data);
      this.names= data;
    })
  
  }
  
  ngOnInit(){
    this.displaydata();
  }
}

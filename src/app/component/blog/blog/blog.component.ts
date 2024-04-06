import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private http:HttpClient, private userservices: UserService, private router:Router){}

  readonly Apiurl = environment.apiUrl;

  Blogs:any;

  ngOnInit(): void {

    this.http.get(this.Apiurl+'/blogs').subscribe(response=>{
      console.log(response);
      this.Blogs = response
      console.log(this.Blogs)
    })
  }
  getBlog(title:string,id:string){
    this.router.navigate(['/blog/',title+ '/' + id]);
  }

  

}

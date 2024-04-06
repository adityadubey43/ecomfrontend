import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit{

  constructor(private router: Router, private route: ActivatedRoute, private userservice: UserService, private http: HttpClient){}

  id:string;
  blog:any;

  readonly Apiurl = environment.apiUrl;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const blogIdwithtitle = params.get('id');
      if(blogIdwithtitle){
        const blogId = blogIdwithtitle?.split('/')
      this.id = blogId[1]
      console.log(this.id);
      }

      this.http.get(this.Apiurl+'/blog-details/'+this.id).subscribe(result=>{
        
        console.log(result)
       this.blog = result
      })
      
    });
  }

}

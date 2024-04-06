import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {

  readonly Apiurl = environment.apiUrl;

  constructor(private http: HttpClient ,private router:Router){

  }

  formData = {
    title: '',
    snippet: '',
    img:'',
    category: '',
    body: '',
    keywords:''
  };

  submitForm() {
    // Implement your form submission logic here
    console.log('Form submitted:', this.formData);

    this.http.post(this.Apiurl+'/add-blogs',this.formData).subscribe(result=>{
      console.log(result);
      alert('Blog Added')
      window.location.reload();
    },error=>{
      console.log(error);
    })
  }
}

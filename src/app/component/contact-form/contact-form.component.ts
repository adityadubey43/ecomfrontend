import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ThankyouComponent } from '../thankyou/thankyou.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  ContactForm : FormGroup;
  phoneTouched: boolean = false;
  Cotacterror:String;

  constructor(private fb: FormBuilder,private http: HttpClient , private router: Router) {}
  ngOnInit(): void {
    this.ContactForm = this.fb.group({
      Name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobilenumber: ['', [Validators.required, Validators.minLength(10)]],
      message: ['', Validators.required],
      messageurl: ['', Validators.required],
  });
  }

  
  formData = {
    name: '',
    email: '',
    mob:'',
    message: '',
    messageurl: ''
  };

  isValidPhoneNumber(): boolean {
    return /^\d{10}$/.test(this.formData.mob);
  }
  

  submitForm() {
    const emailjsData = {
      service_id: 'service_em94zlm',
      template_id: 'template_4zyr61n',
      user_id: 'HynivT8cnH3oJvxMa',
      template_params: {
        name: this.formData.name,
        email: this.formData.email,
        mob:this.formData.mob,
        message: this.formData.message,
        messageurl:this.formData.messageurl
      }
    };
    if(this.formData.name == '' || this.formData.email=='' || this.formData.mob==''){
      this.Cotacterror = 'All fields are required';
    }else{
      this.http.post('https://api.emailjs.com/api/v1.0/email/send', emailjsData)
      .subscribe( response => {
        console.log('Email sent successfully:', response);
        // Optionally, reset the form after successful submission
        alert("sumited");
        // this.formData = { name: '', email: '', message: '' };
      },(error) => {
        this.router.navigate(['/thankyou']);
      });
    }
     
      

  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  message: any;
  token: any;
  RegisterForm: FormGroup;
  nameTouched: boolean = false;
  emailTouched: boolean = false;
  passwordTouched: boolean = false;
  phoneTouched: boolean = false;
  user: any;

  constructor(
    private fb: FormBuilder,
    private authguardService: AuthGuardService,
    private router: Router,
    private http: HttpClient
  ) {
    this.RegisterForm = this.fb.group({
      Name: ['', Validators.required],
      email: ['', Validators.required],
      password: [Validators.required, Validators.min(6)],
      countrycode: [Validators.required],
      mobilenumber: ['', Validators.required, Validators.min(6)],
    });
  }

  readonly APIurl = environment.apiUrl;

  formData = {
    name: '',
    email: '',
    password: '',
    countrycode: '',
    mobilenumber: '',
  };

  register() {
    // console.log(JSON.stringify(this.formData));

    const formData = this.formData;

    this.http.post(this.APIurl + '/register', formData).subscribe(
      (resultData: any) => {
        this.token = resultData.token;
        this.user = resultData.userDetailsWithoutPassword;
        localStorage.setItem('Token', this.token);
        this.authguardService.setuserrole(this.user.role);
        console.log(this.user);
        console.log(this.user.role);
        this.router.navigate(['/']);
        // window.location.reload();
      },
      (err) => {
        this.message = err.error.errors.email;
        console.log(this.message);
      }
    );
  }

  isValidPhoneNumber(): boolean {
    return /^\d{10}$/.test(this.formData.mobilenumber);
  }
  isValidpass(): boolean {
    const passRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
    return passRegex.test(this.formData.password);
  }
  ngOnInit(): void {
    this.authguardService.logout();
  }
}

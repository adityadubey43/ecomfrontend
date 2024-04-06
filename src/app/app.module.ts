import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from '@tinymce/tinymce-angular';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './component/pages/pages.component';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { OurpartnersComponent } from './component/ourpartners/ourpartners.component';
import { ContactFormComponent } from './component/contact-form/contact-form.component';
import { FooterComponent } from './component/footer/footer.component';
import { ThankyouComponent } from './component/thankyou/thankyou.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LogedinnavComponent } from './component/logedinnav/logedinnav.component';
import { ProductComponent } from './component/product/product.component';
import { AddProductsComponent } from './component/add-products/add-products.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ConfirmpayentComponent } from './component/confirmpayent/confirmpayent.component';
import { ProductdetailsComponent } from './component/productdetails/productdetails.component';
import { PrivecyComponent } from './component/privecy/privecy.component';
import { TermsComponent } from './component/terms/terms.component';
import { BlogDetailsComponent } from './component/blog/blog-details/blog-details.component';
import { BlogComponent } from './component/blog/blog/blog.component';
import { AddBlogComponent } from './component/blog/add-blog/add-blog.component';
import { AdminComponent } from './component/admin/admin.component';
import { CartComponent } from './component/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NavComponent,
    HomeComponent,
    OurpartnersComponent,
    ContactFormComponent,
    FooterComponent,
    ThankyouComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    LogedinnavComponent,
    ProductComponent,
    AddProductsComponent,
    ProductDetailsComponent,
    ConfirmpayentComponent,
    ProductdetailsComponent,
    PrivecyComponent,
    TermsComponent,
    BlogDetailsComponent,
    BlogComponent,
    AddBlogComponent,
    AdminComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    EditorModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

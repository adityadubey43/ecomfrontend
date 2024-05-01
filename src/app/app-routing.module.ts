import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './component/pages/pages.component';
import { HomeComponent } from './component/home/home.component';
import { ThankyouComponent } from './component/thankyou/thankyou.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AddProductsComponent } from './component/add-products/add-products.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ConfirmpayentComponent } from './component/confirmpayent/confirmpayent.component';
import { ProductdetailsComponent } from './component/productdetails/productdetails.component';
import { PrivecyComponent } from './component/privecy/privecy.component';
import { TermsComponent } from './component/terms/terms.component';
import { BlogComponent } from './component/blog/blog/blog.component';
import { AddBlogComponent } from './component/blog/add-blog/add-blog.component';
import { BlogDetailsComponent } from './component/blog/blog-details/blog-details.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminComponent } from './component/admin/admin.component';
import { CartComponent } from './component/cart/cart.component';

const routes: Routes = [
  {path: 'products', component: PagesComponent},
  {path: '', component: HomeComponent},
  {path: 'thankyou', component: ThankyouComponent},
  {path: 'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard] },
  {path:'addproduct',component:AddProductsComponent, canActivate: [AdminGuard]},
  {path:'details',component:ProductDetailsComponent},
  {path:'confirm-payment',component:ConfirmpayentComponent,canActivate: [AuthGuard]},
  {path: 'shop',component:LoginComponent},
  {path: 'privacy',component:PrivecyComponent},
  {path: 'terms',component:TermsComponent},
  {path:'purchase-details',component:ProductdetailsComponent,canActivate: [AuthGuard]},
  {path:'blogs',component:BlogComponent},
  {path:'add-blogs',component:AddBlogComponent,canActivate:[AdminGuard]},
  {path:'blog/:id',component:BlogDetailsComponent},
  {path:'admin',component:AdminComponent,canActivate:[AdminGuard]},
  {path:'cart',component:CartComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

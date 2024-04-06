import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authguardService: AuthGuardService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authguardService.isLoggedIn() && this.authguardService.isAdmin()) {
      return true; // Allow access for admin users
    } else {
      this.router.navigate(['/login']); // Redirect unauthorized users
      return false;
    }
  }
}

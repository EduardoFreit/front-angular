import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userJson = localStorage.getItem('user');

    if (!userJson) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const user = JSON.parse(userJson);
      const userRoles = user.roles || [];
      const requiredRoles = route.data['roles'] as string[] | undefined;

      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }

      const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));

      if (!hasRequiredRole) {
        this.router.navigate(['/dashboard']);
        return false;
      }

      return true;
    } catch (e) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

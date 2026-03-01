import { Injectable } from '@angular/core';
import { NAV_ITEMS, NavItem } from '../config/nav-config';

@Injectable({ providedIn: 'root' })
export class NavService {
  getNavItemsByRole(roles: string[]): NavItem[] {
    return NAV_ITEMS.filter((item) => item.roles.some((role) => roles.includes(role)));
  }

  getUserRoles(): string[] {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        return user.roles || [];
      } catch (e) {
        return [];
      }
    }
    return [];
  }
}

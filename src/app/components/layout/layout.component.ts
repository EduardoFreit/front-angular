import { Component, inject, signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { NavService } from '../../services/nav.service';
import { CommonModule } from '@angular/common';
import { NavItem } from '../../config/nav-config';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  sidenavOpen = signal(false);
  navItems = signal<NavItem[]>([]);

  constructor(private navService: NavService) {
    this.navItems.set(this.navService.getNavItemsByRole(this.navService.getUserRoles()));
  }

  toggleSidenav(): void {
    this.sidenavOpen.update((value) => !value);
  }
}

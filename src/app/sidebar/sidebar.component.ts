import { Component } from '@angular/core';
import { SidebarItem } from './sidebar-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly items: SidebarItem[] = [
    {
      id: 1,
      label: 'Home',
      icon: 'home',
      isActive: true
    },
    {
      id: 2,
      label: 'Profiles',
      icon: 'badge'
    },
    {
      id: 3,
      label: 'Third',
      icon: 'description'
    }
  ];
}

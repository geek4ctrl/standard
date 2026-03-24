import { Component } from '@angular/core';
import { SidebarItem } from './sidebar-item.model';
import { SIDEBAR_ITEMS } from './sidebar-items.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly items: SidebarItem[] = SIDEBAR_ITEMS;
}

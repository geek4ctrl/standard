import { Component, signal } from '@angular/core';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { NavigationBarComponent } from './core/layout/navigation-bar/navigation-bar.component';
import { HomeComponent } from './features/home/home.component';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, NavigationBarComponent, HomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('standard');
}

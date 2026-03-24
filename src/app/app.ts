import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { NavigationBarComponent } from './core/layout/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, NavigationBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('standard');
}

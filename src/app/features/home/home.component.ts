import { Component, OnInit, inject, signal } from '@angular/core';
import { BusinessAccount, HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly homeService = inject(HomeService);
  readonly rows = signal<BusinessAccount[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadBusinessAccounts();
  }

  private loadBusinessAccounts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.homeService
      .getBusinessAccounts()
      .subscribe({
        next: (data: BusinessAccount[]) => {
          this.rows.set(data ?? []);
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Unable to load business accounts.');
          this.isLoading.set(false);
        }
      });
  }
}

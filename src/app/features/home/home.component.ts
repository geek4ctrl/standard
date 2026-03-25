import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { BusinessAccount, HomeService } from '../../services/home.service';
import { MAINTENANCE_STATUS, STATUS } from './home.constants';
import { TableSearchData } from './home.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly homeService = inject(HomeService);
  readonly statusLabels = STATUS;
  readonly maintenanceLabels = MAINTENANCE_STATUS;
  rows = signal<BusinessAccount[]>([]);
  search = signal('');
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);
  filteredRows = computed(() => {
    const query = this.search().trim().toLowerCase();

    if (!query) return this.rows();

    return this.rows().filter((account) => {
      const status = account.isActive
        ? STATUS.active.toLowerCase()
        : STATUS.inactive.toLowerCase();
      const maintenance = account.MaintenanceMessageEnabled
        ? MAINTENANCE_STATUS.enabled.toLowerCase()
        : MAINTENANCE_STATUS.disabled.toLowerCase();

      const tableData: TableSearchData = {
        text: [
          account.Name,
          account.PhoneNumberId,
          account.WhatsAppNumber,
          status,
          maintenance,
        ]
          .join(' ')
          .toLowerCase(),
      };

      return tableData.text.includes(query);
    });
  });

  ngOnInit(): void {
    this.loadBusinessAccounts();
  }

  private loadBusinessAccounts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.homeService.getBusinessAccounts().subscribe({
      next: (data: BusinessAccount[]) => {
        this.rows.set(data ?? []);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load business accounts.');
        this.isLoading.set(false);
      },
    });
  }

  updateSearch(value: string): void {
    this.search.set(value);
  }
}

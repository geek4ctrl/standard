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
  pageSize = signal(10);
  pageIndex = signal(0);
  totalCount = computed(() => this.rows().length);
  visibleCount = computed(() => this.filteredRows().length);
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

  pagedRows = computed(() => {
    const size = this.pageSize();
    const start = this.pageIndex() * size;
    return this.filteredRows().slice(start, start + size);
  });

  range = computed(() => {
    const visible = this.visibleCount();

    if (!visible) {
      return '0';
    }

    const size = this.pageSize();
    const start = this.pageIndex() * size + 1;
    const end = Math.min(start + size - 1, visible);
    return `${start}-${end}`;
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
        this.pageIndex.set(0);
      },
      error: () => {
        this.errorMessage.set('Unable to load business accounts.');
        this.isLoading.set(false);
      },
    });
  }

  updateSearch(value: string): void {
    this.search.set(value);
    this.pageIndex.set(0);
  }

  previousPage(): void {
    this.pageIndex.update((index) => Math.max(0, index - 1));
  }

  nextPage(): void {
    const size = this.pageSize();
    const total = this.filteredRows().length;
    const maxIndex = Math.max(0, Math.ceil(total / size) - 1);
    this.pageIndex.update((index) => Math.min(maxIndex, index + 1));
  }
}

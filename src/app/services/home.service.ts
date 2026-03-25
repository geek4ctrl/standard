import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

export interface BusinessAccount {
  Id: string;
  Name: string;
  PhoneNumberId: string;
  WhatsAppNumber: string;
  MaintenanceMessageEnabled: boolean;
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/business-accounts`;

  getBusinessAccounts() {
    return this.http.get<BusinessAccount[]>(this.apiUrl);
  }
}

import { Component, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../core/models/customer';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';

@Component({
    selector: 'app-customer-list',
    imports: [NgxPaginationModule, CommonModule, FormsModule],
    templateUrl: './customer-list.component.html',
    styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  customers: Signal<Customer[]>;
  name = '';
  mobile = '';
  birthday = '';

  config: PaginationInstance = {
    id: 'customer',
    itemsPerPage: 10,
    currentPage: 1,
  };

  constructor(private customerService: CustomerService) {
    this.customers = toSignal(this.customerService.getCustomers(), {
      initialValue: [],
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { Customer } from '../../core/models/customer';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-customer-list',
  imports: [NgxPaginationModule, CommonModule, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
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

  query() {
    if (this.name) {
      this.customers = computed(() =>
        this.customers().filter((customer) =>
          customer.name.includes(this.name),
        ),
      );
    }

    if (this.mobile) {
      this.customers = computed(() =>
        this.customers().filter((customer) =>
          customer.mobile.includes(this.mobile),
        ),
      );
    }

    if (this.birthday) {
      this.customers = computed(() =>
        this.customers().filter((customer) =>
          customer.birthday.includes(this.birthday),
        ),
      );
    }
  }
}

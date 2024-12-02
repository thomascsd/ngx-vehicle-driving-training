import { Component, Signal } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../core/models/customer';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [NgxPaginationModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent {
  customers: Signal<Customer[]>;

  constructor(private customerService: CustomerService) {
    this.customers = toSignal(this.customerService.getCustomers(), {
      initialValue: [],
    });
  }
}

import { Component } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Customer } from '../../core/models/customer';
import { ToForm } from '../../core/util';

@Component({
  selector: 'app-customer-save',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-save.component.html',
  styleUrl: './customer-save.component.scss',
})
export class CustomerComponent {
  group: FormGroup<ToForm<Customer>> = this.fb.group<Customer>({
    name: '',
    mobile: '',
    birthday: '',
  });

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {}

  save() {
    if (this.group.valid) {
      this.customerService
        .saveCustomer({
          name: this.group.value.name || '',
          mobile: this.group.value.mobile || '',
          birthday: this.group.value.birthday || '',
        })
        .subscribe();
    }
  }
}

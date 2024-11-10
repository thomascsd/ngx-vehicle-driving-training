import { Component } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Customer } from '../../core/models/customer';
import { ToForm, utilValidator } from '../../core/util';

@Component({
  selector: 'app-customer-save',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-save.component.html',
  styleUrl: './customer-save.component.scss',
})
export class CustomerComponent {
  group: FormGroup<ToForm<Customer>>;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
  ) {
    this.group = this.fb.group({
      name: new FormControl('', utilValidator(new Customer(), 'name')),
      mobile: new FormControl('', utilValidator(new Customer(), 'mobile')),
      birthday: new FormControl('', utilValidator(new Customer(), 'birthday')),
    });
  }

  /**
   * Saves the customer
   *
   * Only saves if the form is valid
   */
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

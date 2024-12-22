import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';

import { CustomerListComponent } from './customer-list.component';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../core/models/customer';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customerServiceMock: any;

  beforeEach(async () => {
    customerServiceMock = {
      getCustomers: jasmine.createSpy('getCustomers').and.returnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, NgxPaginationModule],
      declarations: [CustomerListComponent],
      providers: [{ provide: CustomerService, useValue: customerServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter customers by name', () => {
    const customers: Customer[] = [
      { id: 1, name: 'John Doe', mobile: '1234567890', birthday: '1990-01-01' },
      {
        id: 2,
        name: 'Jane Smith',
        mobile: '0987654321',
        birthday: '1992-02-02',
      },
    ];
    customerServiceMock.getCustomers.and.returnValue(of(customers));
    component.name = 'John';
    component.query();
    fixture.detectChanges();
    expect(component.customers().length).toBe(1);
    expect(component.customers()[0].name).toBe('John Doe');
  });

  // Add more tests for mobile and birthday filters as needed
});

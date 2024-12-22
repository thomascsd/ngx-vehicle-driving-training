import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { CustomerComponent } from './customer-save.component';
import { CustomerService } from '../../core/services/customer.service';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let customerServiceMock: any;

  beforeEach(async () => {
    customerServiceMock = {
      saveCustomer: jasmine.createSpy('saveCustomer').and.returnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CustomerComponent],
      providers: [{ provide: CustomerService, useValue: customerServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveCustomer when form is valid', () => {
    component.group.setValue({
      name: 'John Doe',
      mobile: '1234567890',
      birthday: '1990-01-01',
    });

    component.save();

    expect(customerServiceMock.saveCustomer).toHaveBeenCalledWith({
      name: 'John Doe',
      mobile: '1234567890',
      birthday: '1990-01-01',
    });
  });

  it('should not call saveCustomer when form is invalid', () => {
    component.group.setValue({
      name: '',
      mobile: '',
      birthday: '',
    });

    component.save();

    expect(customerServiceMock.saveCustomer).not.toHaveBeenCalled();
  });
});

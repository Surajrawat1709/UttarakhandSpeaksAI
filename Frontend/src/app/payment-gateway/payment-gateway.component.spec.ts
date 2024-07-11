import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewayComponent } from './payment-gateway.component';

describe('PaymentGatewayComponent', () => {
  let component: PaymentGatewayComponent;
  let fixture: ComponentFixture<PaymentGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentGatewayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

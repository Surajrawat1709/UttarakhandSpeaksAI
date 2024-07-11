import { Component, HostListener } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentServiceService } from '../payment-service.service';
declare var Razorpay: any;
@Component({
  selector: 'app-payment-gateway',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    RouterModule,
    HttpClientModule,
    FormsModule,],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.scss'
})
export class PaymentGatewayComponent {
  title = 'demo';

  form: any = {};
  constructor(
    private http: HttpClient,
    private orderService: PaymentServiceService
  ) {}

  ngOnInit() {}

  sayHello() {
    alert('Hello DK');
  }

  paymentId: string | undefined;
  error: string | undefined;

  options = {
    key: '',
    amount: '',
    name: 'Chat AI',
    description: 'Web Development',
    image:
      'https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png',
    order_id: '',
    handler: function (response: any) {
      var event = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#3399cc',
    },
  };

  onSubmit(): void {
    this.paymentId = '';
    this.error = '';
    this.orderService.createOrder(this.form).subscribe(
      (data) => {
        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = 'Coding World';
        this.options.prefill.email = 'codingworld@gmail.com';
        this.options.prefill.contact = '999999999';

        if (data.pgName === 'razor2') {
          this.options.image = '';
          var rzp1 = new Razorpay(this.options);
          rzp1.open();
        } else {
          var rzp2 = new Razorpay(this.options);
          rzp2.open();
        }

        rzp1.on(
          'payment.failed',
          (response: {
            error: {
              code: any;
              description: any;
              source: any;
              step: any;
              reason: any;
              metadata: { order_id: any; payment_id: any };
            };
          }) => {
            // Todo - store this information in the server
            console.log(response);
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
            this.error = response.error.reason;
          }
        );
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: { detail: any }): void {
    console.log(event.detail);
  }
}


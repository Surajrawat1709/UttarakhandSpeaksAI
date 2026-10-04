import React, { useState } from 'react';
import Header from '../components/Header';
import { paymentApi } from '../services/api';

declare let Razorpay: any;

interface PaymentForm {
  name: string;
  email: string;
  phone: string;
  amount: string;
}

const PaymentPage: React.FC = () => {
  const [form, setForm] = useState<PaymentForm>({
    name: '',
    email: '',
    phone: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [error, setError] = useState('');

  const handleChange = (field: keyof PaymentForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentId('');
    setError('');
    setLoading(true);

    try {
      const { data } = await paymentApi.createOrder(form);

      const options = {
        key: data.secretId,
        amount: data.applicationFee,
        name: 'Chat AI',
        description: 'UttarakhandSpeaks AI Premium',
        order_id: data.razorpayOrderId,
        handler: (response: { razorpay_payment_id: string }) => {
          setPaymentId(response.razorpay_payment_id);
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: '#8b5cf6' },
      };

      const rzp = new Razorpay(options);
      rzp.on('payment.failed', (response: { error: { reason: string } }) => {
        setError(response.error.reason);
      });
      rzp.open();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Payment initiation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="page-container px-4 py-10 flex items-center justify-center">
        <div className="w-full max-w-md animate-fade-in">
          <div className="glass-card p-8 shadow-2xl shadow-accent-900/20">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-accent-500/30">
                💳
              </div>
              <h1 className="text-2xl font-bold gradient-text">Payment</h1>
              <p className="text-white/50 text-sm mt-1">Upgrade your ChatAI experience</p>
            </div>

            {paymentId && (
              <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                ✅ Payment successful! ID: <span className="font-mono">{paymentId}</span>
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                ❌ {error}
              </div>
            )}

            <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="pay-name" className="label">Full Name</label>
                <input
                  id="pay-name"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="John Doe"
                  required
                  minLength={3}
                  maxLength={20}
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="pay-email" className="label">Email</label>
                <input
                  id="pay-email"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="name@example.com"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="pay-phone" className="label">Phone</label>
                <input
                  id="pay-phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  placeholder="10-digit mobile number"
                  required
                  minLength={10}
                  maxLength={10}
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="pay-amount" className="label">Amount (₹)</label>
                <input
                  id="pay-amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange('amount')}
                  placeholder="Enter amount"
                  required
                  min={1}
                  className="input-field"
                />
              </div>
              <button
                id="pay-submit"
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-2"
              >
                {loading ? 'Processing…' : '💳 Pay Now'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;

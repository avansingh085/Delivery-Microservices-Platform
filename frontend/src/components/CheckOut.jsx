import React, { useState } from 'react';
import apiClient from '../api/apiClient';
import { Error, Success } from '../utils/toast';
import { createOrder } from '../api/orderApi';

const Checkout = ({ amount, cartItems }) => {
  const [paymentMethod, setPaymentMethod] = useState('online'); 
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOnlinePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert('Razorpay SDK failed to load. Check your connection.');
      return;
    }

    try {
     
      const res = await apiClient.post('/payments/checkout',
       { amount, paymentMethod: 'ONLINE', items: cartItems },
      );
      const data = res.data;
      const orderData = data.order; 

      const options = {
        key: 'rzp_test_SImjKLecBguwt4',
        amount: orderData.amount,
        currency: orderData?.currency||"INR",
        name: 'Delivery System',
        description: 'item buy',
        order_id: orderData.id,
        handler: async function (response) {
           await apiClient.post('/payments/verify',{...response,cartItems});
          console.log("Payment Successful!", response);
          Success(`Online Payment Successful! Payment ID: ${response.razorpay_payment_id}`)
        
        },
        theme: { color: '#3399cc' },
      };
      
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {

        Error(`Payment failed: ${response.error.description}`)
       
      });
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Error initiating online payment.");
    }
  };

  const handleCODPayment = async () => {
    try {
    
      /*
      const res = await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, paymentMethod: 'COD', items: cartItems }),
      });
      const data = await res.json();
      if (data.success) {
        alert('COD Order Placed Successfully!');
      }
      */
      console.log("COD Order placed for amount:", amount);
      alert('Order Placed Successfully via Cash on Delivery!');
    } catch (error) {
      console.error(error);
      alert("Error placing COD order.");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (paymentMethod === 'online') {
      await handleOnlinePayment();
    } else {
      await handleCODPayment();
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px', maxWidth: '400px' }}>
      <h3>Checkout</h3>
      <h2 style={{ marginBottom: '20px' }}>Total: ₹{amount}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <label style={{ cursor: 'pointer' }}>
          <input
            type="radio"
            value="online"
            checked={paymentMethod === 'online'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          Pay Online (Cards, UPI, NetBanking)
        </label>
        
        <label style={{ cursor: 'pointer' }}>
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          Cash / Pay on Delivery (COD)
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: loading ? '#999' : '#3399cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          fontSize: '16px'
        }}
      >
        {loading ? 'Processing...' : paymentMethod === 'online' ? `Pay ₹${amount} Now` : 'Place COD Order'}
      </button>
    </div>
  );
};

export default Checkout;
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { clearCart, cart } = useCart();
    const container = useRef(null);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.checkout-title', { y: -30, opacity: 0, duration: 1, ease: "power3.out" });
            gsap.from('.form-group', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.3
            });
        }, container);
        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        // Basic Validation
        const isEmpty = Object.values(formData).some(val => val.trim() === '');
        if (isEmpty) {
            alert("Please fill in all fields.");
            return;
        }

        const res = await loadRazorpay();
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        // Calculate Total Amount
        const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        // Razorpay Options
        const options = {
            key: "YOUR_RAZORPAY_KEY_ID", // Enter the Key ID generated from the Dashboard
            amount: totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Bawk Store",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            handler: async function (response) {
                // Payment Success
                const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

                const newOrder = {
                    id: orderId,
                    customer_name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode,
                    total_amount: totalAmount,
                    payment_method: 'Online Payment (Razorpay)',
                    payment_id: response.razorpay_payment_id,
                    status: 'Paid',
                    items: cart // Saving cart snapshot
                };

                try {
                    const { error } = await supabase
                        .from('orders')
                        .insert([newOrder]);

                    if (error) {
                        console.error("Error saving order:", error);
                        alert("Payment successful but failed to save order. Please contact support.");
                        return;
                    }

                    // Clear Cart and Navigate
                    clearCart();
                    navigate('/order-confirmation', {
                        state: {
                            orderId,
                            ...formData,
                            paymentMethod: 'Online Payment (Razorpay)',
                            paymentStatus: 'Paid',
                            paymentId: response.razorpay_payment_id
                        }
                    });

                } catch (err) {
                    console.error("Unexpected error saving order:", err);
                    alert("An error occurred while placing your order.");
                }
            },
            prefill: {
                name: formData.fullName,
                email: formData.email,
                contact: formData.phone
            },
            notes: {
                address: formData.address
            },
            theme: {
                color: "#00f0ff" // Matches var(--accent-primary)
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid var(--glass-border)',
        background: 'rgba(255,255,255,0.05)',
        color: '#fff',
        fontSize: '1rem',
        outline: 'none',
        marginTop: '5px'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    };

    return (
        <section ref={container} style={{
            minHeight: '100vh',
            padding: '120px 20px',
            background: 'var(--bg-color)',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h1 className="checkout-title" style={{
                    fontSize: '2.5rem',
                    marginBottom: '40px',
                    textAlign: 'center',
                    textTransform: 'uppercase'
                }}>Checkout Details</h1>

                <form onSubmit={handlePayment} className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div className="form-group">
                        <label style={labelStyle}>Full Name</label>
                        <input name="fullName" type="text" style={inputStyle} value={formData.fullName} onChange={handleChange} required />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label style={labelStyle}>Email</label>
                            <input name="email" type="email" style={inputStyle} value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label style={labelStyle}>Phone</label>
                            <input name="phone" type="tel" style={inputStyle} value={formData.phone} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label style={labelStyle}>Address</label>
                        <input name="address" type="text" style={inputStyle} value={formData.address} onChange={handleChange} required />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                        <div className="form-group">
                            <label style={labelStyle}>City</label>
                            <input name="city" type="text" style={inputStyle} value={formData.city} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label style={labelStyle}>State</label>
                            <input name="state" type="text" style={inputStyle} value={formData.state} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label style={labelStyle}>Pincode</label>
                            <input name="pincode" type="text" style={inputStyle} value={formData.pincode} onChange={handleChange} required />
                        </div>
                    </div>

                    <button type="submit" style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: 'var(--accent-primary)',
                        color: '#000',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textTransform: 'uppercase'
                    }}>
                        Pay & Place Order
                    </button>

                </form>
            </div>
        </section>
    );
};

export default CheckoutPage;

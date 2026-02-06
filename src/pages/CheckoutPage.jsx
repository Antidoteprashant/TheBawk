import React, { useRef, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { clearCart, cart } = useCart();
    const container = useRef(null);

    // Form State
    const [paymentMethod, setPaymentMethod] = useState('cod');
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic Validation
        const isEmpty = Object.values(formData).some(val => val.trim() === '');
        if (isEmpty) {
            alert("Please fill in all fields.");
            return;
        }

        // Generate Mock Order ID
        const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

        // Clear Cart and Navigate
        clearCart();
        navigate('/order-confirmation', {
            state: {
                orderId,
                ...formData,
                paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment',
                paymentStatus: 'Pending'
            }
        });
    };

    if (cart.length === 0) {
        // Redirect if empty (optional, but good UX)
        // navigate('/cart');
        // For now, render "Cart is empty" message or let them back
    }

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

                <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div className="form-group">
                        <label style={labelStyle}>Full Name</label>
                        <input name="fullName" type="text" style={inputStyle} value={formData.fullName} onChange={handleChange} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label style={labelStyle}>Email</label>
                            <input name="email" type="email" style={inputStyle} value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label style={labelStyle}>Phone</label>
                            <input name="phone" type="tel" style={inputStyle} value={formData.phone} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label style={labelStyle}>Address</label>
                        <input name="address" type="text" style={inputStyle} value={formData.address} onChange={handleChange} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                        <div className="form-group">
                            <label style={labelStyle}>City</label>
                            <input name="city" type="text" style={inputStyle} value={formData.city} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label style={labelStyle}>State</label>
                            <input name="state" type="text" style={inputStyle} value={formData.state} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label style={labelStyle}>Pincode</label>
                            <input name="pincode" type="text" style={inputStyle} value={formData.pincode} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Payment Method Section */}
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <label style={labelStyle}>Payment Method</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
                            <div
                                onClick={() => setPaymentMethod('cod')}
                                style={{
                                    padding: '15px',
                                    border: `1px solid ${paymentMethod === 'cod' ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                                    background: paymentMethod === 'cod' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    border: `5px solid ${paymentMethod === 'cod' ? 'var(--accent-primary)' : 'var(--text-muted)'}`,
                                    background: 'transparent'
                                }}></div>
                                <span style={{ fontWeight: 'bold', color: paymentMethod === 'cod' ? '#fff' : 'var(--text-muted)' }}>Cash on Delivery</span>
                            </div>

                            <div
                                onClick={() => alert("Online payment is coming soon! Please use Cash on Delivery.")}
                                style={{
                                    padding: '15px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    borderRadius: '5px',
                                    cursor: 'not-allowed',
                                    opacity: 0.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                                title="Coming Soon"
                            >
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    border: '2px solid var(--text-muted)',
                                    background: 'transparent'
                                }}></div>
                                <span style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>Online Payment</span>
                            </div>
                        </div>
                        <p style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            * Pay securely at your doorstep with Cash or UPI.
                        </p>
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
                        Place Order
                    </button>

                </form>
            </div>
        </section>
    );
};

export default CheckoutPage;

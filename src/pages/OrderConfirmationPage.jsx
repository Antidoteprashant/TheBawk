import React, { useLayoutEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { gsap } from 'gsap';

const OrderConfirmationPage = () => {
    const location = useLocation();
    const container = useRef(null);
    const orderId = location.state?.orderId || "ORD-UNKNOWN";

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.success-icon', { scale: 0, rotation: -180, duration: 1, ease: "elastic.out(1, 0.5)" });
            gsap.from('.confirm-text', { y: 30, opacity: 0, duration: 0.8, delay: 0.5, stagger: 0.2 });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--bg-color)',
            textAlign: 'center',
            padding: '20px'
        }}>
            <div className="glass-panel" style={{ padding: '60px 40px', maxWidth: '500px', width: '100%' }}>
                <div className="success-icon" style={{
                    fontSize: '5rem',
                    marginBottom: '20px',
                    color: 'var(--accent-primary)'
                }}>
                    ✅
                </div>

                <h1 className="confirm-text" style={{ fontSize: '2rem', marginBottom: '10px' }}>Order Placed!</h1>
                <p className="confirm-text" style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                    Thank you for your purchase. Your order has been confirmed.
                </p>

                <div className="confirm-text" style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '15px',
                    borderRadius: '10px',
                    marginBottom: '40px'
                }}>
                    <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Order ID</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', letterSpacing: '2px' }}>{orderId}</span>
                </div>

                <div className="confirm-text" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '40px',
                    textAlign: 'left'
                }}>
                    <div className="glass-panel" style={{ padding: '15px' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Payment Method</span>
                        <span style={{ fontWeight: 'bold', color: '#fff' }}>{location.state?.paymentMethod || 'Online Payment'}</span>
                        {location.state?.paymentId && (
                            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '5px' }}>ID: {location.state.paymentId}</span>
                        )}
                    </div>
                    <div className="glass-panel" style={{ padding: '15px' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>{location.state?.paymentStatus || 'Paid'}</span>
                    </div>
                </div>

                <div className="confirm-text" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <Link to="/track-order" style={{
                        padding: '15px',
                        background: 'var(--accent-primary)',
                        color: '#000',
                        textAlign: 'center',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                    }}>
                        Track Order
                    </Link>

                    <Link to="/categories" style={{
                        padding: '15px',
                        border: '1px solid var(--glass-border)',
                        color: '#fff',
                        textAlign: 'center',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                    }}>
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default OrderConfirmationPage;

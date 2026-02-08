import React, { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { supabase } from '../supabase';

const TrackOrderPage = () => {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState(null);
    const container = useRef(null);
    const timelineRef = useRef(null);

    const steps = [
        { id: 1, label: 'Ordered', icon: '📝' },
        { id: 2, label: 'Packed', icon: '📦' },
        { id: 3, label: 'Shipped', icon: '🚚' },
        { id: 4, label: 'Out for Delivery', icon: '🛵' },
        { id: 5, label: 'Delivered', icon: '🎉' },
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.track-title', { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
            gsap.from('.track-input', { y: 30, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });
        }, container);
        return () => ctx.revert();
    }, []);

    const handleTrack = async () => {
        if (!orderId.trim()) {
            return;
        }
        setStatus(null); // Reset UI

        try {
            const { data, error } = await supabase.rpc('get_order_status', { p_order_id: orderId });

            if (error) {
                console.error("Error fetching order status:", error);
                alert("Error fetching status. Please try again.");
                return;
            }

            if (!data) {
                alert("Order Not Found. Please check your Order ID.");
                return;
            }

            // Map status text to step index
            const statusMap = {
                'Ordered': 1,
                'Pending': 1,
                'Paid': 1,
                'Packed': 2,
                'Processing': 2,
                'Shipped': 3,
                'Out for Delivery': 4,
                'Delivered': 5
            };

            const stepIndex = statusMap[data] || 1; // Default to step 1
            setStatus(stepIndex);

            // Animate timeline based on the new status
            setTimeout(() => {
                gsap.fromTo('.step',
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: "back.out(1.7)" }
                );

                // Calculate width percentage based on step (20% per step roughly, but fine-tuned)
                // 1 -> 0%, 2 -> 25%, 3 -> 50%, 4 -> 75%, 5 -> 100%
                const percentages = { 1: '0%', 2: '25%', 3: '50%', 4: '75%', 5: '100%' };
                const width = percentages[stepIndex] || '0%';

                gsap.fromTo('.progress-line-fill',
                    { width: '0%' },
                    { width: width, duration: 1.5, delay: 0.5, ease: "power2.inOut" }
                );
            }, 100);

        } catch (err) {
            console.error("Unexpected error:", err);
            alert("An error occurred while tracking your order.");
        }
    };

    return (
        <section ref={container} style={{
            minHeight: '100vh',
            padding: '120px 20px',
            background: 'var(--bg-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h1 className="track-title" style={{
                fontSize: '3rem',
                marginBottom: '40px',
                textTransform: 'uppercase',
                textAlign: 'center'
            }}>Track Your Order</h1>

            <div className="track-input glass-panel" style={{
                padding: '30px',
                display: 'flex',
                gap: '15px',
                maxWidth: '600px',
                width: '100%',
                marginBottom: '60px'
            }}>
                <input
                    type="text"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '15px',
                        borderRadius: '5px',
                        border: '1px solid var(--glass-border)',
                        background: 'rgba(255,255,255,0.05)',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
                <button
                    onClick={handleTrack}
                    style={{
                        padding: '15px 30px',
                        background: 'var(--accent-primary)',
                        color: '#000',
                        border: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textTransform: 'uppercase'
                    }}
                >
                    Track
                </button>
            </div>

            {status && (
                <div ref={timelineRef} style={{ width: '100%', maxWidth: '800px', position: 'relative' }}>
                    {/* Progress Bar Background */}
                    <div style={{ position: 'absolute', top: '25px', left: '0', width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', zIndex: 0 }}></div>

                    {/* Progress Bar Fill */}
                    <div className="progress-line-fill" style={{
                        position: 'absolute',
                        top: '25px',
                        left: '0',
                        width: '0%',
                        height: '4px',
                        background: 'var(--accent-primary)',
                        zIndex: 0,
                        boxShadow: '0 0 10px var(--accent-primary)'
                    }}></div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                        {steps.map((step, index) => {
                            const isActive = step.id <= status;
                            const isCurrent = step.id === status;

                            return (
                                <div key={step.id} className="step" style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px',
                                    opacity: 0 // Initial state for animation
                                }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: isActive ? 'var(--accent-primary)' : '#1a1a1a',
                                        border: `2px solid ${isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)'}`,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '1.5rem',
                                        color: isActive ? '#000' : '#fff',
                                        boxShadow: isActive ? '0 0 20px var(--accent-primary)' : 'none',
                                        transition: 'all 0.3s'
                                    }}>
                                        {step.icon}
                                    </div>
                                    <span style={{
                                        color: isActive ? '#fff' : 'var(--text-muted)',
                                        fontWeight: isCurrent ? 'bold' : 'normal',
                                        textAlign: 'center',
                                        fontSize: '0.9rem'
                                    }}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
};

export default TrackOrderPage;

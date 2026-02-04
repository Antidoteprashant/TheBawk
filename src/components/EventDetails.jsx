import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const EventDetails = () => {
    const container = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            gsap.from('.detail-header', {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.from('.detail-card', {
                scrollTrigger: {
                    trigger: '.cards-container',
                    start: "top 85%",
                },
                y: 100,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out"
            });

        }, container);

        return () => ctx.revert();
    }, []);

    const details = [
        {
            title: "The Arena",
            desc: "An intense digital battlefield where speed meets strategy. Prove you have the quickest hands in the west."
        },
        {
            title: "Who Can Join?",
            desc: "Open to all college students. Solo participation. No prerequisites—just raw reaction time and wit."
        },
        {
            title: "The Format",
            desc: "3 Rounds: Qualifiers, Semi-Finals (Knockout), and the Grand Finale. Only the top 10 survive."
        }
    ];

    return (
        <section id="details" ref={container} className="flex-center" style={{
            minHeight: '100vh',
            padding: '100px 20px',
            flexDirection: 'column',
            position: 'relative',
            background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.02) 50%, transparent)'
        }}>
            <div className="detail-header" style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px', color: 'var(--text-main)' }}>What is <span className="text-gradient">Quick Snatch?</span></h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    It's not just a contest; it's a reflex revolution. We challenge your cognitive speed and motor skills in a series of custom-built digital challenges.
                </p>
            </div>

            <div className="cards-container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px',
                width: '100%',
                maxWidth: '1200px'
            }}>
                {details.map((item, i) => (
                    <div key={i} className="detail-card glass-panel" style={{
                        padding: '40px',
                        textAlign: 'left',
                        transition: 'transform 0.3s ease, border-color 0.3s ease'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--accent-primary)' }}>0{i + 1}. {item.title}</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EventDetails;

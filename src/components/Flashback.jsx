import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Flashback = () => {
    const stripRef = useRef(null);
    const row1Ref = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Continuous Marquee Animation
            // Duplicate content is not needed if the strip is long enough or we reset 
            // For a seamless infinite loop, normally we need double content. 
            // I'll assume for now a simple slow drift is what they want, 
            // or I can do a yoyo/repeat.

            // Let's do a slow infinite scroll to the left
            const width = row1Ref.current.scrollWidth;

            gsap.to(row1Ref.current, {
                xPercent: -50, // Move half way (assuming we doubled content)
                ease: "none",
                duration: 40, // Slow
                repeat: -1
            });

        }, stripRef);

        return () => ctx.revert();
    }, []);

    const memories = [
        { year: "2022", title: "Genesis", color: "#333" },
        { year: "2023", title: "Momentum", color: "#444" },
        { year: "2024", title: "Peak", color: "#555" },
        { year: "2025", title: "Horizon", color: "#666" },
        { year: "Legacy", title: "Forever", color: "#777" }
    ];

    // Double the array for seamless marquee
    const marqueeItems = [...memories, ...memories];

    return (
        <section id="flashback" style={{
            minHeight: '60vh', // Slightly more compact
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '100px 0',
            // background: 'var(--bg-color)' 
        }}>

            <div style={{ paddingLeft: '5vw', marginBottom: '2rem' }}>
                <h2 className="glow-text" style={{ fontSize: '3rem', color: 'var(--text-main)' }}>Archive</h2>
            </div>

            {/* Moving Strip Wrapper */}
            <div ref={stripRef} style={{ width: '100%', overflow: 'hidden' }}>
                <div ref={row1Ref} style={{
                    display: 'flex',
                    gap: '20px',
                    width: 'max-content',
                    paddingLeft: '20px'
                }}>
                    {marqueeItems.map((mem, i) => (
                        <div key={i} className="flash-item glass-panel" style={{
                            width: '350px',
                            height: '250px',
                            flexShrink: 0,
                            position: 'relative',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid var(--glass-border)',
                            background: 'var(--glass-bg)'
                        }}>
                            <h3 style={{ fontSize: '4rem', fontWeight: 900, color: 'rgba(255,255,255,0.05)', position: 'absolute' }}>{mem.year}</h3>
                            <p style={{ zIndex: 1, fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 600 }}>{mem.title}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Flashback;

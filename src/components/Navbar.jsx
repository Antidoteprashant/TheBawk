import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
    const navRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                delay: 0.5
            });
        }, navRef);
        return () => ctx.revert();
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { name: 'Home', id: 'hero' },
        { name: 'Brief', id: 'details' },
        { name: 'Categories', id: 'categories' },
        { name: 'Buy', id: 'register' },
    ];

    return (
        <nav ref={navRef} style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            width: '90%',
            maxWidth: '600px',
            padding: '12px 30px',
            borderRadius: '50px',
            background: 'rgba(10, 10, 10, 0.6)', // Dark semi-transparent
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
            {/* Logo / Brand */}
            <div
                onClick={() => scrollToSection('hero')}
                style={{
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#fff',
                    letterSpacing: '-0.5px'
                }}>
                bawk.
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '20px' }}>
                {navLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => scrollToSection(link.id)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            fontWeight: 500,
                            transition: 'color 0.3s ease, transform 0.2s',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = '#fff';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = 'var(--text-muted)';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        {link.name}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;

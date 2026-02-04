import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Hero = () => {
    const comp = useRef(null);
    const canvasRef = useRef(null);
    const titleRef = useRef(null);

    // Canvas Particle System
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let animationFrame;

        // Mouse State
        const mouse = { x: -1000, y: -1000 };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // Slow float
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 0.5; // Variable size
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
            }

            update() {
                // Mouse Interaction (Repulsion)
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = 200;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < maxDistance) {
                    this.x -= directionX * 5; // Repel strength
                    this.y -= directionY * 5;
                } else {
                    // Return to natural movement
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 50; // Elastic return
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 50;
                    }
                }

                // Natural Float
                this.x += this.vx;
                this.y += this.vy;
                this.baseX += this.vx;
                this.baseY += this.vy;

                // Screen Wrap
                if (this.baseX > width) { this.x = this.baseX = 0; }
                if (this.baseX < 0) { this.x = this.baseX = width; }
                if (this.baseY > height) { this.y = this.baseY = 0; }
                if (this.baseY < 0) { this.y = this.baseY = height; }
            }

            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = (width * height) / 9000; // Density
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Connect particles (optional, maybe too messy for clean look? Let's skip lines for now, focused dots are cleaner)
            // Just draw particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            animationFrame = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    // Text Scramble Effect
    useEffect(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        const targetText = "Quick Snatch";
        const element = titleRef.current;
        let iteration = 0;
        let startScramble = null;

        const scramble = () => {
            startScramble = setInterval(() => {
                element.innerText = targetText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return targetText[index];
                        }
                        return chars[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iteration >= targetText.length) {
                    clearInterval(startScramble);
                }

                iteration += 1 / 3;
            }, 30);
        };

        // Delay start slightly
        setTimeout(scramble, 500);

        return () => clearInterval(startScramble);
    }, []);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Entrance
            gsap.from('.hero-tagline', { opacity: 0, letterSpacing: '10px', duration: 1.5, delay: 1, ease: "power3.out" });
            gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 1, delay: 1.2 });

            // Parallax
            gsap.to('.hero-content', {
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                },
                y: -150,
                opacity: 0
            });

        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <section id="hero" ref={comp} className="full-screen flex-center hero-section" style={{ position: 'relative', overflow: 'hidden' }}>

            {/* Interactive Particle Canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 100%)' // Subtle center glow
                }}
            />

            <div className="hero-content" style={{ zIndex: 5, textAlign: 'center', pointerEvents: 'none' }}> {/* pointer-events none to let mouse pass to canvas */}

                <h1
                    ref={titleRef}
                    style={{
                        fontSize: 'clamp(4rem, 12vw, 9rem)',
                        fontFamily: 'monospace', // Tech vibe
                        marginBottom: '1rem',
                        color: '#fff',
                        textTransform: 'uppercase',
                        letterSpacing: '-5px',
                        mixBlendMode: 'difference'
                    }}
                >
                    Q#%k S@*&h
                </h1>

                <p className="hero-tagline" style={{
                    fontSize: '1.5rem',
                    color: 'var(--accent-secondary)',
                    textTransform: 'uppercase',
                    marginBottom: '2rem',
                    letterSpacing: '5px'
                }}>
                    Speed. Precision. Glory.
                </p>

                <p className="hero-desc" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    The ultimate test of reflexes. Compete in the digital void.
                </p>

                <div className="hero-desc" style={{ marginTop: '4rem' }}>
                    <div style={{
                        width: '30px',
                        height: '50px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderRadius: '20px',
                        margin: '0 auto',
                        position: 'relative'
                    }}>
                        <div style={{
                            width: '4px',
                            height: '8px',
                            background: '#fff',
                            borderRadius: '2px',
                            position: 'absolute',
                            top: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            animation: 'scrollDown 2s infinite'
                        }}></div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scrollDown {
                    0% { top: 10px; opacity: 1; }
                    100% { top: 30px; opacity: 0; }
                }
            `}</style>

        </section>
    );
};

export default Hero;

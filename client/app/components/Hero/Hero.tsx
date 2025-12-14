'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Array<{
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
        }> = [];

        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        function animate() {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                ctx.fillStyle = `rgba(14, 165, 233, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className={styles.hero}>
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }} />

            <div className={styles.orb + ' ' + styles.orb1}></div>
            <div className={styles.orb + ' ' + styles.orb2}></div>
            <div className={styles.orb + ' ' + styles.orb3}></div>

            <div className={styles.background}></div>

            <div className={styles.content}>
                <div style={{ marginBottom: '1rem', opacity: 0, animation: 'fadeUp 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.5rem',
                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(14, 165, 233, 0.2))',
                        border: '1px solid rgba(249, 115, 22, 0.3)',
                        borderRadius: '50px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        backdropFilter: 'blur(10px)'
                    }}>
                        Pre-Launch Access
                    </span>
                </div>

                <h1 className={styles.tagline}>
                    The <span className="text-gradient">Unknown</span> Awaits.
                </h1>
                <p className={styles.subtagline}>
                    The world's first global ecosystem connecting you to
                    <span style={{ color: 'var(--water-light)', fontWeight: '600' }}> Water</span>,
                    <span style={{ color: 'var(--air-sky)', fontWeight: '600' }}> Air</span>, and
                    <span style={{ color: 'var(--land-light)', fontWeight: '600' }}> Land</span> adventures.
                </p>

                <div className={styles.actions}>
                    <a href="#beta-register" className="btn btn-primary" style={{ position: 'relative', overflow: 'hidden' }}>
                        <span style={{ position: 'relative', zIndex: 1 }}>Join the Beta</span>
                        <span style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '0',
                            height: '0',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.3)',
                            transform: 'translate(-50%, -50%)',
                            transition: 'width 0.6s, height 0.6s'
                        }}></span>
                    </a>
                    <a href="#partner-register" className="btn btn-glass">
                        Partner With Us
                    </a>
                </div>

                <div style={{
                    marginTop: '3rem',
                    display: 'flex',
                    gap: '3rem',
                    justifyContent: 'center',
                    opacity: 0,
                    animation: 'fadeUp 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.9s forwards'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent)', marginBottom: '0.25rem' }}>1000+</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Beta Signups</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--water-light)', marginBottom: '0.25rem' }}>50+</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Partners</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--land-light)', marginBottom: '0.25rem' }}>30+</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Countries</div>
                    </div>
                </div>
            </div>

            <div className={styles.elements}></div>

            <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                animation: 'bounce 2s infinite'
            }}>
                <a href="#about" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '2rem', textDecoration: 'none' }}>↓</a>
            </div>
        </section>
    );
};

export default Hero;
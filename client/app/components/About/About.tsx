'use client';

import { useState } from 'react';

const About = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const elements = [
        {
            icon: '🌊',
            title: 'Water',
            color: 'var(--water-light)',
            gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
            description: 'Dive, surf, sail, and explore the blue depths.',
            activities: ['Scuba Diving', 'Surfing', 'Kayaking']
        },
        {
            icon: '🪂',
            title: 'Air',
            color: 'var(--air-sky)',
            gradient: 'linear-gradient(135deg, #38bdf8, #7dd3fc)',
            description: 'Skydiving, paragliding, and conquering gravity.',
            activities: ['Skydiving', 'Paragliding', 'Hot Air Balloon']
        },
        {
            icon: '⛰️',
            title: 'Land',
            color: 'var(--land-light)',
            gradient: 'linear-gradient(135deg, #4ade80, #22c55e)',
            description: 'Trekking, climbing, off-roading, and survival.',
            activities: ['Mountain Climbing', 'Trekking', 'Rock Climbing']
        }
    ];

    return (
        <section id="about" style={{ padding: '8rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '800px',
                background: 'radial-gradient(circle, rgba(14, 165, 233, 0.05), transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{
                        color: 'var(--accent)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        display: 'block',
                        marginBottom: '1rem'
                    }}>
                        About Us
                    </span>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: '800' }}>
                        The <span className="text-gradient">Adventure Triangle</span>
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                        We are building the bridge between thrill-seekers and the world's most extraordinary experiences.
                        Whether you crave the depths of the ocean, the freedom of the skies, or the rugged terrain of the earth,
                        Adventure Triangle is your gateway to the elements.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {elements.map((element, idx) => (
                        <div
                            key={idx}
                            className="glass-card"
                            onMouseEnter={() => setHoveredCard(idx)}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{
                                textAlign: 'center',
                                padding: '3rem 2rem',
                                background: hoveredCard === idx
                                    ? `linear-gradient(135deg, ${element.color}15, transparent)`
                                    : 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.6) 100%)',
                                transform: hoveredCard === idx ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                                transition: 'all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)',
                                borderColor: hoveredCard === idx ? element.color : 'var(--glass-border)',
                                boxShadow: hoveredCard === idx ? `0 20px 60px ${element.color}30` : 'none',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: '-50%',
                                right: '-50%',
                                width: '200px',
                                height: '200px',
                                background: element.gradient,
                                borderRadius: '50%',
                                filter: 'blur(60px)',
                                opacity: hoveredCard === idx ? 0.3 : 0,
                                transition: 'opacity 0.4s ease',
                                pointerEvents: 'none'
                            }}></div>

                            <div style={{
                                fontSize: '4rem',
                                marginBottom: '1.5rem',
                                transform: hoveredCard === idx ? 'scale(1.1) rotateZ(5deg)' : 'scale(1) rotateZ(0deg)',
                                transition: 'transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)',
                                display: 'inline-block'
                            }}>
                                {element.icon}
                            </div>

                            <h3 style={{
                                color: element.color,
                                fontSize: '2rem',
                                marginBottom: '1rem',
                                fontWeight: '800',
                                position: 'relative'
                            }}>
                                {element.title}
                            </h3>

                            <p style={{
                                color: '#94a3b8',
                                marginBottom: '1.5rem',
                                fontSize: '1rem',
                                lineHeight: '1.6'
                            }}>
                                {element.description}
                            </p>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                marginTop: '1.5rem'
                            }}>
                                {element.activities.map((activity, actIdx) => (
                                    <div key={actIdx} style={{
                                        padding: '0.5rem 1rem',
                                        background: `${element.color}10`,
                                        border: `1px solid ${element.color}30`,
                                        borderRadius: '8px',
                                        fontSize: '0.85rem',
                                        color: 'white',
                                        opacity: hoveredCard === idx ? 1 : 0.7,
                                        transform: hoveredCard === idx ? 'translateX(0)' : 'translateX(-10px)',
                                        transition: `all 0.4s ease ${actIdx * 0.1}s`
                                    }}>
                                        {activity}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    textAlign: 'center',
                    marginTop: '4rem',
                    padding: '2rem',
                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(14, 165, 233, 0.1))',
                    borderRadius: '20px',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <p style={{ fontSize: '1.3rem', color: 'white', fontWeight: '600', marginBottom: '1rem' }}>
                        Ready to start your adventure journey?
                    </p>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                        Join thousands of adventurers already part of our ecosystem
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
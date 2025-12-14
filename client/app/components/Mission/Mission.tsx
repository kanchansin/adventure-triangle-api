'use client';

import { useState } from 'react';

const Mission = () => {
    const [activeElement, setActiveElement] = useState('water');

    const elements = {
        water: {
            color: '#0ea5e9',
            gradient: 'from-blue-600 to-cyan-400',
            icon: '🌊',
            title: 'Water Adventures',
            subtitle: 'Dive into the depths',
            missions: [
                'Connect divers with certified instructors worldwide',
                'Provide real-time ocean condition monitoring',
                'Build a community of marine conservation advocates',
                'Enable seamless booking for water sports activities'
            ],
            activities: ['Scuba Diving', 'Surfing', 'Kayaking', 'Snorkeling', 'Sailing', 'Kitesurfing']
        },
        air: {
            color: '#38bdf8',
            gradient: 'from-sky-400 to-blue-300',
            icon: '🪂',
            title: 'Air Adventures',
            subtitle: 'Conquer the skies',
            missions: [
                'Partner with licensed paragliding and skydiving centers',
                'Offer weather-based scheduling and safety alerts',
                'Create a global network of aerial adventure enthusiasts',
                'Facilitate equipment rental and training programs'
            ],
            activities: ['Skydiving', 'Paragliding', 'Hot Air Ballooning', 'Hang Gliding', 'Base Jumping', 'Wingsuit Flying']
        },
        land: {
            color: '#4ade80',
            gradient: 'from-green-500 to-emerald-400',
            icon: '⛰️',
            title: 'Land Adventures',
            subtitle: 'Explore every terrain',
            missions: [
                'Map trekking routes with difficulty ratings and reviews',
                'Connect adventurers with experienced guides',
                'Promote sustainable tourism and trail preservation',
                'Enable gear sharing and expedition planning'
            ],
            activities: ['Mountain Climbing', 'Rock Climbing', 'Trekking', 'Off-Roading', 'Mountain Biking', 'Camping']
        }
    };

    const current = elements[activeElement as keyof typeof elements];

    return (
        <section style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden', background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.5), transparent)' }}>
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '600px',
                background: `radial-gradient(circle, ${current.color}20, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(80px)',
                transition: 'all 0.6s ease',
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        Our Mission
                    </span>
                    <h2 style={{ fontSize: '3rem', margin: '1rem 0', fontWeight: '800' }}>
                        Three Elements. <span className="text-gradient">Infinite Adventures.</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                        We're building the world's first unified platform for adventure seekers across water, air, and land.
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    {Object.entries(elements).map(([key, element]) => (
                        <button
                            key={key}
                            onClick={() => setActiveElement(key)}
                            style={{
                                padding: '1rem 2rem',
                                borderRadius: '50px',
                                border: activeElement === key ? `2px solid ${element.color}` : '2px solid var(--glass-border)',
                                background: activeElement === key ? `${element.color}20` : 'var(--glass-bg)',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backdropFilter: 'blur(10px)',
                                transform: activeElement === key ? 'scale(1.05)' : 'scale(1)',
                                boxShadow: activeElement === key ? `0 0 20px ${element.color}40` : 'none'
                            }}
                        >
                            <span style={{ fontSize: '1.5rem' }}>{element.icon}</span>
                            {element.title.split(' ')[0]}
                        </button>
                    ))}
                </div>

                <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem', background: `linear-gradient(135deg, ${current.color}10, transparent)` }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>{current.icon}</span>
                        <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: '700' }}>{current.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{current.subtitle}</p>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: current.color }}>What We're Building:</h4>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {current.missions.map((mission, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', borderLeft: `3px solid ${current.color}` }}>
                                    <span style={{ color: current.color, fontSize: '1.2rem', fontWeight: 'bold', minWidth: '24px' }}>✓</span>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>{mission}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: current.color }}>Popular Activities:</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                            {current.activities.map((activity, idx) => (
                                <span key={idx} style={{
                                    padding: '0.5rem 1rem',
                                    background: `${current.color}15`,
                                    border: `1px solid ${current.color}40`,
                                    borderRadius: '20px',
                                    fontSize: '0.9rem',
                                    color: 'white',
                                    transition: 'all 0.3s ease',
                                    cursor: 'default'
                                }}>
                                    {activity}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        Join us in revolutionizing how the world experiences adventure.
                    </p>
                    <a href="#beta-register" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                        Start Your Journey
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Mission;
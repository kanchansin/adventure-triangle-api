'use client';

import { useState } from 'react';

const LaunchEvent = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');


        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <section style={{ padding: '6rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.1), transparent 70%)',
                zIndex: -1
            }}></div>

            <div className="container">
                <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    Coming February 15, 2025
                </span>
                <h2 style={{ fontSize: '3rem', margin: '1rem 0' }}>The Global Launch Event</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Be there when we change adventure travel forever. Virtual/Hybrid event.
                </p>

                <form onSubmit={handleRegister} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input-field"
                        style={{ borderRadius: '50px', paddingLeft: '1.5rem' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                        {status === 'loading' ? 'Saving...' : 'RSVP Now'}
                    </button>
                </form>
                {status === 'success' && <p style={{ color: 'var(--land-light)', marginTop: '1rem' }}>You're on the list!</p>}
            </div>
        </section>
    );
};

export default LaunchEvent;

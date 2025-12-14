'use client';

import { useState } from 'react';

const BetaForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        location: '',
        adventureInterests: [] as string[],
        experienceLevel: 'beginner',
        hearAboutUs: 'Social Media'
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const toggleInterest = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            adventureInterests: prev.adventureInterests.includes(interest)
                ? prev.adventureInterests.filter(i => i !== interest)
                : [...prev.adventureInterests, interest]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error?.message || 'Something went wrong');
            }

            setStatus('success');
            setMessage('Welcome to the tribe! Check your email.');
            setFormData({
                fullName: '',
                email: '',
                location: '',
                adventureInterests: [],
                experienceLevel: 'beginner',
                hearAboutUs: 'Social Media'
            });
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message);
        }
    };

    return (
        <section id="beta-register" className="container" style={{ padding: '4rem 1.5rem', maxWidth: '600px' }}>
            <div className="glass-card">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <span className="text-gradient">Join the Beta</span>
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
                        <input
                            type="text"
                            className="input-field"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Indiana Jones"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="indy@adventure.com"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Choose Your Elements</label>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            {['water', 'air', 'land'].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => toggleInterest(type)}
                                    style={{
                                        padding: '0.5rem 1.5rem',
                                        borderRadius: '20px',
                                        border: '1px solid var(--glass-border)',
                                        background: formData.adventureInterests.includes(type) ? 'var(--accent)' : 'transparent',
                                        color: 'white',
                                        cursor: 'pointer',
                                        textTransform: 'capitalize',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Experience</label>
                            <select
                                className="input-field"
                                value={formData.experienceLevel}
                                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Location</label>
                            <input
                                type="text"
                                className="input-field"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="City, Country"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? <div className="spinner"></div> : 'Request Access'}
                    </button>

                    {status === 'success' && (
                        <p style={{ color: 'var(--land-light)', textAlign: 'center' }}>{message}</p>
                    )}
                    {status === 'error' && (
                        <p style={{ color: '#ef4444', textAlign: 'center' }}>{message}</p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default BetaForm;

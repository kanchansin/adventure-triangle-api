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
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const toggleInterest = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            adventureInterests: prev.adventureInterests.includes(interest)
                ? prev.adventureInterests.filter(i => i !== interest)
                : [...prev.adventureInterests, interest]
        }));
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const getFieldError = (field: string) => {
        if (!touched[field]) return '';

        switch (field) {
            case 'fullName':
                return formData.fullName.length < 2 ? 'Name must be at least 2 characters' : '';
            case 'email':
                return !formData.email.includes('@') ? 'Invalid email address' : '';
            case 'location':
                return formData.location.length < 2 ? 'Location is required' : '';
            case 'adventureInterests':
                return formData.adventureInterests.length === 0 ? 'Select at least one interest' : '';
            default:
                return '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        const errors = ['fullName', 'email', 'location', 'adventureInterests']
            .map(field => getFieldError(field))
            .filter(Boolean);

        if (errors.length > 0) {
            setStatus('error');
            setMessage(errors[0]);
            return;
        }

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
                throw new Error(data.error?.message || 'Registration failed');
            }

            setStatus('success');
            setMessage('🎉 Welcome to the tribe! Check your email for next steps.');
            setFormData({
                fullName: '',
                email: '',
                location: '',
                adventureInterests: [],
                experienceLevel: 'beginner',
                hearAboutUs: 'Social Media'
            });
            setTouched({});
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'Something went wrong. Please try again.');
        }
    };

    const interests = [
        { value: 'water', label: 'Water', icon: '🌊', color: '#0ea5e9' },
        { value: 'air', label: 'Air', icon: '🪂', color: '#38bdf8' },
        { value: 'land', label: 'Land', icon: '⛰️', color: '#4ade80' }
    ];

    return (
        <section id="beta-register" style={{ padding: '8rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1), transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ maxWidth: '700px', position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span style={{
                        color: 'var(--accent)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        display: 'block',
                        marginBottom: '1rem'
                    }}>
                        Limited Spots Available
                    </span>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '800' }}>
                        Join the <span className="text-gradient">Beta</span>
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                        Be among the first to experience the future of adventure travel
                    </p>
                </div>

                <div className="glass-card" style={{ padding: '3rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))', border: '2px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.95rem', fontWeight: '600', color: 'white' }}>
                                Full Name *
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                onBlur={() => handleBlur('fullName')}
                                placeholder="Indiana Jones"
                                style={{
                                    borderColor: getFieldError('fullName') ? '#ef4444' : 'var(--glass-border)',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                            {getFieldError('fullName') && (
                                <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                    {getFieldError('fullName')}
                                </p>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.95rem', fontWeight: '600', color: 'white' }}>
                                Email Address *
                            </label>
                            <input
                                type="email"
                                className="input-field"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onBlur={() => handleBlur('email')}
                                placeholder="indy@adventure.com"
                                style={{
                                    borderColor: getFieldError('email') ? '#ef4444' : 'var(--glass-border)',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                            {getFieldError('email') && (
                                <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                    {getFieldError('email')}
                                </p>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.95rem', fontWeight: '600', color: 'white' }}>
                                Choose Your Elements *
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                {interests.map((interest) => (
                                    <button
                                        key={interest.value}
                                        type="button"
                                        onClick={() => toggleInterest(interest.value)}
                                        style={{
                                            padding: '1.25rem',
                                            borderRadius: '16px',
                                            border: formData.adventureInterests.includes(interest.value)
                                                ? `2px solid ${interest.color}`
                                                : '2px solid var(--glass-border)',
                                            background: formData.adventureInterests.includes(interest.value)
                                                ? `${interest.color}20`
                                                : 'rgba(15, 23, 42, 0.5)',
                                            color: 'white',
                                            cursor: 'pointer',
                                            textTransform: 'capitalize',
                                            transition: 'all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            transform: formData.adventureInterests.includes(interest.value) ? 'scale(1.05)' : 'scale(1)',
                                            boxShadow: formData.adventureInterests.includes(interest.value) ? `0 8px 25px ${interest.color}40` : 'none'
                                        }}
                                    >
                                        <span style={{ fontSize: '2rem' }}>{interest.icon}</span>
                                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{interest.label}</span>
                                    </button>
                                ))}
                            </div>
                            {getFieldError('adventureInterests') && (
                                <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                    {getFieldError('adventureInterests')}
                                </p>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.95rem', fontWeight: '600', color: 'white' }}>
                                    Experience Level
                                </label>
                                <select
                                    className="input-field"
                                    value={formData.experienceLevel}
                                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <option value="beginner">🌱 Beginner</option>
                                    <option value="intermediate">🔥 Intermediate</option>
                                    <option value="advanced">⚡ Advanced</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.95rem', fontWeight: '600', color: 'white' }}>
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    className="input-field"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    onBlur={() => handleBlur('location')}
                                    placeholder="City, Country"
                                    style={{
                                        borderColor: getFieldError('location') ? '#ef4444' : 'var(--glass-border)',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                padding: '1.25rem',
                                fontSize: '1rem',
                                fontWeight: '700',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div className="spinner"></div>
                                    <span>Securing Your Spot...</span>
                                </div>
                            ) : (
                                <>
                                    <span style={{ position: 'relative', zIndex: 1 }}>Request Beta Access</span>
                                    <span style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem' }}>→</span>
                                </>
                            )}
                        </button>

                        {status === 'success' && (
                            <div style={{
                                padding: '1.25rem',
                                background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(34, 197, 94, 0.1))',
                                border: '2px solid var(--land-light)',
                                borderRadius: '12px',
                                textAlign: 'center',
                                animation: 'fadeUp 0.5s ease'
                            }}>
                                <p style={{ color: 'var(--land-light)', fontWeight: '600', fontSize: '1rem' }}>{message}</p>
                            </div>
                        )}
                        {status === 'error' && (
                            <div style={{
                                padding: '1.25rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '2px solid #ef4444',
                                borderRadius: '12px',
                                textAlign: 'center',
                                animation: 'fadeUp 0.5s ease'
                            }}>
                                <p style={{ color: '#ef4444', fontWeight: '600', fontSize: '1rem' }}>{message}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        By joining, you agree to our <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms</a> and <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy Policy</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BetaForm;
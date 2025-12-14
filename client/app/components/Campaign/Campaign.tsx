'use client';

import { useState } from 'react';

const Campaign = () => {
    const [currentStory, setCurrentStory] = useState(0);

    const stories = [
        {
            image: '🏄',
            name: 'Sarah Chen',
            location: 'Bali, Indonesia',
            adventure: 'Surfing',
            quote: 'The moment I caught that first wave, I felt truly alive. Adventure Triangle connected me with the perfect instructor.',
            hashtag: '#FeelTheAdventure'
        },
        {
            image: '🪂',
            name: 'Marcus Rodriguez',
            location: 'Interlaken, Switzerland',
            adventure: 'Paragliding',
            quote: 'Flying over the Alps was surreal. This platform made my dream adventure accessible and safe.',
            hashtag: '#FeelTheAdventure'
        },
        {
            image: '⛰️',
            name: 'Priya Sharma',
            location: 'Himalayas, Nepal',
            adventure: 'Trekking',
            quote: 'Standing at base camp, I realized the journey matters more than the destination. Found my guide here.',
            hashtag: '#FeelTheAdventure'
        }
    ];

    const nextStory = () => {
        setCurrentStory((prev) => (prev + 1) % stories.length);
    };

    const prevStory = () => {
        setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
    };

    return (
        <section style={{ padding: '8rem 0', background: 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.8))', position: 'relative', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+)',
                opacity: 0.4,
                zIndex: 0
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, var(--accent), #dc2626)', borderRadius: '50px', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white', letterSpacing: '0.1em' }}>
                            #FeelTheAdventure
                        </span>
                    </div>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '800' }}>
                        Real Stories. <span className="text-gradient">Real Adventures.</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Join thousands of adventurers sharing their journey. Your story could be next.
                    </p>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                    <div className="glass-card" style={{
                        padding: '3rem',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(14, 165, 233, 0.1))',
                        border: '2px solid var(--glass-border)',
                        minHeight: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>
                            {stories[currentStory].image}
                        </div>

                        <blockquote style={{ fontSize: '1.4rem', fontStyle: 'italic', color: 'white', marginBottom: '2rem', lineHeight: '1.6' }}>
                            "{stories[currentStory].quote}"
                        </blockquote>

                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>
                                {stories[currentStory].name}
                            </div>
                            <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                                {stories[currentStory].adventure} • {stories[currentStory].location}
                            </div>
                        </div>

                        <div style={{ fontSize: '1.1rem', color: 'var(--accent)', fontWeight: '700' }}>
                            {stories[currentStory].hashtag}
                        </div>
                    </div>

                    <button
                        onClick={prevStory}
                        style={{
                            position: 'absolute',
                            left: '-60px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: '2px solid var(--glass-border)',
                            background: 'var(--glass-bg)',
                            color: 'white',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        ←
                    </button>

                    <button
                        onClick={nextStory}
                        style={{
                            position: 'absolute',
                            right: '-60px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: '2px solid var(--glass-border)',
                            background: 'var(--glass-bg)',
                            color: 'white',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        →
                    </button>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
                        {stories.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentStory(idx)}
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: currentStory === idx ? 'var(--accent)' : 'var(--glass-border)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Share Your Adventure</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Tag us on social media with #FeelTheAdventure to be featured
                        </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <a href="https://facebook.com/adventuretriangle" target="_blank" rel="noopener noreferrer" className="btn btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            Facebook
                        </a>
                        <a href="https://instagram.com/adventuretriangle" target="_blank" rel="noopener noreferrer" className="btn btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            Instagram
                        </a>
                        <a href="https://linkedin.com/company/adventuretriangle" target="_blank" rel="noopener noreferrer" className="btn btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            LinkedIn
                        </a>
                        <a href="https://tiktok.com/@adventuretriangle" target="_blank" rel="noopener noreferrer" className="btn btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                            TikTok
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Campaign;
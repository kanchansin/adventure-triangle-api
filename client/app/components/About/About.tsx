const About = () => {
    return (
        <section className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
            <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The Adventure Triangle</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    We are building the bridge between thrill-seekers and the world's most extraordinary experiences.
                    Whether you crave the depths of the ocean, the freedom of the skies, or the rugged terrain of the earth,
                    Adventure Triangle is your gateway to the elements.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                    <div>
                        <h3 style={{ color: 'var(--water-light)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Water 🌊</h3>
                        <p style={{ color: '#94a3b8' }}>Dive, surf, sail, and explore the blue depths.</p>
                    </div>
                    <div>
                        <h3 style={{ color: 'var(--air-sky)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Air 🌬️</h3>
                        <p style={{ color: '#94a3b8' }}>Skydiving, paragliding, and conquering gravity.</p>
                    </div>
                    <div>
                        <h3 style={{ color: 'var(--land-light)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Land 🏔️</h3>
                        <p style={{ color: '#94a3b8' }}>Trekking, climbing, off-roading, and survival.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

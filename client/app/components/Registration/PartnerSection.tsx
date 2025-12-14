'use client';

const PartnerSection = () => {
    return (
        <section id="partner-register" style={{ padding: '6rem 1.5rem', background: 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.5))' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Are You an Adventure Provider?</h2>
                <p style={{ maxWidth: '600px', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                    Join the ecosystem. Connect your business with thousands of thrill-seekers looking for their next challenge.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%', maxWidth: '900px', marginBottom: '3rem' }}>
                    <div className="glass-card" style={{ textAlign: 'left' }}>
                        <h3 style={{ color: 'var(--water-light)', marginBottom: '0.5rem' }}>Global Reach</h3>
                        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Get exposed to a worldwide audience of verified adventure enthusiasts.</p>
                    </div>
                    <div className="glass-card" style={{ textAlign: 'left' }}>
                        <h3 style={{ color: 'var(--land-light)', marginBottom: '0.5rem' }}>Smart Booking</h3>
                        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Seamless integration with your existing scheduling and payment systems.</p>
                    </div>
                    <div className="glass-card" style={{ textAlign: 'left' }}>
                        <h3 style={{ color: 'var(--air-sky)', marginBottom: '0.5rem' }}>Verified Reviews</h3>
                        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Build trust with a community-driven rating system designed for safety.</p>
                    </div>
                </div>

                <button
                    onClick={() => alert("Partner Portal launching in Phase 2. Please start by joining the Beta!")}
                    className="btn btn-glass"
                    style={{ padding: '1rem 3rem' }}
                >
                    Apply as Partner
                </button>
            </div>
        </section>
    );
};

export default PartnerSection;

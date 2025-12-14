import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.orb + ' ' + styles.orb1}></div>
            <div className={styles.orb + ' ' + styles.orb2}></div>
            <div className={styles.orb + ' ' + styles.orb3}></div>

            <div className={styles.background}></div>

            <div className={styles.content}>
                <h1 className={styles.tagline}>
                    <span className="text-gradient">Unknown</span> Awaits.
                </h1>
                <p className={styles.subtagline}>
                    The world's first global ecosystem connecting you to
                    <span style={{ color: 'var(--water-light)' }}> Water</span>,
                    <span style={{ color: 'var(--air-sky)' }}> Air</span>, and
                    <span style={{ color: 'var(--land-light)' }}> Land</span> adventures.
                </p>

                <div className={styles.actions}>
                    <a href="#beta-register" className="btn btn-primary">
                        Join the Beta
                    </a>
                    <a href="#partner-register" className="btn btn-glass">
                        Partner With Us
                    </a>
                </div>
            </div>

            <div className={styles.elements}></div>
        </section>
    );
};

export default Hero;

import React, { useEffect, useState } from 'react';

const VasthramalikaPage = () => {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/updates/')
            .then(res => res.json())
            .then(data => {
                setUpdates(data.results || data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch updates", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            {/* Shop History Section */}
            <section style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                    The Legacy of Vasthramalika
                </h1>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', color: 'var(--color-text)' }}>
                    Established in 1990, Vasthramalika has been the epitome of elegance and tradition using the finest fabrics.
                    From humble beginnings to a renowned name in textile fashion, our journey is woven with passion and dedication.
                </p>
            </section>

            {/* Updates Section */}
            <section>
                <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '2rem', borderBottom: '2px solid var(--color-gold)', display: 'inline-block', paddingBottom: '0.5rem' }}>
                    Latest Updates
                </h2>

                {loading ? (
                    <p>Loading updates...</p>
                ) : updates.length === 0 ? (
                    <p>No recent updates.</p>
                ) : (
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {updates.map(update => (
                            <div key={update.id} style={{
                                padding: '2rem',
                                backgroundColor: 'var(--color-royal-cream)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{update.title}</h3>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                        {new Date(update.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                {update.image && (
                                    <img
                                        src={update.image}
                                        alt={update.title}
                                        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '4px' }}
                                    />
                                )}
                                <p style={{ whiteSpace: 'pre-wrap' }}>{update.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default VasthramalikaPage;

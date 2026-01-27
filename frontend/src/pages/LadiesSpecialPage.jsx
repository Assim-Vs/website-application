import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const LadiesSpecialPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/products/?is_ladies_special=True')
            .then(res => res.json())
            .then(data => {
                setProducts(data.results || data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch ladies special products", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{ backgroundColor: 'var(--color-ever-brown)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <h2>Loading Royal Selection...</h2>
    </div>;

    return (
        <div style={{ backgroundColor: 'var(--color-ever-brown)', minHeight: '100vh', padding: '5rem 0' }}>
            <div className="container">
                <header style={{
                    textAlign: 'center',
                    marginBottom: '5rem',
                    animation: 'fadeIn 1s ease-in'
                }}>
                    <span style={{
                        color: 'var(--color-gold)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.4em',
                        fontSize: '0.9rem',
                        display: 'block',
                        marginBottom: '1rem'
                    }}>Curated Heritage</span>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '3.5rem',
                        color: 'white',
                        margin: 0
                    }}>
                        Ladies Special Selection
                    </h1>
                    <div style={{
                        width: '80px',
                        height: '2px',
                        backgroundColor: 'var(--color-gold)',
                        margin: '2rem auto'
                    }} />
                    <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', fontWeight: 300 }}>
                        Discover our most exclusive traditional designs, handpicked for their unique elegance and royal craftsmanship.
                    </p>
                </header>

                {products.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem', color: 'white' }}>
                        <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>Our special collection is currently being refreshed. Please check back soon.</p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '3rem',
                        animation: 'fadeInUp 1s ease-out'
                    }}>
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LadiesSpecialPage;

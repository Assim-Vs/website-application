import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const AllProductsPage = () => {
    const [categorizedProducts, setCategorizedProducts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all categories and products
        const fetchAll = async () => {
            try {
                // Get root categories
                const catRes = await fetch('/api/categories/?parent__isnull=True');
                const roots = await catRes.json();

                const results = {};

                // For each root, fetch products (the API handles recursive category filtering)
                for (const root of roots) {
                    const prodRes = await fetch(`/api/products/?category__slug=${root.slug}`);
                    const prods = await prodRes.json();
                    if (prods.length > 0) {
                        results[root.name] = prods;
                    }
                }

                setCategorizedProducts(results);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch categorized products", err);
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    if (loading) return <div className="container" style={{ padding: '4rem 1rem' }}>Loading Catalog...</div>;

    return (
        <div style={{ backgroundColor: 'var(--color-royal-cream)', minHeight: '100vh', padding: '4rem 0' }}>
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
                    }}>Vasthramalika Catalog</span>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '3.5rem',
                        color: '#5D1010',
                        margin: 0
                    }}>
                        Our Complete Collection
                    </h1>
                    <div style={{
                        width: '80px',
                        height: '2px',
                        backgroundColor: 'var(--color-gold)',
                        margin: '2rem auto'
                    }} />
                </header>

                {Object.keys(categorizedProducts).length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem', color: '#5D1010' }}>
                        <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>No products found in our records.</p>
                    </div>
                ) : (
                    Object.entries(categorizedProducts).map(([categoryName, products], index) => (
                        <section key={categoryName} style={{
                            marginBottom: '6rem',
                            animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                                marginBottom: '3rem'
                            }}>
                                <h2 style={{
                                    margin: 0,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: '#5D1010',
                                    fontSize: '1.8rem',
                                    fontWeight: 600
                                }}>{categoryName}</h2>
                                <div style={{
                                    height: '1px',
                                    flex: 1,
                                    backgroundColor: 'rgba(93, 16, 16, 0.1)'
                                }} />
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '3rem'
                            }}>
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllProductsPage;

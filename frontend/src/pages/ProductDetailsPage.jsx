import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/products/${id}/`)
            .then(res => {
                if (!res.ok) throw new Error('Product not found');
                return res.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const addToCart = () => {
        // Implement simple cart logic here for now
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
        alert('Added to cart!');
    };

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;
    if (!product) return <div className="container" style={{ padding: '2rem' }}>Product not found</div>;

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem'
            }}>
                {/* Image Section */}
                <div>
                    <div style={{
                        width: '100%',
                        aspectRatio: '3/4',
                        backgroundImage: `url(${product.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: 'var(--color-stone-dark)',
                        borderRadius: '8px',
                        boxShadow: 'var(--shadow-md)'
                    }} />

                    {/* Video Player if available */}
                    {product.video_url && (
                        <div style={{ marginTop: '2rem' }}>
                            <h3 style={{ fontFamily: 'var(--font-heading)' }}>Product Video</h3>
                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                                {/* Naive embed - assumes Youtube or direct link. 
                                   For production, parse URL to get ID for YouTube 
                               */}
                                <iframe
                                    src={product.video_url.replace('watch?v=', 'embed/')}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    frameBorder="0"
                                    allowFullScreen
                                    title={product.name}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2.5rem',
                        marginBottom: '0.5rem'
                    }}>{product.name}</h1>

                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--color-text-light)',
                        marginBottom: '2rem'
                    }}>
                        {product.serial_number} | {product.category_name}
                    </p>

                    <p style={{
                        fontSize: '2rem',
                        color: 'var(--color-gold)',
                        fontWeight: 700,
                        marginBottom: '2rem'
                    }}>
                        ₹{product.price}
                    </p>

                    <div style={{ marginBottom: '2rem', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                        {product.description}
                    </div>

                    <button
                        onClick={addToCart}
                        className="btn-primary"
                        style={{
                            fontSize: '1.2rem',
                            padding: '1rem 3rem',
                            width: '100%'
                        }}
                    >
                        Add to Cart
                    </button>

                    <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                        * Shipping calculated at checkout.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;

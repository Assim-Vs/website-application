import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} style={{
            display: 'block',
            backgroundColor: 'var(--color-royal-cream)',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            textDecoration: 'none',
            color: 'inherit'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
        >
            <div style={{
                aspectRatio: '3/4',
                backgroundColor: 'var(--color-stone-dark)',
                backgroundImage: `url(${product.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }} />
            <div style={{ padding: '1rem' }}>
                <h3 style={{
                    fontSize: '1.1rem',
                    margin: '0 0 0.5rem 0',
                    fontWeight: 600
                }}>
                    {product.name}
                </h3>
                <p style={{
                    color: 'var(--color-gold)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    margin: 0
                }}>
                    ₹{product.price}
                </p>
                <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-text-light)',
                    marginTop: '0.25rem'
                }}>
                    {product.category_name}
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;

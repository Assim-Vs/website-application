import React from 'react';
import { Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'var(--color-charcoal)',
            color: 'var(--color-stone)',
            padding: '4rem 0 2rem',
            marginTop: 'auto'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem',
                    textAlign: 'left'
                }}>
                    {/* Brand Info */}
                    <div>
                        <h2 style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-heading)', margin: '0 0 1rem 0' }}>
                            VASTHRAMALIKA
                        </h2>
                        <p style={{ opacity: 0.8, lineHeight: '1.6' }}>
                            Royal elegance in every thread. Discover the finest collection of ethnic and royal wear.
                        </p>
                    </div>

                    {/* Quick Menu */}
                    <div>
                        <h4 style={{ color: 'var(--color-gold)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shop</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.8 }}>
                            <a href="/category/mens">Men</a>
                            <a href="/category/ladies">Ladies</a>
                            <a href="/category/kids">Kids</a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ color: 'var(--color-gold)', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.8 }}>
                            <a href="https://wa.me/916238707302" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Phone size={18} /> +91 62387 07302
                            </a>
                            <a href="mailto:oders.vasthramalika@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={18} /> oders.vasthramalika@gmail.com
                            </a>
                            <a href="https://www.instagram.com/no_u_sha__?utm_source=qr&igsh=a2x4ZWE2ZWd5aDFx" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Instagram size={20} /> @no_u_sha__
                            </a>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', opacity: 0.6, margin: 0 }}>
                        &copy; {new Date().getFullYear()} Vasthramalika. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await fetch('/api/accounts/password-reset/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
            } else {
                setError(data.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--color-royal-ivory)', minHeight: '100vh', padding: '5rem 0' }}>
            <div className="container" style={{ maxWidth: '450px' }}>
                <div style={{
                    backgroundColor: 'var(--color-royal-cream)',
                    padding: '3rem',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    animation: 'fadeInUp 0.8s ease-out'
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        fontFamily: 'var(--font-heading)',
                        marginBottom: '1rem',
                        fontSize: '2rem',
                        color: 'var(--color-royal-maroon)'
                    }}>Reset Password</h1>
                    <p style={{ textAlign: 'center', color: '#666', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
                        Enter your email address and we'll send you a secure link to reset your password.
                    </p>

                    {message && (
                        <div style={{
                            backgroundColor: '#f6ffed',
                            border: '1px solid #b7eb8f',
                            padding: '1rem',
                            borderRadius: '6px',
                            color: '#52c41a',
                            fontSize: '0.9rem',
                            marginBottom: '1.5rem',
                            textAlign: 'center'
                        }}>
                            {message}
                        </div>
                    )}

                    {error && (
                        <div style={{
                            backgroundColor: '#fff1f0',
                            border: '1px solid #ffa39e',
                            padding: '1rem',
                            borderRadius: '6px',
                            color: '#f5222d',
                            fontSize: '0.9rem',
                            marginBottom: '1.5rem',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.6rem', fontWeight: 600 }}>Email Address</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.9rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem' }}
                            />
                        </div>

                        <button type="submit" className="btn-primary" disabled={loading} style={{
                            padding: '1rem',
                            fontWeight: 600,
                            backgroundColor: loading ? '#ccc' : 'var(--color-gold)',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}>
                            {loading ? 'SENDING LINK...' : 'SEND RESET LINK'}
                        </button>

                        <div style={{ textAlign: 'center' }}>
                            <Link to="/login" style={{ color: 'var(--color-gold)', fontWeight: 600, fontSize: '0.9rem' }}>
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;

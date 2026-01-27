import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone_number: '',
        address: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const endpoint = isLogin ? '/api/accounts/login/' : '/api/accounts/register/';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                // Clear cart to ensure session isolation
                localStorage.removeItem('cart');
                window.dispatchEvent(new Event('cartUpdated'));
                window.dispatchEvent(new Event('profileUpdated'));
                alert(isLogin ? 'Logged in successfully!' : 'Account created successfully!');
                navigate('/');
            } else {
                // Handle complex validation errors from Django
                const errorMsg = typeof data === 'object'
                    ? Object.entries(data).map(([key, value]) => `${key}: ${value}`).join(' | ')
                    : 'Something went wrong';
                setError(errorMsg);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to connect to the server');
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '450px' }}>
            <div style={{
                backgroundColor: 'var(--color-royal-cream)',
                padding: '2.5rem',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(0,0,0,0.05)'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    fontFamily: 'var(--font-heading)',
                    marginBottom: '0.5rem',
                    fontSize: '2rem'
                }}>
                    {isLogin ? 'Login' : 'Create Account'}
                </h1>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    {isLogin ? 'Welcome back! Please enter your details.' : 'Join the Vasthramalika world.'}
                </p>

                {error && (
                    <div style={{
                        backgroundColor: '#fff1f0',
                        border: '1px solid #ffa39e',
                        padding: '0.8rem',
                        borderRadius: '4px',
                        color: '#f5222d',
                        fontSize: '0.85rem',
                        marginBottom: '1.5rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <input
                        name="username"
                        type="text"
                        placeholder="Username *"
                        value={formData.username}
                        onChange={handleChange}
                        style={{ padding: '0.8rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}
                        required
                    />

                    {!isLogin && (
                        <>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email Address *"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ padding: '0.8rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                required
                            />
                            <input
                                name="phone_number"
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                style={{ padding: '0.8rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                            <textarea
                                name="address"
                                placeholder="Delivery Address"
                                value={formData.address}
                                onChange={handleChange}
                                style={{ padding: '0.8rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd', minHeight: '80px' }}
                            />
                        </>
                    )}

                    <input
                        name="password"
                        type="password"
                        placeholder="Password *"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ padding: '0.8rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}
                        required
                    />

                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {isLogin && (
                            <Link to="/forgot-password" style={{ color: '#666', fontSize: '0.85rem', textDecoration: 'underline' }}>
                                Forgot Password?
                            </Link>
                        )}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-gold)',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '0.95rem'
                            }}
                        >
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

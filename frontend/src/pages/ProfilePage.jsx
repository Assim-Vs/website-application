import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        address: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const localUser = JSON.parse(localStorage.getItem('user') || 'null');

        if (!token) {
            navigate('/login');
            return;
        }

        if (localUser) {
            setUser(localUser);
            setFormData({
                username: localUser.username || '',
                email: localUser.email || '',
                first_name: localUser.first_name || '',
                last_name: localUser.last_name || '',
                phone_number: localUser.phone_number || '',
                address: localUser.address || ''
            });
            // Don't set loading to false yet, we want the fresh data from API
        }

        fetch('/api/accounts/profile/', {
            headers: { 'Authorization': `Token ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then(data => {
                setUser(data);
                setFormData({
                    username: data.username || '',
                    email: data.email || '',
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    phone_number: data.phone_number || '',
                    address: data.address || ''
                });
                // Sync with local storage
                const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
                localStorage.setItem('user', JSON.stringify({ ...storedUser, ...data }));
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch profile", err);
                setLoading(false);
            });
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('/api/accounts/profile/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedUser = await response.json();

                // Update everything to ensure absolute synchronization
                setUser(updatedUser);
                setFormData({
                    username: updatedUser.username || '',
                    email: updatedUser.email || '',
                    first_name: updatedUser.first_name || '',
                    last_name: updatedUser.last_name || '',
                    phone_number: updatedUser.phone_number || '',
                    address: updatedUser.address || ''
                });

                // Sync with local storage immediately
                const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
                const newUser = { ...storedUser, ...updatedUser };
                localStorage.setItem('user', JSON.stringify(newUser));

                // Notify Header and other components
                window.dispatchEvent(new Event('profileUpdated'));

                alert('Profile details synchronized with database successfully!');
                window.location.reload(); // Hard refresh to ensure all filling windows and identity sections are perfectly updated from the database
            } else {
                const errorData = await response.json();
                const errorMsg = typeof errorData === 'object'
                    ? Object.values(errorData).flat().join(', ')
                    : 'Failed to update profile.';
                alert(errorMsg);
            }
        } catch (err) {
            console.error("Update failed", err);
            alert('An error occurred while updating.');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div style={{ backgroundColor: 'var(--color-royal-ivory)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'var(--color-royal-maroon)' }}>Loading Profile...</h2>
    </div>;

    return (
        <div style={{ backgroundColor: 'var(--color-royal-ivory)', minHeight: '100vh', padding: '5rem 0' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <header style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}>
                    <Link to="/" style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-gold)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 600
                    }}>← BACK TO STORE</Link>
                    <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>User Settings</span>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-royal-maroon)', margin: 0 }}>Manage Profile</h1>
                </header>

                <div style={{
                    backgroundColor: 'var(--color-royal-cream)',
                    padding: '3rem',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    animation: 'fadeInUp 0.8s ease-out'
                }}>
                    <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.6rem', fontWeight: 600 }}>Username</label>
                                <input name="username" type="text" value={formData.username} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.6rem', fontWeight: 600 }}>Email Address</label>
                                <input name="email" type="email" value={formData.email} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.6rem', fontWeight: 600 }}>First Name</label>
                                <input name="first_name" type="text" value={formData.first_name} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.6rem', fontWeight: 600 }}>Last Name</label>
                                <input name="last_name" type="text" value={formData.last_name} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.6rem', fontWeight: 600 }}>Phone Number</label>
                            <input name="phone_number" type="tel" value={formData.phone_number} onChange={handleChange}
                                style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.6rem', fontWeight: 600 }}>Delivery Address</label>
                            <textarea name="address" value={formData.address} onChange={handleChange}
                                style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', minHeight: '120px', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <button type="submit" className="btn-primary" disabled={updating} style={{
                                width: '100%',
                                padding: '1rem',
                                fontSize: '1rem',
                                fontWeight: 600,
                                backgroundColor: updating ? '#ccc' : 'var(--color-gold)',
                                border: 'none',
                                cursor: updating ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s'
                            }}>
                                {updating ? 'REFRESHING PROFILE...' : 'UPDATE PROFILE'}
                            </button>
                        </div>
                    </form>

                    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px dashed #ccc' }}>
                        <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>
                            <strong style={{ color: 'var(--color-royal-maroon)' }}>{user?.email}</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [cartCount, setCartCount] = React.useState(0);
    const [user, setUser] = React.useState(null);

    const updateProfile = () => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            setUser(userData);
        } catch {
            setUser(null);
        }
    };

    const updateCartCount = () => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setCartCount(count);
        } catch {
            setCartCount(0);
        }
    };

    React.useEffect(() => {
        updateCartCount();
        updateProfile();
        window.addEventListener('storage', () => {
            updateCartCount();
            updateProfile();
        });
        window.addEventListener('cartUpdated', updateCartCount);
        window.addEventListener('profileUpdated', updateProfile);
        return () => {
            window.removeEventListener('storage', updateCartCount);
            window.removeEventListener('cartUpdated', updateCartCount);
            window.removeEventListener('profileUpdated', updateProfile);
        };
    }, []);

    React.useEffect(() => {
        fetch('/api/categories/?parent__isnull=True')
            .then(res => res.json())
            .then(data => {
                // Only take the top 3 categories if needed, or filter by specific names
                const filtered = (data.results || data).filter(c =>
                    ['men', 'mens', 'ladies', 'kids'].includes(c.slug.toLowerCase())
                );
                setCategories(filtered);
            })
            .catch(err => console.error("Failed to fetch categories", err));
    }, []);

    return (
        <header className="header" style={{
            backgroundColor: 'var(--color-royal-ivory)',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            padding: '1rem 0',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <Menu size={24} color="var(--color-charcoal)" />
                </button>

                {/* Logo */}
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-gold)',
                        fontSize: '1.5rem',
                        margin: 0,
                        letterSpacing: '0.05em'
                    }}>
                        VASTHRAMALIKA
                    </h1>
                </Link>

                {/* Desktop Navigation (Mega Menu) */}
                <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem', height: '100%', alignItems: 'center' }}>
                    <Link to="/" style={{ fontWeight: 500, color: 'var(--color-charcoal)', textDecoration: 'none' }}>Home</Link>

                    {categories.map(category => (
                        <div key={category.id} className="nav-item">
                            <Link to={`/category/${category.slug}`} className="nav-link">
                                {category.name.toUpperCase()}
                            </Link>

                            {/* Dropdown */}
                            {category.children && category.children.length > 0 && (
                                <div className="mega-menu">
                                    <div className="mega-menu-content">
                                        {category.children.map(child => (
                                            <div key={child.id} className="mm-column">
                                                <Link to={`/category/${child.slug}`} style={{ color: 'var(--color-gold)', fontWeight: 'bold', marginBottom: '1rem' }}>
                                                    {child.name}
                                                </Link>
                                                {child.children && child.children.map(subchild => (
                                                    <Link key={subchild.id} to={`/category/${subchild.slug}`}>
                                                        {subchild.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    {/* User Profile Dropdown */}
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setIsProfileOpen(true)}
                        onMouseLeave={() => setIsProfileOpen(false)}
                    >
                        <button style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-charcoal)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                            gap: '4px',
                            minWidth: '50px'
                        }}>
                            <User size={22} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase' }}>
                                {user ? (user.first_name || user.username) : 'Profile'}
                            </span>
                        </button>

                        {isProfileOpen && (
                            <div className="profile-dropdown" style={{
                                position: 'absolute',
                                top: '100%',
                                right: '-10px',
                                backgroundColor: 'var(--color-royal-ivory)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                padding: '1.5rem',
                                width: '250px',
                                zIndex: 1000,
                                borderRadius: '0 0 4px 4px',
                                borderTop: '1px solid #f0f0f0'
                            }}>
                                {user ? (
                                    <>
                                        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Hello, {user.first_name || user.username}</h3>
                                        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1.2rem' }}>Manage your orders and security.</p>
                                        <Link to="/profile" style={{ fontSize: '0.85rem', color: 'var(--color-gold)', fontWeight: 600, marginBottom: '1rem', display: 'block' }}>Edit Profile</Link>
                                        <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', margin: '0.8rem 0' }} />
                                        <Link to="/orders" style={{ fontSize: '0.85rem', color: '#333', marginBottom: '0.5rem', display: 'block' }}>Orders</Link>
                                        <Link to="/wishlist" style={{ fontSize: '0.85rem', color: '#333', marginBottom: '1.2rem', display: 'block' }}>Wishlist</Link>
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem('token');
                                                localStorage.removeItem('user');
                                                localStorage.removeItem('cart');
                                                window.dispatchEvent(new Event('cartUpdated'));
                                                window.dispatchEvent(new Event('profileUpdated'));
                                                window.location.href = '/';
                                            }}
                                            style={{
                                                padding: '0.6rem',
                                                width: '100%',
                                                textAlign: 'center',
                                                border: '1px solid #f0f0f0',
                                                backgroundColor: '#f9f9f9',
                                                color: '#333',
                                                fontWeight: 600,
                                                fontSize: '0.9rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            LOG OUT
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Welcome</h3>
                                        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1.2rem' }}>To access account and manage orders</p>
                                        <Link to="/login" className="btn-outline" style={{
                                            padding: '0.6rem',
                                            textAlign: 'center',
                                            border: '1px solid var(--color-gold)',
                                            color: 'var(--color-gold)',
                                            fontWeight: 600,
                                            fontSize: '0.9rem'
                                        }}>
                                            LOGIN / SIGNUP
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <Link to="/cart" className="cart-icon-container" style={{
                        color: 'var(--color-charcoal)',
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        minWidth: '50px',
                        position: 'relative'
                    }}>
                        <div style={{ position: 'relative' }}>
                            <ShoppingBag size={22} />
                            {cartCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    backgroundColor: '#ff9f00', // Orange as in user screenshot
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '18px',
                                    height: '18px',
                                    fontSize: '0.7rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    border: '2px solid white'
                                }}>
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase' }}>Cart</span>
                    </Link>
                </div>
            </div>

            {/* Slide-out Drawer */}
            {isMenuOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '75%',
                    maxWidth: '300px',
                    height: '100vh',
                    backgroundColor: 'var(--color-royal-ivory)',
                    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
                    zIndex: 1001,
                    padding: '2rem',
                    transition: 'transform 0.3s ease'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', margin: 0 }}>Menu</h2>
                        <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>
                    </div>
                    {/* Navigation (Mega Menu) */}
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.1rem', color: 'var(--color-charcoal)', fontWeight: 500 }}>Home</Link>
                        <Link to="/vasthramalika" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.1rem', color: 'var(--color-charcoal)', fontWeight: 500 }}>Vasthramalika</Link>
                        {categories.map(category => (
                            <div key={category.id}>
                                <Link to={`/category/${category.slug}`} onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.1rem', color: 'var(--color-charcoal)', fontWeight: 500 }}>
                                    {category.name}
                                </Link>
                                {/* Mobile Subcategories (Simple Indent) */}
                                {category.children && (
                                    <div style={{ paddingLeft: '1rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {category.children.map(child => (
                                            <Link key={child.id} to={`/category/${child.slug}`} onClick={() => setIsMenuOpen(false)} style={{ fontSize: '0.9rem', color: '#666' }}>
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            )}

            {/* Overlay */}
            {isMenuOpen && (
                <div
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1000
                    }}
                />
            )}
        </header>
    );
};

export default Header;

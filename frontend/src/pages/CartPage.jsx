import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';

const CartPage = () => {
    // Lazy initialize from localStorage
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        } catch {
            return [];
        }
    });

    const [customer, setCustomer] = useState({
        name: '',
        phone: '',
        address: '',
        landmark: '',
        pincode: ''
    });

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event('cartUpdated'));
        // No window.location.reload()
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
    };

    const handleCheckout = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to place an order.');
            return;
        }

        if (!customer.name || !customer.phone || !customer.address || !customer.pincode) {
            alert('Please fill in all required delivery details.');
            return;
        }

        try {
            // 1. Save to Backend First
            const orderData = {
                full_name: customer.name,
                phone_number: customer.phone,
                shipping_address: `${customer.address}, ${customer.landmark ? customer.landmark + ', ' : ''}${customer.pincode}`,
                items: cart.map(item => ({
                    product: item.id,
                    quantity: item.quantity
                }))
            };

            const response = await fetch('/api/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }

            const savedOrder = await response.json();
            console.log("Order saved to backend:", savedOrder);

            // 2. Clear local cart
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdated'));

            // 3. WhatsApp Redirection
            const orderItemsTxt = cart.map(item =>
                `- ${item.name} (${item.serial_number}) Size: ${item.size || 'N/A'} x${item.quantity}: ₹${item.price * item.quantity}`
            ).join('\n');

            const totalAmount = calculateTotal();
            const customerTxt = `Name: ${customer.name}\nPhone: ${customer.phone}\nAddress: ${customer.address}\nLandmark: ${customer.landmark || 'N/A'}\nPincode: ${customer.pincode}`;

            const rawMsg = `*New Order Request (#${savedOrder.id})*\n\nHello Vasthramalika, I have placed an order on your website:\n\n${orderItemsTxt}\n\n*Customer Details*\n${customerTxt}\n\n---------------------------\n*Order Total: ₹${totalAmount}*\n---------------------------\n\nPlease confirm availability and payment details.`;

            const encodedMessage = encodeURIComponent(rawMsg);

            // Replace with actual shop number
            const phoneNumber = "916238707302";
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

            alert('Order placed successfully! Redirecting to WhatsApp for confirmation.');
            setCart([]); // Reset local state
        } catch (err) {
            console.error("Order synchronization failed:", err);
            alert(`Failed to sync order with backend: ${err.message}`);
        }
    };

    const handleInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh', justifyContent: 'center' }}>
                <ShoppingBag size={64} style={{ color: 'var(--color-stone)', marginBottom: '1rem' }} />
                <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-charcoal)' }}>Your Cart is Empty</h2>
                <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="btn-primary" style={{ display: 'inline-block', padding: '0.8rem 2rem' }}>
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem', paddingBottom: '120px' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Cart ({cart.length} Items)</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>

                {/* Product List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {cart.map((item, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            gap: '1rem',
                            padding: '1rem',
                            backgroundColor: 'var(--color-royal-cream)',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            {/* Image */}
                            <div style={{
                                width: '80px',
                                height: '100px',
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '4px',
                                flexShrink: 0
                            }} />

                            {/* Details */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#333' }}>{item.name}</h3>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                                        Size: {item.size || 'One Size'}
                                    </p>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>₹{item.price * item.quantity}</span>
                                </div>
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={() => removeFromCart(index)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#ff4d4f',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                    alignSelf: 'flex-start'
                                }}
                                aria-label="Remove item"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Customer Details Form */}
                <div style={{
                    backgroundColor: 'var(--color-royal-cream)',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '1px dashed #ccc', paddingBottom: '0.5rem' }}>Delivery Address</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.4rem' }}>Receiver's Name *</label>
                            <input name="name" type="text" value={customer.name} onChange={handleInputChange} style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Enter name" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.4rem' }}>Phone Number *</label>
                            <input name="phone" type="tel" value={customer.phone} onChange={handleInputChange} style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Enter 10 digit phone number" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.4rem' }}>Address (House No, Building, Street) *</label>
                            <textarea name="address" value={customer.address} onChange={handleInputChange} style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px', minHeight: '80px' }} placeholder="Full delivery address" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.4rem' }}>Landmark (Optional)</label>
                                <input name="landmark" type="text" value={customer.landmark} onChange={handleInputChange} style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Near by..." />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.4rem' }}>Pincode *</label>
                                <input name="pincode" type="text" value={customer.pincode} onChange={handleInputChange} style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="6 digit pincode" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price Details */}
                <div style={{
                    backgroundColor: 'var(--color-royal-cream)',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    height: 'fit-content'
                }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px dashed #ccc', paddingBottom: '0.5rem' }}>Price Details</h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                        <span>Total Product Price</span>
                        <span>₹{calculateTotal()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#00b894' }}>
                        <span>Delivery Charges</span>
                        <span>Free</span>
                    </div>

                    <div style={{ borderTop: '1px dashed #ccc', margin: '1rem 0' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        <span>Order Total</span>
                        <span>₹{calculateTotal()}</span>
                    </div>
                </div>

            </div>

            {/* Bottom Checkout Bar (Mobile Sticky) */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                backgroundColor: 'var(--color-royal-ivory)',
                borderTop: '1px solid rgba(0,0,0,0.1)',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
                zIndex: 100
            }}>
                <div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Total Amount</p>
                    <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: 'bold' }}>₹{calculateTotal()}</p>
                </div>
                <button
                    onClick={handleCheckout}
                    className="btn-primary"
                    style={{
                        padding: '0.8rem 2rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        backgroundColor: '#e91e63', // Meesho pinkish
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default CartPage;

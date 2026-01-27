import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomePage = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [ladiesProducts, setLadiesProducts] = useState([]);
    const [premiumProducts, setPremiumProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch latest products
        const fetchLatest = fetch('/api/products/?limit=8')
            .then(res => res.json())
            .then(data => setLatestProducts(data.results || data));

        // Fetch ladies special products specifically
        const fetchLadies = fetch('/api/products/?is_ladies_special=True&limit=4')
            .then(res => res.json())
            .then(data => setLadiesProducts(data.results || data));

        // Fetch premium products specifically
        const fetchPremium = fetch('/api/products/?is_premium=True&limit=4')
            .then(res => res.json())
            .then(data => setPremiumProducts(data.results || data));

        Promise.all([fetchLatest, fetchLadies, fetchPremium])
            .then(() => setLoading(false))
            .catch(err => {
                console.error("Failed to fetch products", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <main>
            {/* Hero Section */}
            <div style={{ marginBottom: '2rem' }}>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3500 }}
                    style={{ height: '500px' }}
                >
                    {/* Slide 1: Men */}
                    <SwiperSlide>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url("/mens_banner_1.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-start',
                            padding: '4rem'
                        }}>
                            <div style={{
                                textAlign: 'left',
                                color: 'white',
                                textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                                animation: 'fadeInUp 0.8s ease-out'
                            }}>
                                <h1 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '2.5rem',
                                    marginBottom: '0.5rem',
                                    color: 'var(--color-gold)',
                                    lineHeight: '1',
                                    fontWeight: 600
                                }}>MEN'S <br />Formal Wear</h1>
                                <p style={{ marginBottom: '1.5rem', opacity: 0.9, fontSize: '1rem', fontWeight: 300, letterSpacing: '0.05em' }}>
                                    Experience royal elegance with our tailored collections.
                                </p>
                                <Link to="/category/men" className="btn-primary" style={{
                                    padding: '0.6rem 2rem',
                                    backgroundColor: 'transparent',
                                    border: '1px solid var(--color-gold)',
                                    borderRadius: '0',
                                    fontSize: '0.8rem'
                                }}>SHOP MEN</Link>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Slide 2: Ladies */}
                    <SwiperSlide>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url("/black_red_banner.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-start',
                            padding: '4rem'
                        }}>
                            <div style={{
                                textAlign: 'left',
                                color: 'white',
                                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                animation: 'fadeInUp 0.8s ease-out'
                            }}>
                                <h1 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '2.5rem',
                                    marginBottom: '0.5rem',
                                    color: 'var(--color-royal-cream)',
                                    lineHeight: '1',
                                    fontWeight: 600
                                }}>LADIES' <br />Splendor</h1>
                                <p style={{ marginBottom: '1.5rem', opacity: 0.9, fontSize: '1rem', fontWeight: 300, letterSpacing: '0.05em' }}>
                                    Exquisite designs for the queen in you.
                                </p>
                                <Link to="/category/ladies" className="btn-primary" style={{
                                    padding: '0.6rem 2rem',
                                    backgroundColor: 'var(--color-gold)',
                                    border: '1px solid var(--color-gold)',
                                    borderRadius: '0',
                                    fontSize: '0.8rem',
                                    color: 'white'
                                }}>SHOP LADIES</Link>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Slide 3: Kids */}
                    <SwiperSlide>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url("/mens_banner_2.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-start',
                            padding: '4rem'
                        }}>
                            <div style={{
                                textAlign: 'left',
                                color: 'white',
                                textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                                animation: 'fadeInUp 0.8s ease-out'
                            }}>
                                <h1 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '2.5rem',
                                    marginBottom: '0.5rem',
                                    color: 'var(--color-royal-emerald)',
                                    lineHeight: '1',
                                    fontWeight: 600
                                }}>LITTLE <br />Royalty</h1>
                                <p style={{ marginBottom: '1.5rem', opacity: 0.9, fontSize: '1rem', fontWeight: 300, letterSpacing: '0.05em' }}>
                                    Traditional joy for your little ones.
                                </p>
                                <Link to="/category/kids" className="btn-primary" style={{
                                    padding: '0.6rem 2rem',
                                    backgroundColor: 'transparent',
                                    border: '1px solid var(--color-royal-emerald)',
                                    borderRadius: '0',
                                    fontSize: '0.8rem',
                                    color: 'white'
                                }}>SHOP KIDS</Link>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Slide 4: Just Banner (Mens 3) */}
                    <SwiperSlide>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url("/mens_banner_3.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }} />
                    </SwiperSlide>

                    {/* Slide 5: Just Banner (Mens Banner) */}
                    <SwiperSlide>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url("/mens_banner.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }} />
                    </SwiperSlide>

                    {/* Slide 6: Just Banner (Mens Item) */}
                    <SwiperSlide>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url("/mens_item.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }} />
                    </SwiperSlide>

                    {/* Slide 7: Just Banner (Shop Interior) */}
                    <SwiperSlide>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url("/shop_about.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }} />
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Premium Wear Section (Royal Maroon Theme) */}
            <div style={{
                backgroundColor: '#5D1010',
                padding: '6rem 0',
                color: 'var(--color-royal-cream)',
                marginBottom: '4rem',
                animation: 'fadeIn 1s ease-in'
            }}>
                <div className="container">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '4rem',
                        animation: 'fadeInUp 0.8s ease-out'
                    }}>
                        <div>
                            <span style={{
                                color: 'var(--color-gold)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3em',
                                fontSize: '0.8rem',
                                display: 'block',
                                marginBottom: '0.5rem'
                            }}>Heritage Excellence</span>
                            <h2 style={{ color: 'var(--color-royal-cream)', margin: 0, fontSize: '2.5rem' }}>Premium Collection</h2>
                        </div>
                        <Link to="/all-products" style={{
                            color: 'var(--color-gold)',
                            fontWeight: 600,
                            textDecoration: 'none',
                            borderBottom: '1px solid var(--color-gold)',
                            paddingBottom: '2px'
                        }}>EXPLORE ELITE →</Link>
                    </div>

                    {premiumProducts.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '3rem',
                            animation: 'fadeInUp 1s ease-out'
                        }}>
                            {premiumProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem', border: '1px solid rgba(253, 245, 230, 0.2)', borderRadius: '12px' }}>
                            <p style={{ color: 'var(--color-royal-cream)', opacity: 0.7, fontSize: '1.1rem' }}>Our finest pieces are currently being curated for you.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Ladies Special Section (Themed) */}
            <div style={{ backgroundColor: 'var(--color-ever-brown)', padding: '5rem 0', color: 'white' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                        <div>
                            <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem' }}>Elegance & Grace</span>
                            <h2 style={{ color: 'white', margin: '0.5rem 0 0' }}>Ladies Special Selection</h2>
                        </div>
                        <Link to="/ladies-special" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>Explore Full Selection →</Link>
                    </div>

                    {ladiesProducts.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: '2rem'
                        }}>
                            {ladiesProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed rgba(255,255,255,0.3)', borderRadius: '8px' }}>
                            <p style={{ color: 'rgba(255,255,255,0.7)' }}>New Ladies collection arriving soon!</p>
                            <Link to="/admin" style={{ fontSize: '0.8rem', color: 'var(--color-gold)' }}>Add products in admin panel</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* About Vasthramalika Section */}
            <div style={{ padding: '6rem 0', backgroundColor: 'var(--color-royal-ivory)' }}>
                <div className="container" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    <div style={{ position: 'relative' }}>
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={0}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            style={{
                                height: '450px',
                                borderRadius: '12px',
                                boxShadow: 'var(--shadow-lg)',
                                overflow: 'hidden'
                            }}
                        >
                            <SwiperSlide>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: 'url("/shop_about.png")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: 'url("/mens_item.png")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: 'url("/mens_banner_1.png")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: 'url("/mens_banner_2.png")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }} />
                            </SwiperSlide>
                        </Swiper>

                        <div style={{
                            position: 'absolute',
                            bottom: '-20px',
                            right: '-20px',
                            backgroundColor: 'white',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            boxShadow: 'var(--shadow-md)',
                            borderBottom: '4px solid var(--color-gold)',
                            zIndex: 10
                        }}>
                            <h3 style={{ margin: 0, color: 'var(--color-gold)', fontSize: '1.2rem' }}>Since 2020</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>Quality Guaranteed</p>
                        </div>
                    </div>
                    <div>
                        <span style={{ color: 'var(--color-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>Our Heritage</span>
                        <h2 style={{ fontSize: '3rem', margin: '1rem 0 2rem', lineHeight: '1.2' }}>Discover the World of <br />Vasthramalika</h2>
                        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                            At Vasthramalika, we believe in the timeless elegance of tradition. Our collection is more than just clothing; it is a celebration of heritage, craftsmanship, and the royal spirit that resides in every thread. Founded on the principle of providing unparalleled quality and unique designs, we have become a premier destination for those who seek to express their style with dignity and grace.
                        </p>
                        <Link to="/vasthramalika" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Learn Our Story</Link>
                    </div>
                </div>
            </div>

            {/* General Latest Arrivals */}
            <div style={{ backgroundColor: 'var(--color-royal-ivory)', padding: '4rem 0' }}>
                <div className="container">
                    <h2 style={{ marginBottom: '3rem', textAlign: 'center' }}>Latest Arrivals</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '2rem'
                    }}>
                        {latestProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HomePage;

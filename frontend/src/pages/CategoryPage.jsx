import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const CategoryPage = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prevSlug, setPrevSlug] = useState(slug);

    if (slug !== prevSlug) {
        setPrevSlug(slug);
        setLoading(true);
    }

    const categoryLower = slug.toLowerCase();
    const isMenCategory = categoryLower === 'men' || categoryLower === 'mens';
    const isLadiesCategory = categoryLower === 'ladies' || categoryLower === 'women';
    const isKidsCategory = categoryLower === 'kids';

    const menSlides = [
        {
            image: "/mens_banner_1.png",
            title: "Royal Heritage",
            subtitle: "Traditional excellence in Maroon & Cream"
        },
        {
            image: "/mens_banner_2.png",
            title: "Velvet Elegance",
            subtitle: "Premium craftmanship for the modern man"
        },
        {
            image: "/mens_banner_3.png",
            title: "Classic Kurta",
            subtitle: "The perfect blend of tradition and style"
        }
    ];

    const ladiesSlides = [
        {
            image: "/ladies_blue_1.png",
            title: "Royal Blue Splendor",
            subtitle: "Exquisite designs in Royal Blue & Cream"
        },
        {
            image: "/ladies_blue_2.png",
            title: "Zari Elegance",
            subtitle: "Intricate craftsmanship for the queen in you"
        },
        {
            image: "/ladies_blue_3.png",
            title: "Heritage Weaves",
            subtitle: "Timeless traditions, modern grace"
        }
    ];

    const kidsSlides = [
        {
            image: "/kids_emerald_1.png",
            title: "Little Royalty",
            subtitle: "Playful elegance in Emerald & Cream"
        },
        {
            image: "/kids_emerald_2.png",
            title: "Traditional Joy",
            subtitle: "Comfortable ethnic wear for your little ones"
        },
        {
            image: "/kids_emerald_3.png",
            title: "Festive Sparkle",
            subtitle: "Make every moment special with our heritage collection"
        }
    ];

    useEffect(() => {
        fetch(`/api/products/?category__slug=${slug}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.results || data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products", err);
                setLoading(false);
            });
    }, [slug]);

    const formatTitle = (slug) => {
        return slug.charAt(0).toUpperCase() + slug.slice(1);
    };

    const isThemedPage = isMenCategory || isLadiesCategory || isKidsCategory;

    const pageTheme = isThemedPage ? {
        backgroundColor: 'var(--color-royal-ivory)',
        minHeight: '100vh',
    } : {
        backgroundColor: 'var(--color-royal-ivory)',
        minHeight: '100vh'
    };

    const headerStyle = isThemedPage ? {
        backgroundColor: isMenCategory ? 'var(--color-royal-maroon)' : isLadiesCategory ? 'var(--color-royal-blue)' : 'var(--color-royal-emerald)',
        color: 'var(--color-royal-cream)',
        padding: '3rem 1rem',
        marginBottom: '3rem',
        borderRadius: '0 0 20px 20px', // Reduced on mobile potentially
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center',
        margin: '0 auto',
        maxWidth: '1200px'
    } : {
        textAlign: 'center',
        marginBottom: '2rem'
    };

    const currentSlides = isMenCategory ? menSlides : isLadiesCategory ? ladiesSlides : kidsSlides;

    return (
        <div style={pageTheme}>
            {isThemedPage && (
                <div style={{ marginBottom: '2rem', overflow: 'hidden' }}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, EffectFade]}
                        effect="fade"
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000 }}
                        className="category-swiper"
                    >
                        {currentSlides.map((slide, idx) => (
                            <SwiperSlide key={idx}>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url("${slide.image}")`,
                                    backgroundColor: 'var(--color-ever-brown)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    display: 'flex',
                                    alignItems: 'flex-end', // Position at bottom
                                    justifyContent: 'flex-start', // Position at left
                                    padding: '3rem'
                                }}>
                                    <div className="category-slide-content" style={{
                                        color: 'var(--color-royal-cream)',
                                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                        animation: 'fadeInUp 0.8s ease-out',
                                        textAlign: 'left'
                                    }}>
                                        <h2 style={{ color: 'var(--color-royal-cream)', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 600 }}>{slide.title}</h2>
                                        <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem', fontWeight: 300, letterSpacing: '0.05em' }}>{slide.subtitle}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            <div className="container" style={{ padding: isThemedPage ? '0 1rem 4rem' : '4rem 1rem', width: '100%' }}>
                <div style={headerStyle}>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        margin: 0,
                        color: isThemedPage ? 'var(--color-royal-cream)' : 'inherit'
                    }}>
                        {formatTitle(slug)} Collection
                    </h1>
                    {isThemedPage && <p style={{ marginTop: '0.5rem', opacity: 0.8, fontSize: '0.9rem' }}>Exquisite tradition in every thread</p>}
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center' }}>Loading products...</p>
                ) : products.length === 0 ? (
                    <div style={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h2>No Products Found</h2>
                        <p>We couldn't find any products in the {formatTitle(slug)} category.</p>
                    </div>
                ) : (
                    <div className="product-grid">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;

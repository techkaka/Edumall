import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigation } from './Router';
import { IMAGEKIT_URLS } from '../utils/productData';

// Clean hero carousel images - using your authentic NEET Kaka JEE products
const heroImages = [
  {
    id: 1,
    src: IMAGEKIT_URLS.DWAR_JKR_COMBO,
    alt: "NEET Kaka JEE Combo DWAR & JKR Study Materials"
  },
  {
    id: 2,
    src: IMAGEKIT_URLS.COMPLETE_BIOLOGY_PACKAGE,
    alt: "Complete Biology Package for NEET Preparation"
  },
  {
    id: 3,
    src: IMAGEKIT_URLS.VISHWAS_OFFLINE_BATCH,
    alt: "Vishwas Offline Batch Study Materials"
  },
  {
    id: 4,
    src: IMAGEKIT_URLS.NCERT_WORD_TO_WORD_COMBO,
    alt: "NCERT Word to Word Complete Combo"
  }
];

export function HeroSection() {
  const navigation = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Slower transition for better viewing

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Handle image click
  const handleImageClick = () => {
    navigation.goToProducts({ category: 'Featured Combos' });
  };

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroImages.length);
  };

  const prevSlide = () => {
    goToSlide(currentSlide === 0 ? heroImages.length - 1 : currentSlide - 1);
  };

  // Handle image load
  const handleImageLoad = (imageId: number) => {
    setImageLoaded(prev => ({ ...prev, [imageId]: true }));
  };

  // Touch/swipe support for mobile
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-2 lg:py-4">
        <div className="relative max-w-6xl mx-auto">
          
          {/* Pure Image Carousel - Absolutely No Text */}
          <div 
            className="pure-hero-carousel"
            onClick={handleImageClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="button"
            tabIndex={0}
            aria-label="View study materials - Click to shop"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleImageClick();
              }
            }}
          >
            {/* Clean Image Container - Zero Overlays */}
            <div className="zero-text-container">
              
              {/* Current Image - Full Clean Display */}
              <ImageWithFallback
                src={heroImages[currentSlide].src}
                alt={heroImages[currentSlide].alt}
                className={`w-full h-full object-contain transition-all duration-1000 ${
                  imageLoaded[heroImages[currentSlide].id] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(heroImages[currentSlide].id)}
              />

              {/* Clean Loading State */}
              {!imageLoaded[heroImages[currentSlide].id] && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
              )}

              {/* Invisible Navigation Arrows - Desktop Only, No Text */}
              <div className="hidden lg:flex">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="text-free-arrow prev"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="text-free-arrow next"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* ULTRA-SUBTLE: Barely visible navigation dots */}
          <div className="pure-nav-dots">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`pure-nav-dot ${index === currentSlide ? 'active' : ''}`}
                aria-label={`Image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import React, { useState, useEffect } from 'react';
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
  // Test basic useState first
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Test navigation hook
  let navigation;
  try {
    navigation = useNavigation();
  } catch (error) {
    console.error('Navigation hook error:', error);
    // Provide fallback navigation
    navigation = {
      goToProducts: () => console.log('Navigation not available')
    };
  }

  // Simple auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle image click
  const handleImageClick = () => {
    if (navigation) {
      navigation.goToProducts({ category: 'Featured Combos' });
    }
  };

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? heroImages.length - 1 : currentSlide - 1);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-2 lg:py-4">
        <div className="relative max-w-6xl mx-auto">
          {/* Hero Carousel */}
          <div className="pure-hero-carousel">
            <div className="zero-text-container">
              {/* Current Image */}
              <ImageWithFallback
                src={heroImages[currentSlide].src}
                alt={heroImages[currentSlide].alt}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
                onClick={handleImageClick}
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Navigation Dots */}
            <div className="pure-nav-dots">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`pure-nav-dot ${index === currentSlide ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
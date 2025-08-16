import React from 'react';
import { useNavigation } from '../Router';
import { Button } from '../ui/button';
import { loadSampleCartItems, checkCartStatus } from '../../utils/quickCartLoader';
import { ShoppingBag } from 'lucide-react';
import { HeroSection } from '../HeroSection';
import { CategoriesSection } from '../CategoriesSection';
import { FeaturedProducts } from '../FeaturedProducts';
import { TestimonialsSection } from '../TestimonialsSection';

export const HomePage: React.FC = () => {
  const navigation = useNavigation();

  const handleShopNow = () => {
    navigation.goToProducts();
  };

  const handleLoadCart = () => {
    loadSampleCartItems();
    checkCartStatus();
  };

  return (
    <div className="w-full">
      {/* Cart Loading Button (Always Available) */}
      <button
        onClick={handleLoadCart}
        className="fixed bottom-4 left-4 z-40 bg-primary hover:bg-blue1 text-white p-3 rounded-full shadow-lg transition-colors"
        title="Load Sample Cart Items"
      >
        <ShoppingBag className="h-5 w-5" />
      </button>

      {/* Hero Section */}
      <section className="section-compact">
        <div className="container mx-auto px-4">
          <HeroSection />
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-compact">
        <div className="container mx-auto px-4">
          <CategoriesSection />
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-compact">
        <div className="container mx-auto px-4">
          <FeaturedProducts />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-compact">
        <div className="container mx-auto px-4">
          <TestimonialsSection />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
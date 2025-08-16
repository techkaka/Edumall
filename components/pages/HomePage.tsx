import React from 'react';
import { useNavigation } from '../Router';
import { Button } from '../ui/button';
import { HeroSection } from '../HeroSection';
import { CategoriesSection } from '../CategoriesSection';
import { FeaturedProducts } from '../FeaturedProducts';
import { TestimonialsSection } from '../TestimonialsSection';

export const HomePage: React.FC = () => {
  const navigation = useNavigation();

  const handleShopNow = () => {
    navigation.goToProducts();
  };

  return (
    <div className="w-full">

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
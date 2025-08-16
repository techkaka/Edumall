import React, { useState } from 'react';
import { Heart, ShoppingCart, Zap, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigation } from './Router';
import { useFeaturedProducts, useCart, useWishlist } from '../services/useApi';
import { Product } from '../services/types';

export function FeaturedProducts() {
  const navigation = useNavigation();
  const { data: featuredProducts, loading, error } = useFeaturedProducts(8);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({});

  const handleWishlistToggle = async (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    const actionKey = `wishlist-${product.id}`;
    
    try {
      setActionLoading(prev => ({ ...prev, [actionKey]: true }));
      
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id);
        // Removed from wishlist
      } else {
        await addToWishlist(product.id);
        // Added to wishlist
      }
    } catch (err) {
      // Wishlist action failed
    } finally {
      setActionLoading(prev => ({ ...prev, [actionKey]: false }));
    }
  };

  const handleAddToCart = async (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    const actionKey = `cart-${product.id}`;
    
    try {
      setActionLoading(prev => ({ ...prev, [actionKey]: true }));
      await addToCart(product.id, 1);
      // Added to cart
    } catch (err) {
      // Add to cart failed
    } finally {
      setActionLoading(prev => ({ ...prev, [actionKey]: false }));
    }
  };

  const handleProductClick = (product: Product) => {
    navigation.goToProductDetail(product.id);
  };

  const handleViewAllProducts = () => {
    navigation.goToProducts();
  };

  if (loading) {
    return (
      <section className="section-tight modern-gradient-bg">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue1 rounded-full animate-spin">
                <div className="w-full h-full bg-white rounded-full m-1.5"></div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Loading Featured Products</h3>
            <p className="text-gray-600 text-sm">Fetching our best materials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-tight modern-gradient-bg">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Unable to load featured products</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={handleViewAllProducts} 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (!featuredProducts || featuredProducts.length === 0) {
    return (
      <section className="section-tight modern-gradient-bg">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">No featured products available</h3>
            <p className="text-gray-600">Check back soon for amazing deals on study materials!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-tight modern-gradient-bg">
      <div className="container mx-auto px-4">
        {/* Ultra-Vibrant Aqua Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
            <span className="bg-gradient-to-r from-primary via-blue1 to-blue2 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
        </div>

        {/* Ultra-Vibrant Aqua Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-6">
          {featuredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-xl transition-all duration-300 border border-primary/20 shadow-md bg-white cursor-pointer transform hover:scale-105 overflow-hidden featured-product-card"
              onClick={() => handleProductClick(product)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden bg-gradient-to-br from-lightBg to-white">
                  {/* Ultra-Vibrant Aqua Clean image container */}
                  <div className="relative w-full h-44 overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Ultra-Vibrant Aqua gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Ultra-Vibrant Aqua wishlist button */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 p-0 bg-white/95 hover:bg-white hover:scale-105 transition-all border-primary/30 shadow-md hover:border-primary/60"
                      onClick={(e) => handleWishlistToggle(product, e)}
                      disabled={actionLoading[`wishlist-${product.id}`]}
                    >
                      <Heart 
                        className={`h-3 w-3 transition-colors ${
                          isInWishlist(product.id)
                            ? 'text-red-500 fill-red-500' 
                            : 'text-primary hover:text-red-500'
                        }`} 
                      />
                    </Button>
                  </div>
                </div>

                {/* Ultra-Vibrant Aqua content area */}
                <div className="p-4">
                  {/* Ultra-Vibrant Aqua title with hover effect */}
                  <h3 className="font-bold text-sm text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                    {product.title}
                  </h3>

                  {/* Ultra-Vibrant Aqua pricing with green discount */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-black text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-green-600 font-semibold">
                        {product.discount}% off
                      </span>
                    </div>
                  </div>

                  {/* Ultra-Vibrant Aqua Add to Cart Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 transition-all font-bold py-2 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 text-white"
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={actionLoading[`cart-${product.id}`]}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {actionLoading[`cart-${product.id}`] ? 'Adding...' : 'Add to Cart'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ultra-Vibrant Aqua bottom CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary via-blue1 to-blue2 hover:from-blue1 hover:via-blue2 hover:to-blue3 hover:shadow-xl transform hover:scale-105 transition-all font-bold px-8 py-3 text-base text-white"
            onClick={handleViewAllProducts}
          >
            <Zap className="h-4 w-4 mr-2" />
            View All Products
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <p className="text-gray-600 mt-3 font-medium text-sm">
            Discover the complete range of study materials
          </p>
        </div>
      </div>
    </section>
  );
}
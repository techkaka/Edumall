import { useState, useEffect } from 'react';
import { Grid3X3, List, Star, Heart, ShoppingCart, SlidersHorizontal, Package } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
// Input removed - search handled by header
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useRouter, useNavigation } from '../Router';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import {
  NEET_KAKA_PRODUCTS,
  PRODUCT_CATEGORIES,
  PRODUCT_SUBJECTS,
  PRODUCT_PUBLISHERS,
  isBackendConfigured,
  AUTHENTIC_COMBO_IMAGE
} from '../../utils/productData';

export function ProductsPage() {
  const { pageData } = useRouter();
  const { goToProductDetail } = useNavigation();
  
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('loading');
  // Search is now handled by the header component - no local search needed
  const [selectedCategory, setSelectedCategory] = useState(pageData?.category || 'All');
  const [filterType, setFilterType] = useState(pageData?.type || null);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedPublisher, setSelectedPublisher] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Fetch products from backend or use centralized data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if backend is configured
        if (!isBackendConfigured(projectId, publicAnonKey)) {
          setAllProducts(NEET_KAKA_PRODUCTS);
          setProducts(NEET_KAKA_PRODUCTS);
          setDataSource('centralized');
          setLoading(false);
          return;
        }

        // Try to fetch from backend
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-fa655b79/products`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Backend returned ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
          setAllProducts(result.data);
          setProducts(result.data);
          setDataSource('backend');
          // Products loaded successfully from backend
        } else {
          throw new Error(result.error || 'Failed to fetch products');
        }
      } catch (err) {
        // Backend not available, falling back to centralized data
        setAllProducts(NEET_KAKA_PRODUCTS);
        setProducts(NEET_KAKA_PRODUCTS);
        setDataSource('centralized');
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update filters when pageData changes
  useEffect(() => {
    if (pageData?.category) {
      setSelectedCategory(pageData.category);
    }
    if (pageData?.type) {
      setFilterType(pageData.type);
    }
  }, [pageData]);

  // Filter products (search is handled by header component)
  useEffect(() => {
    if (!allProducts.length) return;

    let filtered = allProducts;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Subject filter
    if (selectedSubject !== 'All') {
      filtered = filtered.filter(product => product.subject === selectedSubject);
    }

    // Publisher filter
    if (selectedPublisher !== 'All') {
      filtered = filtered.filter(product => product.publisher === selectedPublisher);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    setProducts(filtered);
  }, [allProducts, selectedCategory, selectedSubject, selectedPublisher, sortBy]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSubject('All');
    setSelectedPublisher('All');
    setSortBy('popularity');
    setFilterType(null);
  };

  const getPageTitle = () => {
    if (filterType) {
      switch (filterType) {
        case 'test-series':
          return 'Test Series';
        case 'live-classes':
          return 'Live Classes';
        case 'digital':
          return 'Digital Books';
        case 'previous-papers':
          return 'Previous Papers';
        default:
          return filterType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
    }
    return selectedCategory === 'All' ? 'Complete Study Material Collection' : `${selectedCategory}`;
  };

  // Filter content component to avoid duplication - Mobile Optimized
  const FilterContent = () => (
    <div className="space-y-5">
      {/* Category Filter - Mobile Optimized */}
      <div>
        <label className="block text-base font-semibold text-gray-900 mb-4">Category</label>
        <div className="grid grid-cols-1 gap-3">
          {PRODUCT_CATEGORIES.map((category) => (
            <label 
              key={category} 
              className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                selectedCategory === category 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-gray-200 bg-white hover:border-primary/30 hover:bg-primary/5'
              }`}
            >
              <Checkbox
                checked={selectedCategory === category}
                onCheckedChange={() => setSelectedCategory(category)}
                className="mr-3"
              />
              <span className="font-medium">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Subject Filter - Mobile Optimized */}
      <div>
        <label className="block text-base font-semibold text-gray-900 mb-4">Subject</label>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="h-12 text-base border-2 border-primary/30 focus:border-primary">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_SUBJECTS.map((subject) => (
              <SelectItem key={subject} value={subject} className="py-3">
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Publisher Filter - Mobile Optimized */}
      <div>
        <label className="block text-base font-semibold text-gray-900 mb-4">Publisher</label>
        <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
          <SelectTrigger className="h-12 text-base border-2 border-primary/30 focus:border-primary">
            <SelectValue placeholder="Select publisher" />
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_PUBLISHERS.map((publisher) => (
              <SelectItem key={publisher} value={publisher} className="py-3">
                {publisher}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen modern-gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="w-16 h-16 border-4 border-blue1/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading NEET JEE products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen modern-gradient-bg">
      {/* Header Section - Ultra-Vibrant Aqua Theme */}
      <div className="bg-white shadow-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getPageTitle()}
              </h1>
              <p className="text-gray-600">
                Showing {products.length} of {allProducts.length} products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="card-modern-bg border border-primary/20 rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-primary hover:text-primary/80 hover:bg-primary/10"
                >
                  Clear All
                </Button>
              </div>
              <FilterContent />
            </div>
          </div>

          {/* Mobile Filter Drawer - Improved */}
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetContent side="bottom" className="h-[85vh] max-h-[85vh] p-0 rounded-t-2xl">
              <SheetHeader className="p-4 pb-3 border-b border-primary/20 bg-white sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-lg font-bold text-gray-900">Filters</SheetTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="text-primary hover:text-primary/80 hover:bg-primary/10 px-3 py-1.5 text-sm"
                  >
                    Clear All
                  </Button>
                </div>
                {/* Drag handle */}
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-2"></div>
              </SheetHeader>
              <div className="p-4 overflow-y-auto flex-1">
                <FilterContent />
                
                {/* Apply Filters Button */}
                <div className="sticky bottom-0 bg-white pt-4 mt-6 border-t border-primary/20">
                  <Button 
                    onClick={() => setShowFilters(false)}
                    className="w-full bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white py-3"
                  >
                    Apply Filters ({products.length} products)
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar - Ultra-Vibrant Aqua Theme */}
            <div className="card-modern-bg border border-primary/20 rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="default"
                    size="default"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white border-0 px-6 py-2.5 h-11 font-semibold shadow-md"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-gradient-to-r from-primary to-blue1' : 'hover:bg-primary/10 text-primary'}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-gradient-to-r from-primary to-blue1' : 'hover:bg-primary/10 text-primary'}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 border-primary/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Products Grid - Ultra-Vibrant Aqua Theme */}
            {products.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6" 
                : "space-y-4"
              }>
                {products.map((product) => (
                  <Card 
                    key={product.id}
                    className={`group hover:shadow-xl transition-all duration-300 border border-primary/20 shadow-md card-modern-bg cursor-pointer transform hover:scale-105 overflow-hidden ${
                      viewMode === 'list' ? 'flex flex-row' : ''
                    }`}
                    onClick={() => goToProductDetail(product.id)}
                  >
                    <CardContent className={`p-0 ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                      <div className={`relative overflow-hidden bg-gradient-to-br from-lightBg to-white ${
                        viewMode === 'list' ? 'w-40 flex-shrink-0' : ''
                      }`}>
                        {viewMode === 'grid' ? (
                          // Grid view - clean image container matching FeaturedProducts
                          <div className="relative w-full h-44 overflow-hidden">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                            />
                            
                            {/* Ultra-Vibrant Aqua gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        ) : (
                          // List view - smaller fixed height
                          <div className="relative w-full h-32">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        
                        {/* Wishlist button - Ultra-Vibrant Aqua Theme */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0 bg-white/95 hover:bg-white hover:scale-105 transition-all border-primary/30 shadow-md hover:border-primary/60"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(product.id);
                            }}
                          >
                            <Heart 
                              className={`h-3 w-3 transition-colors ${
                                wishlist.includes(product.id) 
                                  ? 'text-red-500 fill-red-500' 
                                  : 'text-primary hover:text-red-500'
                              }`} 
                            />
                          </Button>
                        </div>
                      </div>

                      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>

                        <h3 className="font-bold text-sm text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                          {product.title}
                        </h3>
                        
                        {/* Ultra-Vibrant Aqua pricing section */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-lg font-black text-gray-900">
                              ₹{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice !== product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                            {product.discount && product.discount > 0 && (
                              <span className="text-xs text-green-600 font-semibold">
                                {product.discount}% off
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Ultra-Vibrant Aqua Add to Cart Button */}
                        <Button 
                          className="w-full bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 transition-all font-bold py-2 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add to cart functionality
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms.
                </p>
                <Button 
                  onClick={clearAllFilters} 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
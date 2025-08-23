import { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Eye, Grid3X3, List, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useNavigation } from '../Router';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useWishlist, useCart } from '../../services/useApi';

export function WishlistPage() {
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('added-date');

  // Use real API hooks
  const { 
    wishlist, 
    loading, 
    error, 
    actionLoading,
    removeFromWishlist, 
    refetch 
  } = useWishlist();
  
  const { addToCart } = useCart();

  const sortOptions = [
    { value: 'added-date', label: 'Recently Added' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'discount', label: 'Highest Discount' }
  ];

  // Sort wishlist items based on selected sort option
  const sortedWishlistItems = [...wishlist].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.product.price - b.product.price;
      case 'price-high':
        return b.product.price - a.product.price;
      case 'discount':
        return (b.product.discount || 0) - (a.product.discount || 0);
      case 'added-date':
      default:
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    }
  });

  const handleSelectItem = (itemId: number) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === sortedWishlistItems.length
        ? []
        : sortedWishlistItems.map(item => item.productId)
    );
  };

  const handleAddToCart = async (itemId: number | number[]) => {
    const ids = Array.isArray(itemId) ? itemId : [itemId];
    
    try {
      // Find the items in wishlist
      const items = sortedWishlistItems.filter(item => ids.includes(item.productId));
      
      if (items.length > 0) {
        // Add each item to cart
        for (const item of items) {
          await addToCart(item.productId, 1);
        }
        
        if (items.length === 1) {
          toast.success(`${items[0].product.title} added to cart!`);
        } else {
          toast.success(`${items.length} items added to cart!`);
        }
      } else {
        toast.error('Failed to add items to cart. Please try again.');
      }
    } catch (err) {
      toast.error('Failed to add items to cart. Please try again.');
    }
    
    setSelectedItems([]);
  };

  const handleRemoveFromWishlist = async (itemId: number | number[]) => {
    const ids = Array.isArray(itemId) ? itemId : [itemId];
    
    try {
      // Find the items in wishlist
      const items = sortedWishlistItems.filter(item => ids.includes(item.productId));
      
      if (items.length > 0) {
        // Remove each item from wishlist
        for (const item of items) {
          await removeFromWishlist(item.productId);
        }
        
        if (items.length === 1) {
          toast.success(`${items[0].product.title} removed from wishlist`);
        } else {
          toast.success(`${items.length} items removed from wishlist`);
        }
      } else {
        toast.error('Failed to remove items from wishlist. Please try again.');
      }
    } catch (err) {
      toast.error('Failed to remove items from wishlist. Please try again.');
    }
    
    setSelectedItems(prev => prev.filter(id => !ids.includes(id)));
  };

  const totalSavings = sortedWishlistItems.reduce((sum, item) => 
    sum + (item.product.originalPrice - item.product.price), 0
  );

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen modern-gradient-bg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen modern-gradient-bg flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading wishlist</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {error}
          </p>
          <Button 
            onClick={refetch} 
            className="bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white shadow-xl transform hover:scale-105"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen modern-gradient-bg">
      <div className="container mx-auto px-4 py-12">
        {/* Header - Ultra-Vibrant Aqua Theme */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Wishlist</h1>
          <p className="text-gray-600">
            {sortedWishlistItems.length} items · ₹{totalSavings.toLocaleString()} total savings
          </p>
        </div>

        {/* Controls - Ultra-Vibrant Aqua Theme */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-primary/20">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedItems.length === sortedWishlistItems.length && sortedWishlistItems.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-gray-700">
                {selectedItems.length > 0 ? `${selectedItems.length} selected` : 'Select all'}
              </span>
            </div>

            {selectedItems.length > 0 && (
              <div className="flex items-center space-x-3">
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(selectedItems)}
                  disabled={actionLoading === 'add'}
                  className="bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white shadow-lg transform hover:scale-105"
                >
                  {actionLoading === 'add' ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <ShoppingCart className="h-4 w-4 mr-2" />
                  )}
                  Add to Cart ({selectedItems.length})
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRemoveFromWishlist(selectedItems)}
                  disabled={actionLoading === 'remove'}
                  className="text-gray-600 hover:text-red-600 border-primary/30 hover:border-red-400"
                >
                  {actionLoading === 'remove' ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Remove ({selectedItems.length})
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44 border-primary/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center border border-primary/30 rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`rounded-r-none ${viewMode === 'grid' ? 'bg-gradient-to-r from-primary to-blue1 text-white hover:from-blue1 hover:to-blue2' : 'text-gray-600 hover:bg-primary/10 hover:text-primary'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={`rounded-l-none ${viewMode === 'list' ? 'bg-gradient-to-r from-primary to-blue1 text-white hover:from-blue1 hover:to-blue2' : 'text-gray-600 hover:bg-primary/10 hover:text-primary'}`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Wishlist Items - Ultra-Vibrant Aqua Theme */}
        {sortedWishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Discover and save books you love to keep track of them.
            </p>
            <Button 
              onClick={() => navigation.goToProducts()} 
              className="bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white shadow-xl transform hover:scale-105"
            >
              <Plus className="h-4 w-4 mr-2" />
              Browse Books
            </Button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {sortedWishlistItems.map((item) => (
                  <Card key={item.productId} className="group hover:shadow-xl transition-all duration-300 border border-primary/20 shadow-md card-modern-bg cursor-pointer transform hover:scale-105 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden bg-gradient-to-br from-lightBg to-white">
                        {/* Ultra-Vibrant Aqua themed image container */}
                        <div className="relative w-full h-44 overflow-hidden">
                          <ImageWithFallback 
                            src={item.product.image} 
                            alt={item.product.title}
                            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Ultra-vibrant aqua gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <div className="absolute top-3 right-3">
                          <Checkbox
                            checked={selectedItems.includes(item.productId)}
                            onCheckedChange={() => handleSelectItem(item.productId)}
                            className="bg-white/90 shadow-sm border-primary/20"
                          />
                        </div>

                        {item.product.stock === 0 && (
                          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 shadow-sm border border-gray-200">
                              Out of Stock
                            </span>
                          </div>
                        )}

                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => navigation.goToProductDetail(item.productId.toString())}
                            className="bg-white/90 hover:bg-white shadow-sm border-primary/20 hover:border-primary/40"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Ultra-Vibrant Aqua themed content area */}
                      <div className="p-4">
                        <h3 className="font-bold text-sm text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">{item.product.title}</h3>

                        {/* Ultra-Vibrant Aqua themed pricing */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-lg font-black text-gray-900">
                              ₹{item.product.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ₹{item.product.originalPrice.toLocaleString()}
                            </span>
                            {item.product.discount && (
                              <span className="text-xs text-green-600 font-semibold">
                                {item.product.discount}% off
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Ultra-Vibrant Aqua themed buttons */}
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 transition-all font-bold py-2 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 text-white"
                            onClick={() => handleAddToCart(item.productId)}
                            disabled={item.product.stock === 0 || actionLoading === 'add'}
                          >
                            {actionLoading === 'add' ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <ShoppingCart className="h-4 w-4 mr-2" />
                            )}
                            {item.product.stock === 0 ? 'Unavailable' : 'Add to Cart'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveFromWishlist(item.productId)}
                            disabled={actionLoading === 'remove'}
                            className="text-gray-500 hover:text-red-600 border-primary/20 hover:border-red-400"
                          >
                            {actionLoading === 'remove' ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Trash2 className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedWishlistItems.map((item) => (
                  <Card key={item.productId} className="hover:shadow-md transition-shadow border-primary/20 card-modern-bg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-6">
                        <div className="relative flex-shrink-0">
                          <ImageWithFallback 
                            src={item.product.image} 
                            alt={item.product.title}
                            className="w-24 h-32 object-cover rounded border border-primary/10"
                          />
                          <Checkbox
                            checked={selectedItems.includes(item.productId)}
                            onCheckedChange={() => handleSelectItem(item.productId)}
                            className="absolute -top-2 -left-2 bg-white shadow-sm border-primary/20"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{item.product.title}</h3>
                              <p className="text-sm text-gray-600">{item.product.author}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigation.goToProductDetail(item.productId.toString())}
                              className="ml-4 text-gray-500 hover:text-primary hover:bg-primary/10"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline space-x-3">
                              <span className="font-semibold text-gray-900">₹{item.product.price}</span>
                              <span className="text-sm text-gray-500 line-through">₹{item.product.originalPrice}</span>
                              {item.product.discount && (
                                <span className="text-sm text-green-600 font-medium">{item.product.discount}% off</span>
                              )}
                              <span className="text-sm text-gray-600">
                                Save ₹{item.product.originalPrice - item.product.price}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <Button 
                                size="sm"
                                onClick={() => handleAddToCart(item.productId)}
                                disabled={item.product.stock === 0 || actionLoading === 'add'}
                                className="bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white shadow-lg transform hover:scale-105"
                              >
                                {actionLoading === 'add' ? (
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                )}
                                {item.product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRemoveFromWishlist(item.productId)}
                                disabled={actionLoading === 'remove'}
                                className="text-gray-500 hover:text-red-600 border-primary/20 hover:border-red-400"
                              >
                                {actionLoading === 'remove' ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

          </>
        )}
      </div>
    </div>
  );
}
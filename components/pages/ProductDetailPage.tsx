import { useState } from 'react';
import { Star, Heart, ShoppingCart, Share2, ArrowLeft, Truck, Shield, RotateCcw, Award, BookOpen, Calendar, User, Building, CheckCircle, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useRouter, useNavigation } from '../Router';
import { useAuth } from '../auth/AuthContext';
import { useProduct, useCart, useWishlist } from '../../services/useApi';

export function ProductDetailPage() {
  const { params } = useRouter();
  const { goToProducts } = useNavigation();
  const { user } = useAuth();
  
  // Get product ID from URL params
  const productId = params.id ? parseInt(params.id) : null;
  
  // Fetch product data using real API - only if we have a valid ID
  const { data: product, loading, error } = useProduct(productId && productId > 0 ? productId : 0);
  
  // Cart functionality
  const { addToCart, actionLoading } = useCart();
  
  // Wishlist functionality
  const { addToWishlist, removeFromWishlist, isInWishlist, actionLoading: wishlistActionLoading } = useWishlist();
  
  // Local state
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  // Handle quantity changes
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    if (!product?.id) {
      toast.error('No product ID available');
      return;
    }
    
    try {
      await addToCart(product.id, quantity);
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add item to cart. Please try again.');
    }
  };

  // Handle add to wishlist
  const handleAddToWishlist = async () => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }
    
    if (!product?.id) {
      toast.error('No product ID available');
      return;
    }
    
    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id);
        toast.success(`${product.title} removed from wishlist`);
      } else {
        await addToWishlist(product.id);
        toast.success(`${product.title} added to wishlist`);
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
      toast.error('Failed to update wishlist. Please try again.');
    }
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title || 'Product',
        text: product?.description || '',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen modern-gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="w-16 h-16 border-4 border-blue1/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product || !productId || productId <= 0) {
    return (
      <div className="min-h-screen modern-gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Product not found
          </h3>
          <p className="text-gray-600 mb-4">
            {!productId || productId <= 0 ? 'Invalid product ID.' : (error || 'The product you are looking for does not exist.')}
          </p>
          <Button
            onClick={() => goToProducts()}
            className="bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen modern-gradient-bg">
      {/* Header with back button */}
      <div className="bg-white shadow-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => goToProducts()}
            className="text-primary hover:text-primary/80 hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/20">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-contain p-8"
              />
              
              {/* Product badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.bestseller && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                    <Award className="h-3 w-3 mr-1" />
                    Bestseller
                  </Badge>
                )}
                {product.discount && product.discount > 0 && (
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>

              {/* Wishlist button */}
              <Button
                size="sm"
                variant="outline"
                className="absolute top-4 right-4 w-10 h-10 p-0 bg-white/95 hover:bg-white border-primary/30 shadow-md"
                onClick={handleAddToWishlist}
                disabled={wishlistActionLoading === 'add' || wishlistActionLoading === 'remove'}
              >
                <Heart 
                  className={`h-4 w-4 transition-colors ${
                    isInWishlist(product.id) 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-primary hover:text-red-500'
                  }`} 
                />
              </Button>
            </div>

            {/* Share button */}
            <Button
              variant="outline"
              className="w-full border-primary/30 text-primary hover:bg-primary/10"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Product
            </Button>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product title and basic info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                by {product.author}
              </p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 0)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="bg-gradient-to-r from-primary/5 to-blue1/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-black text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice !== product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discount && product.discount > 0 && (
                  <Badge className="bg-green-500 text-white border-0 text-sm">
                    {product.discount}% off
                  </Badge>
                )}
              </div>

              {/* Stock status */}
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-green-600 font-medium">
                  {product.stock && product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Quantity selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 p-0 border-primary/30"
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  min="1"
                  max={product.stock || 1}
                  className="w-20 text-center border-primary/30"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= (product.stock || 1)}
                  className="w-10 h-10 p-0 border-primary/30"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white py-3 text-lg font-bold"
                onClick={handleAddToCart}
                disabled={!product.stock || product.stock === 0 || actionLoading === 'add'}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {actionLoading === 'add' ? 'Adding...' : !user ? 'Login to Add' : 'Add to Cart'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white py-3"
                disabled={!product.stock || product.stock === 0}
              >
                Buy Now
              </Button>
            </div>

            {/* Product features */}
            <div className="bg-white rounded-xl p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Category: {product.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>Author: {product.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" />
                  <span>Publisher: {product.publisher}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Year: {product.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white border border-primary/20">
              <TabsTrigger value="description" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Description
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Features
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="shipping" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Shipping
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    )) || (
                      <li className="text-gray-500">No features listed</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
                  
                  {/* Add review form */}
                  {user && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Write a Review</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Rating</label>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 cursor-pointer ${
                                  star <= reviewRating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                onClick={() => setReviewRating(star)}
                              />
                            ))}
                          </div>
                        </div>
                        <Textarea
                          placeholder="Write your review..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          className="border-primary/30"
                        />
                        <Button className="bg-primary hover:bg-blue1 text-white">
                          <Send className="h-4 w-4 mr-2" />
                          Submit Review
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Sample reviews */}
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">John Doe</div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Excellent book! Very comprehensive and well-structured. Perfect for exam preparation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-gray-900">Free Shipping</div>
                        <div className="text-sm text-gray-600">On orders above ₹499</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-gray-900">Secure Payment</div>
                        <div className="text-sm text-gray-600">100% secure payment processing</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <RotateCcw className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium text-gray-900">Easy Returns</div>
                        <div className="text-sm text-gray-600">7-day return policy</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
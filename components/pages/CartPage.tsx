import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  ArrowRight, 
  Package, 
  Truck, 
  Shield, 
  Tag,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useNavigation } from '../Router';
import { useCart, useWishlist, useCouponValidation } from '../../services/useApi';
import { CartItem } from '../../services/types';

export function CartPage() {
  const navigation = useNavigation();
  const { 
    cart, 
    loading, 
    error, 
    actionLoading,
    updateQuantity, 
    removeFromCart, 
    clearCart,
    totalItems,
    totalPrice,
    totalOriginalPrice,
    totalSavings
  } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { validateCoupon, loading: couponLoading } = useCouponValidation();

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const shipping = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice - couponDiscount + shipping;

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await updateQuantity(productId, newQuantity);
      toast.success('Quantity updated successfully');
    } catch (err) {
      toast.error('Failed to update quantity. Please try again.');
    }
  };

  const handleRemoveItem = async (productId: number) => {
    try {
      const item = cart.find(cartItem => cartItem.productId === productId);
      await removeFromCart(productId);
      if (item) {
        toast.success(`${item.product.title} removed from cart`);
      }
    } catch (err) {
      toast.error('Failed to remove item from cart. Please try again.');
    }
  };

  const handleMoveToWishlist = async (item: CartItem) => {
    try {
      await addToWishlist(item.productId);
      await removeFromCart(item.productId);
      toast.success(`${item.product.title} moved to wishlist`);
    } catch (err) {
      toast.error('Failed to move item to wishlist. Please try again.');
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      const response = await validateCoupon(couponCode, totalPrice);
      if (response.data.valid) {
        setCouponDiscount(response.data.discount);
        setCouponMessage(response.data.message);
        setCouponApplied(true);
        toast.success(response.data.message);
      } else {
        setCouponDiscount(0);
        setCouponMessage(response.data.message);
        setCouponApplied(false);
        toast.error(response.data.message);
      }
    } catch (err) {
      setCouponDiscount(0);
      setCouponMessage('Failed to validate coupon');
      setCouponApplied(false);
      toast.error('Failed to apply coupon. Please try again.');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
    setCouponMessage('');
    setCouponApplied(false);
    toast.info('Coupon removed.');
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart();
        toast.success('Cart cleared successfully!');
      } catch (err) {
        toast.error('Failed to clear cart. Please try again.');
      }
    }
  };

  const handleCheckout = () => {
    navigation.goToCheckout();
  };

  const handleContinueShopping = () => {
    navigation.goToProducts();
  };

  if (loading) {
    return (
      <div className="min-h-screen modern-gradient-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="w-16 h-16 border-4 border-blue1/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Your Cart</h3>
            <p className="text-gray-600">Fetching your selected items...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen modern-gradient-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to Load Cart</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen modern-gradient-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
              <ShoppingCart className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-xl text-gray-600 mb-8">Add some amazing study materials to get started!</p>
            <Button 
              size="lg" 
              onClick={handleContinueShopping} 
              className="bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white shadow-xl transform hover:scale-105"
            >
              <Package className="h-5 w-5 mr-2" />
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen modern-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header - Ultra-Vibrant Aqua Theme */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Ultra-Vibrant Aqua Theme */}
          <div className="lg:col-span-2 space-y-4">
            {/* Clear Cart Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Items</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearCart}
                  disabled={actionLoading === 'clear'}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>

            {cart.map((item) => (
              <Card key={item.productId} className="overflow-hidden card-modern-bg border border-primary/20">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-24 h-32 bg-lightBg rounded-lg overflow-hidden border border-primary/10">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                            {item.product.title}
                          </h3>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.productId)}
                          disabled={actionLoading === 'remove'}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price and Quantity Controls - Ultra-Vibrant Aqua Theme */}
                      <div className="cart-controls-mobile flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-primary/30 rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1 || actionLoading === 'update'}
                              className="h-8 w-8 p-0 hover:bg-primary/10 text-primary"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium min-w-[3ch] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                              disabled={actionLoading === 'update'}
                              className="h-8 w-8 p-0 hover:bg-primary/10 text-primary"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Move to Wishlist */}
                          {!isInWishlist(item.productId) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMoveToWishlist(item)}
                              className="cart-save-later-mobile text-primary hover:text-primary/80 hover:bg-primary/10 px-3 py-2 text-sm whitespace-nowrap"
                            >
                              <Heart className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>Save for Later</span>
                            </Button>
                          )}
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">
                              ₹{(item.product.price * item.quantity).toLocaleString()}
                            </span>
                            {item.product.originalPrice > item.product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{(item.product.originalPrice * item.quantity).toLocaleString()}
                              </span>
                            )}
                          </div>
                          {item.product.originalPrice > item.product.price && (
                            <p className="text-sm text-green-600">
                              You save ₹{((item.product.originalPrice - item.product.price) * item.quantity).toLocaleString()}
                            </p>
                          )}
                          {item.product.stock && item.product.stock < 10 && (
                            <p className="text-sm text-red-600">
                              Only {item.product.stock} left!
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary - Ultra-Vibrant Aqua Theme */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="card-modern-bg border border-primary/20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                  
                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coupon Code
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={couponApplied}
                        className="border-primary/30 focus:border-primary"
                      />
                      {couponApplied ? (
                        <Button
                          variant="outline"
                          onClick={handleRemoveCoupon}
                          className="text-red-600 hover:text-red-700 border-red-200"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleApplyCoupon}
                          disabled={couponLoading || !couponCode.trim()}
                          className="whitespace-nowrap bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white"
                        >
                          <Tag className="h-4 w-4 mr-1" />
                          Apply
                        </Button>
                      )}
                    </div>
                    {couponMessage && (
                      <p className={`text-sm mt-2 flex items-center ${
                        couponApplied ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {couponApplied ? (
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                        ) : (
                          <AlertCircle className="h-4 w-4 mr-1" />
                        )}
                        {couponMessage}
                      </p>
                    )}
                  </div>

                  <Separator className="mb-4" />

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    {totalSavings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Product Savings</span>
                        <span>-₹{totalSavings.toLocaleString()}</span>
                      </div>
                    )}
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Coupon Discount</span>
                        <span>-₹{couponDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `₹${shipping}`
                        )}
                      </span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Benefits - Ultra-Vibrant Aqua Theme */}
                  <div className="bg-primary/5 rounded-lg p-4 mb-6 border border-primary/10">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-primary">
                        <Shield className="h-4 w-4 mr-2" />
                        100% Authentic Books
                      </div>
                      <div className="flex items-center text-sm text-primary">
                        <Truck className="h-4 w-4 mr-2" />
                        {shipping === 0 ? 'Free Delivery' : 'Fast Delivery Available'}
                      </div>
                      <div className="flex items-center text-sm text-primary">
                        <Package className="h-4 w-4 mr-2" />
                        Secure Packaging
                      </div>
                    </div>
                    {totalPrice < 500 && (
                      <p className="text-sm text-primary mt-3 p-2 bg-primary/10 rounded border border-primary/20">
                        Add ₹{(500 - totalPrice).toLocaleString()} more for FREE delivery!
                      </p>
                    )}
                  </div>

                  {/* Action Buttons - Ultra-Vibrant Aqua Theme */}
                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white shadow-xl transform hover:scale-105"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={handleContinueShopping}
                    >
                      Continue Shopping
                    </Button>
                  </div>

                  {/* Popular Coupons - Ultra-Vibrant Aqua Theme */}
                  <div className="mt-6 pt-6 border-t border-primary/20">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Coupons</h3>
                    <div className="space-y-2">
                      <div className="text-xs bg-green-50 p-2 rounded border border-green-200">
                        <span className="font-medium text-green-800">EDU10</span>
                        <span className="text-green-600"> - 10% off on orders above ₹300</span>
                      </div>
                      <div className="text-xs bg-primary/5 p-2 rounded border border-primary/20">
                        <span className="font-medium text-primary">FIRST20</span>
                        <span className="text-blue1"> - 20% off on orders above ₹500</span>
                      </div>
                      <div className="text-xs bg-blue2/5 p-2 rounded border border-blue2/20">
                        <span className="font-medium text-blue2">STUDENT15</span>
                        <span className="text-blue3"> - 15% student discount above ₹250</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
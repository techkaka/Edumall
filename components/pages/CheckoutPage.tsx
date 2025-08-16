import React, { useState, useEffect } from 'react';
import { 
  CreditCard,
  MapPin,
  Plus,
  Edit,
  Trash2,
  ShoppingBag,
  Shield,
  Truck,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  X,
  Smartphone,
  Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useNavigation } from '../Router';
import { useCheckout } from '../../services/useApi';
import { Address } from '../../services/types';

interface AddressFormData {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

const initialAddressForm: AddressFormData = {
  fullName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
  phone: ''
};

const paymentMethods = [
  { id: 'upi', label: 'UPI Payment', icon: '📱', description: 'Pay using any UPI app - PhonePe, GPay, Paytm' },
  { id: 'card', label: 'Credit/Debit Card', icon: '💳', description: 'Visa, MasterCard, RuPay accepted' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏦', description: 'All major banks supported' },
  { id: 'wallet', label: 'Digital Wallet', icon: '💰', description: 'Paytm, PhonePe, Google Pay, Amazon Pay' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', description: 'Pay when you receive (₹50 extra)' }
];

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry'
];

export function CheckoutPage() {
  const navigation = useNavigation();
  const {
    cart,
    clearCart,
    cartLoading,
    addresses,
    selectedAddress,
    setSelectedAddress,
    paymentMethod,
    setPaymentMethod,
    couponCode,
    setCouponCode,
    couponDiscount,
    couponMessage,
    applyCoupon,
    removeCoupon,
    couponLoading,
    subtotal,
    shipping,
    total,
    savings,
    placeOrder,
    orderLoading,
    orderError,
    refetchAddresses
  } = useCheckout();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState<AddressFormData>(initialAddressForm);
  const [addressFormError, setAddressFormError] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'address' | 'payment' | 'review'>('address');

  // Remove automatic redirect - let users decide when to leave checkout
  // The cart will load via useCheckout hook, no need for premature redirects

  // Set default address
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]);
    }
  }, [addresses, selectedAddress, setSelectedAddress]);

  const handleAddressFormChange = (field: keyof AddressFormData, value: string) => {
    setAddressForm(prev => ({ ...prev, [field]: value }));
    setAddressFormError(''); // Clear error when user types
  };

  const validateAddressForm = (): boolean => {
    const required = ['fullName', 'addressLine1', 'city', 'state', 'pincode', 'phone'];
    for (const field of required) {
      if (!addressForm[field as keyof AddressFormData].trim()) {
        setAddressFormError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Validate phone number (basic)
    if (!/^\+?[\d\s\-()]{10,}$/.test(addressForm.phone)) {
      setAddressFormError('Please enter a valid phone number');
      return false;
    }

    // Validate pincode
    if (!/^\d{6}$/.test(addressForm.pincode)) {
      setAddressFormError('Please enter a valid 6-digit pincode');
      return false;
    }

    return true;
  };

  const handleAddAddress = () => {
    if (validateAddressForm()) {
      const newAddress: Address = {
        fullName: addressForm.fullName.trim(),
        addressLine1: addressForm.addressLine1.trim(),
        addressLine2: addressForm.addressLine2.trim(),
        city: addressForm.city.trim(),
        state: addressForm.state.trim(),
        pincode: addressForm.pincode.trim(),
        phone: addressForm.phone.trim()
      };

      // For demo, we'll just add to local state
      // In real app, this would call addAddress API
      setSelectedAddress(newAddress);
      setAddressForm(initialAddressForm);
      setShowAddressForm(false);
      refetchAddresses();
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const order = await placeOrder();
      
      // Clear cart after successful order
      await clearCart();
      
      // Navigate to order success page with order ID
      navigation.goToOrderTracking(order.data.id);
    } catch (error) {
      // Error is already handled by useCheckout hook via orderError state
    }
  };

  const steps = [
    { id: 'address', label: 'Shipping Address', completed: !!selectedAddress },
    { id: 'payment', label: 'Payment Method', completed: !!paymentMethod },
    { id: 'review', label: 'Review & Place Order', completed: false }
  ];

  // Show loading state while cart is loading
  if (cartLoading) {
    return (
      <div className="min-h-screen modern-gradient-bg flex items-center justify-center">
        <div className="text-center p-8">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="w-16 h-16 border-4 border-blue1/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Checkout</h3>
          <p className="text-gray-600">Preparing your order...</p>
        </div>
      </div>
    );
  }

  // Show empty cart message only after cart has loaded and is confirmed empty
  if (!cartLoading && cart.length === 0) {
    return (
      <div className="min-h-screen modern-gradient-bg flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
            <ShoppingBag className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-xl text-gray-600 mb-8">Add some amazing study materials to proceed with checkout</p>
          <Button 
            onClick={() => navigation.goToProducts()} 
            className="bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white shadow-xl transform hover:scale-105"
            size="lg"
          >
            <Package className="h-5 w-5 mr-2" />
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen modern-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header - Ultra-Vibrant Aqua Theme */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              onClick={() => navigation.goToCart()}
              className="text-gray-600 hover:text-primary hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Cart
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Secure Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order securely in 3 simple steps</p>
        </div>

        {/* Progress Steps - Ultra-Vibrant Aqua Theme */}
        <div className="mb-12">
          <div className="flex items-center justify-center max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : currentStep === step.id 
                        ? 'bg-gradient-to-r from-primary to-blue1 border-primary text-white' 
                        : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {step.completed ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium text-center ${
                    step.completed || currentStep === step.id 
                      ? 'text-gray-900' 
                      : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-6 rounded transition-all ${
                    steps[index + 1].completed || (currentStep !== 'address' && index === 0) || (currentStep === 'review' && index === 1)
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Shipping Address - Ultra-Vibrant Aqua Theme */}
            <Card className="card-modern-bg border border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue1 rounded-full flex items-center justify-center mr-3">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                {addresses.length > 0 ? (
                  <div className="space-y-4">
                    <RadioGroup
                      value={selectedAddress ? JSON.stringify(selectedAddress) : ''}
                      onValueChange={(value) => setSelectedAddress(JSON.parse(value))}
                    >
                      {addresses.map((address, index) => (
                        <div key={index} className="flex items-start space-x-4 p-5 border-2 border-primary/20 rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all min-h-[120px] touch-manipulation">
                          <RadioGroupItem
                            value={JSON.stringify(address)}
                            id={`address-${index}`}
                            className="mt-2 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <label htmlFor={`address-${index}`} className="cursor-pointer block">
                              <div className="font-bold text-gray-900 text-lg mb-2">{address.fullName}</div>
                              <div className="text-gray-600 text-base mt-1 leading-relaxed">
                                <div className="mb-1">{address.addressLine1}</div>
                                {address.addressLine2 && <div className="mb-1">{address.addressLine2}</div>}
                                <div className="mb-1">{address.city}, {address.state} - {address.pincode}</div>
                                <div className="text-primary font-semibold text-base">📞 {address.phone}</div>
                              </div>
                            </label>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>

                    <Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Address
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-lg font-bold text-gray-900">Add New Address</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 px-1">
                          <div>
                            <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name *</Label>
                            <Input
                              id="fullName"
                              value={addressForm.fullName}
                              onChange={(e) => handleAddressFormChange('fullName', e.target.value)}
                              placeholder="Enter full name"
                              className="border-primary/30 focus:border-primary h-12"
                            />
                          </div>
                          <div>
                            <Label htmlFor="addressLine1" className="text-gray-700 font-medium">Address Line 1 *</Label>
                            <Input
                              id="addressLine1"
                              value={addressForm.addressLine1}
                              onChange={(e) => handleAddressFormChange('addressLine1', e.target.value)}
                              placeholder="House/Flat no, Building, Street"
                              className="border-primary/30 focus:border-primary h-12"
                            />
                          </div>
                          <div>
                            <Label htmlFor="addressLine2" className="text-gray-700 font-medium">Address Line 2</Label>
                            <Input
                              id="addressLine2"
                              value={addressForm.addressLine2}
                              onChange={(e) => handleAddressFormChange('addressLine2', e.target.value)}
                              placeholder="Area, Landmark (Optional)"
                              className="border-primary/30 focus:border-primary h-12"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="city" className="text-gray-700 font-medium">City *</Label>
                              <Input
                                id="city"
                                value={addressForm.city}
                                onChange={(e) => handleAddressFormChange('city', e.target.value)}
                                placeholder="City"
                                className="border-primary/30 focus:border-primary h-12"
                              />
                            </div>
                            <div>
                              <Label htmlFor="pincode" className="text-gray-700 font-medium">Pincode *</Label>
                              <Input
                                id="pincode"
                                value={addressForm.pincode}
                                onChange={(e) => handleAddressFormChange('pincode', e.target.value)}
                                placeholder="123456"
                                maxLength={6}
                                className="border-primary/30 focus:border-primary h-12"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="state" className="text-gray-700 font-medium">State *</Label>
                            <select
                              id="state"
                              value={addressForm.state}
                              onChange={(e) => handleAddressFormChange('state', e.target.value)}
                              className="w-full h-12 px-3 border-2 border-primary/30 rounded-lg focus:outline-none focus:border-primary transition-colors bg-white"
                            >
                              <option value="">Select State</option>
                              {indianStates.map(state => (
                                <option key={state} value={state}>{state}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number *</Label>
                            <Input
                              id="phone"
                              value={addressForm.phone}
                              onChange={(e) => handleAddressFormChange('phone', e.target.value)}
                              placeholder="+91-9876543210"
                              className="border-primary/30 focus:border-primary h-12"
                            />
                          </div>

                          {addressFormError && (
                            <div className="text-red-600 text-sm flex items-center bg-red-50 p-3 rounded-lg border border-red-200">
                              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                              {addressFormError}
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                              onClick={handleAddAddress}
                              className="flex-1 bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white shadow-lg transform hover:scale-105 h-12"
                            >
                              Add Address
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setShowAddressForm(false)}
                              className="border-gray-300 text-gray-600 hover:bg-gray-50 h-12 sm:w-24"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {selectedAddress && (
                      <Button
                        onClick={() => setCurrentStep('payment')}
                        className="w-full bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white shadow-lg transform hover:scale-105"
                        size="lg"
                      >
                        Continue to Payment
                        <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-gray-600 mb-6 text-lg">No addresses found. Please add a shipping address.</p>
                    <Button 
                      onClick={() => setShowAddressForm(true)} 
                      className="bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white shadow-lg transform hover:scale-105"
                      size="lg"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add Address
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Step 2: Payment Method - Ultra-Vibrant Aqua Theme */}
            {currentStep !== 'address' && (
              <Card className="card-modern-bg border border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue1 rounded-full flex items-center justify-center mr-3">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-4 p-4 border-2 border-primary/20 rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all">
                        <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                        <div className="flex-1">
                          <label htmlFor={method.id} className="cursor-pointer flex items-center">
                            <span className="text-2xl mr-4">{method.icon}</span>
                            <div>
                              <div className="font-semibold text-gray-900">{method.label}</div>
                              <div className="text-gray-600 text-sm mt-1">{method.description}</div>
                            </div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>

                  {paymentMethod && (
                    <Button
                      onClick={() => setCurrentStep('review')}
                      className="w-full mt-6 bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white shadow-lg transform hover:scale-105"
                      size="lg"
                    >
                      Continue to Review
                      <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review Order - Ultra-Vibrant Aqua Theme */}
            {currentStep === 'review' && (
              <Card className="card-modern-bg border border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue1 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    Review Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Items ({cart.length})</h3>
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.productId} className="flex gap-4 p-4 bg-lightBg rounded-xl border border-primary/10">
                            <div className="w-20 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-primary/10">
                              <ImageWithFallback
                                src={item.product.image}
                                alt={item.product.title}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 line-clamp-2 mb-1">{item.product.title}</h4>
                              <p className="text-gray-600 text-sm mb-2">by {item.product.author}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Qty: {item.quantity}</span>
                                <span className="font-bold text-primary text-lg">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Address */}
                    {selectedAddress && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 text-lg">Delivery Address</h3>
                        <div className="bg-lightBg p-6 rounded-xl border border-primary/20">
                          <div className="font-semibold text-gray-900 text-lg">{selectedAddress.fullName}</div>
                          <div className="text-gray-600 mt-2 leading-relaxed">
                            {selectedAddress.addressLine1}
                            {selectedAddress.addressLine2 && `, ${selectedAddress.addressLine2}`}
                            <br />
                            {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                            <br />
                            <span className="text-primary font-medium">📞 {selectedAddress.phone}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payment Method */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Payment Method</h3>
                      <div className="bg-lightBg p-6 rounded-xl border border-primary/20">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">
                            {paymentMethods.find(m => m.id === paymentMethod)?.icon}
                          </span>
                          <span className="font-semibold text-gray-900">
                            {paymentMethods.find(m => m.id === paymentMethod)?.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {orderError && (
                      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                        <div className="flex items-center text-red-800">
                          <AlertCircle className="h-6 w-6 mr-3" />
                          <span className="font-semibold text-lg">Order Failed</span>
                        </div>
                        <p className="text-red-700 mt-2">{orderError}</p>
                      </div>
                    )}

                    <Button
                      onClick={handlePlaceOrder}
                      disabled={orderLoading}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl transform hover:scale-105"
                      size="lg"
                    >
                      {orderLoading ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Placing Order...
                        </div>
                      ) : (
                        <>
                          🎉 Place Order • ₹{total.toLocaleString()}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar - Ultra-Vibrant Aqua Theme */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="card-modern-bg border border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                        <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                      </div>
                      {savings > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Product Savings</span>
                          <span className="font-semibold">-₹{savings.toLocaleString()}</span>
                        </div>
                      )}
                      {couponDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Coupon Discount</span>
                          <span className="font-semibold">-₹{couponDiscount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                          {shipping === 0 ? 'FREE' : `₹${shipping}`}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{total.toLocaleString()}</span>
                    </div>

                    {/* Coupon Code */}
                    <div className="space-y-3">
                      <Label className="text-gray-700 font-medium">Apply Coupon Code</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="border-primary/30 focus:border-primary"
                        />
                        {couponDiscount > 0 ? (
                          <Button variant="outline" onClick={removeCoupon} className="border-red-300 text-red-600 hover:bg-red-50">
                            <X className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            onClick={applyCoupon}
                            disabled={couponLoading || !couponCode.trim()}
                            className="bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white whitespace-nowrap"
                          >
                            Apply
                          </Button>
                        )}
                      </div>
                      {couponMessage && (
                        <p className={`text-sm flex items-center ${couponDiscount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {couponDiscount > 0 ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <AlertCircle className="h-4 w-4 mr-1" />}
                          {couponMessage}
                        </p>
                      )}
                    </div>

                    {/* Popular Coupons */}
                    <div className="space-y-3">
                      <h4 className="text-gray-700 font-medium text-sm">Popular Coupons</h4>
                      <div className="space-y-2">
                        <div className="text-xs bg-green-50 p-3 rounded-lg border border-green-200">
                          <span className="font-bold text-green-800">EDU10</span>
                          <span className="text-green-600"> - 10% off on orders above ₹300</span>
                        </div>
                        <div className="text-xs bg-primary/5 p-3 rounded-lg border border-primary/20">
                          <span className="font-bold text-primary">FIRST20</span>
                          <span className="text-blue1"> - 20% off on orders above ₹500</span>
                        </div>
                        <div className="text-xs bg-blue2/5 p-3 rounded-lg border border-blue2/20">
                          <span className="font-bold text-blue2">STUDENT15</span>
                          <span className="text-blue3"> - 15% student discount above ₹250</span>
                        </div>
                      </div>
                    </div>

                    {/* Security Features */}
                    <div className="pt-4 border-t border-primary/20">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Shield className="h-5 w-5 mr-3 text-green-500" />
                          <span>256-bit SSL secure payment</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Truck className="h-5 w-5 mr-3 text-primary" />
                          <span>{shipping === 0 ? 'Free delivery nationwide' : 'Fast delivery available'}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Package className="h-5 w-5 mr-3 text-blue2" />
                          <span>Secure packaging & authentic books</span>
                        </div>
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
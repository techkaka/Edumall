import { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Calendar, User, Eye, Download, MessageCircle, CheckCircle2, Package, Loader2, ArrowRight, Clock, Truck, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useNavigation, useRouter } from '../Router';
import { useOrders, useOrder } from '../../services/useApi';
import { getStatusColor, getStatusIcon } from './order-tracking/utils';
import { OrderTimeline } from './order-tracking/OrderTimeline';
import { OrderItems } from './order-tracking/OrderItems';
import { Order } from '../../services/types';

export function OrderTrackingPage() {
  const navigation = useNavigation();
  const { params } = useRouter();
  const [searchOrderId, setSearchOrderId] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  // Fetch all user orders
  const { data: orders, loading: ordersLoading, error: ordersError } = useOrders();
  
  // Fetch specific order details if selected
  const { data: currentOrder, loading: orderLoading, error: orderError } = useOrder(selectedOrderId);

  // Set initial selected order
  useEffect(() => {
    if (orders && orders.length > 0 && !selectedOrderId) {
      // Use order_number if available, otherwise fall back to id
      const firstOrder = orders[0];
      setSelectedOrderId(firstOrder.order_number || firstOrder.id);
    }
  }, [orders, selectedOrderId]);

  // Check if user came from checkout with a new order
  useEffect(() => {
    if (params?.orderId) {
      setShowOrderSuccess(true);
      setSelectedOrderId(params.orderId);
      // Hide success message after 10 seconds
      const timer = setTimeout(() => {
        setShowOrderSuccess(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [params]);

  const handleSearchOrder = () => {
    if (searchOrderId && orders?.some(order => 
      order.order_number === searchOrderId || order.id === searchOrderId
    )) {
      setSelectedOrderId(searchOrderId);
    }
  };

  // Helper function to get order progress percentage
  const getOrderProgress = (order: Order) => {
    const statusProgress = {
      'pending': 10,
      'confirmed': 25,
      'processing': 50,
      'shipped': 75,
      'delivered': 100,
      'cancelled': 0
    };
    return statusProgress[order.status] || 0;
  };

  // Helper function to get estimated delivery date
  const getEstimatedDelivery = (order: Order) => {
    const orderDate = new Date(order.createdAt);
    const estimatedDate = new Date(orderDate.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days from order date
    return estimatedDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Helper function to get current location based on status
  const getCurrentLocation = (order: Order) => {
    const locationMap = {
      'pending': 'Order Processing Center',
      'confirmed': 'Warehouse',
      'processing': 'Packaging Center',
      'shipped': 'In Transit',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    return locationMap[order.status] || 'Processing';
  };

  // Helper function to get display order number
  const getDisplayOrderNumber = (order: Order) => {
    return order.order_number || `#${order.id}`;
  };

  // Loading state
  if (ordersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Loading Orders</h2>
          <p className="text-sm text-gray-600">Fetching your order history...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (ordersError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto">
          <div className="bg-red-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Orders</h2>
          <p className="text-sm text-gray-600 mb-4">{ordersError}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // No orders state
  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-sm mx-auto">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h1>
            <p className="text-gray-600 mb-6">Start your reading journey by exploring our collection.</p>
            <Button 
              onClick={() => navigation.goToHome()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        {/* Order Success Banner */}
        {showOrderSuccess && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-green-500 rounded-full p-2">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-green-800 mb-1 text-center">Order Placed Successfully!</h2>
            <p className="text-sm text-green-700 mb-3 text-center">
              Your order {params?.orderId || selectedOrderId} has been confirmed.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                onClick={() => setShowOrderSuccess(false)}
              >
                <Package className="h-3 w-3 mr-1" />
                Track Order
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => navigation.goToHome()}
                className="text-sm"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Track Your Order</h1>
          <p className="text-sm text-gray-600">Get real-time updates on your book orders</p>
        </div>

        {/* Order Search */}
        <Card className="shadow-sm border mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                  placeholder="Enter Order Number (e.g., A1B2C3D4E5F6)"
                  className="pl-9 py-2 text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchOrder()}
                />
              </div>
              <Button 
                onClick={handleSearchOrder} 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm"
              >
                <Search className="h-4 w-4 mr-1" />
                Track
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-4">
          {/* Order History Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm border sticky top-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recent Orders</CardTitle>
                <CardDescription className="text-xs">Your order history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                        selectedOrderId === (order.order_number || order.id)
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedOrderId(order.order_number || order.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 rounded-full ${
                            selectedOrderId === (order.order_number || order.id) ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm text-gray-900">{getDisplayOrderNumber(order)}</h3>
                            <p className="text-xs text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(order.status)} text-xs px-2 py-0.5`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                        <div>
                          <p className="font-medium text-gray-900">Items</p>
                          <p className="text-gray-600">{order.items.length} books</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Total</p>
                          <p className="text-gray-600">₹{order.total.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Progress</span>
                          <span className="text-xs font-medium text-blue-600">{getOrderProgress(order)}%</span>
                        </div>
                        <Progress value={getOrderProgress(order)} className="h-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details Main Content */}
          <div className="lg:col-span-3">
            {currentOrder && !orderLoading ? (
              <div className="space-y-4">
                {/* Order Overview */}
                <Card className="shadow-sm border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-gray-900">Order {getDisplayOrderNumber(currentOrder)}</CardTitle>
                        <CardDescription className="text-sm">
                          Placed on {new Date(currentOrder.createdAt).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })} • {currentOrder.items.length} items
                        </CardDescription>
                      </div>
                      <Badge className={`${getStatusColor(currentOrder.status)} text-sm px-3 py-1`}>
                        {currentOrder.status.charAt(0).toUpperCase() + currentOrder.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid lg:grid-cols-3 gap-4">
                      <div className="lg:col-span-2">
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm text-gray-900">Delivery Progress</span>
                            <span className="text-sm font-semibold text-blue-600">{getOrderProgress(currentOrder)}%</span>
                          </div>
                          <Progress value={getOrderProgress(currentOrder)} className="h-2" />
                          <div className="flex items-center justify-between mt-1 text-xs text-gray-600">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Order Placed
                            </span>
                            <span className="flex items-center">
                              {currentOrder.status === 'delivered' ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3 mr-1 text-green-600" />
                                  Delivered
                                </>
                              ) : (
                                <>
                                  <Truck className="h-3 w-3 mr-1 text-blue-600" />
                                  In Progress
                                </>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Delivery Information */}
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-semibold mb-2 flex items-center text-sm text-gray-900">
                              <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                              Delivery Address
                            </h4>
                            <p className="text-xs text-gray-700 leading-relaxed">
                              {currentOrder.shippingAddress.fullName}<br />
                              {currentOrder.shippingAddress.addressLine1}<br />
                              {currentOrder.shippingAddress.addressLine2 && `${currentOrder.shippingAddress.addressLine2}<br />`}
                              {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} - {currentOrder.shippingAddress.pincode}<br />
                              <span className="flex items-center mt-1">
                                <Phone className="h-3 w-3 mr-1" />
                                {currentOrder.shippingAddress.phone}
                              </span>
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-semibold mb-2 flex items-center text-sm text-gray-900">
                              <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                              Delivery Timeline
                            </h4>
                            <p className="text-xs text-gray-700 mb-1">
                              <span className="font-medium">Estimated:</span> {getEstimatedDelivery(currentOrder)}
                            </p>
                            {currentOrder.status === 'delivered' && (
                              <p className="text-xs text-green-600 font-medium">
                                <span className="font-medium">Delivered:</span> {new Date(currentOrder.updatedAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-blue-50 p-3 border border-blue-200 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center text-sm text-gray-900">
                            <User className="h-4 w-4 mr-1 text-blue-600" />
                            Payment Details
                          </h4>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-sm text-gray-900">Method: {currentOrder.paymentMethod}</p>
                              <p className="text-xs text-gray-600">Status: {currentOrder.paymentStatus}</p>
                            </div>
                            <Badge className={`${
                              currentOrder.paymentStatus === 'paid' 
                                ? 'bg-green-100 text-green-800 border-green-300' 
                                : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                            } text-xs px-2 py-0.5`}>
                              {currentOrder.paymentStatus.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-sm text-gray-900">Current Location</h4>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                          <p className="font-semibold text-blue-700 text-sm">{getCurrentLocation(currentOrder)}</p>
                          <p className="text-xs text-gray-600 mt-1">Last updated: {new Date(currentOrder.updatedAt).toLocaleString()}</p>
                        </div>

                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start py-2 text-sm border hover:border-blue-300 hover:bg-blue-50">
                            <Eye className="h-3 w-3 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline" className="w-full justify-start py-2 text-sm border hover:border-blue-300 hover:bg-blue-50">
                            <Download className="h-3 w-3 mr-2" />
                            Download Invoice
                          </Button>
                          <Button variant="outline" className="w-full justify-start py-2 text-sm border hover:border-blue-300 hover:bg-blue-50">
                            <MessageCircle className="h-3 w-3 mr-2" />
                            Contact Support
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid lg:grid-cols-2 gap-4">
                  <OrderTimeline order={currentOrder} />
                  <OrderItems items={currentOrder.items} total={currentOrder.total} />
                </div>
              </div>
            ) : orderLoading ? (
              <Card className="shadow-sm border">
                <CardContent className="p-8 text-center">
                  <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-sm text-gray-600">Loading order details...</p>
                </CardContent>
              </Card>
            ) : orderError ? (
              <Card className="shadow-sm border">
                <CardContent className="p-8 text-center">
                  <div className="bg-red-100 rounded-full p-2 w-10 h-10 flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Order Details</h3>
                  <p className="text-sm text-gray-600 mb-4">{orderError}</p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    variant="outline"
                    className="border-blue-500 text-blue-600 hover:bg-blue-50 text-sm"
                  >
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-sm border">
                <CardContent className="p-8 text-center">
                  <div className="bg-gray-100 rounded-full p-2 w-10 h-10 flex items-center justify-center mx-auto mb-3">
                    <Package className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Order Selected</h3>
                  <p className="text-sm text-gray-600">Please select an order from the history to view details.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
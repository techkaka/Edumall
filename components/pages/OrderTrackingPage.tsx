import { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Calendar, User, Eye, Download, MessageCircle, CheckCircle2, Package, Loader2 } from 'lucide-react';
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
      setSelectedOrderId(orders[0].order_number || orders[0].id);
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

  // Loading state
  if (ordersLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Orders</h2>
          <p className="text-gray-600">Fetching your order history...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (ordersError) {
    return (
      <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load orders</h2>
          <p className="text-gray-600 mb-4">{ordersError}</p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
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
      <div className="min-h-screen bg-[#F8FAFB]">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-gray-400 text-5xl mb-4">📦</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">No Orders Found</h1>
            <p className="text-xl text-gray-600 mb-8">You haven't placed any orders yet.</p>
            <Button 
              onClick={() => navigation.goToHome()}
              className="bg-primary hover:bg-blue1 text-white"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="container mx-auto px-4 py-8">
        {/* Order Success Banner */}
        {showOrderSuccess && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-500 rounded-full p-3">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Order Placed Successfully!</h2>
            <p className="text-green-700 mb-4">
              Your order {params?.orderId || selectedOrderId} has been confirmed. We'll start processing it right away.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button 
                size="sm" 
                className="bg-[#5B9BD5] hover:bg-[#4A8BC2] text-white"
                onClick={() => setShowOrderSuccess(false)}
              >
                <Package className="h-4 w-4 mr-2" />
                Track Order
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => navigation.goToHome()}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-xl text-gray-600">Get real-time updates on your book orders</p>
        </div>

        {/* Order Search */}
        <Card className="shadow-lg border-0 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                  placeholder="Enter Order ID (e.g., ORD-2024-001)"
                  className="pl-10 py-3"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchOrder()}
                />
              </div>
              <Button onClick={handleSearchOrder} size="lg" className="bg-[#5B9BD5] hover:bg-[#4A8BC2] text-white">
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="current" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm border">
            <TabsTrigger value="current">Current Order</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
          </TabsList>

          {/* Current Order Tab */}
          <TabsContent value="current" className="space-y-8">
            {currentOrder && !orderLoading ? (
              <>
                {/* Order Overview */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">Order {currentOrder.id}</CardTitle>
                        <CardDescription>
                          Placed on {new Date(currentOrder.createdAt).toLocaleDateString()} • {currentOrder.items.length} items
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(currentOrder.status)}>
                        {currentOrder.status.charAt(0).toUpperCase() + currentOrder.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        {/* Progress Bar */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Delivery Progress</span>
                            <span className="text-sm text-gray-600">{getOrderProgress(currentOrder)}%</span>
                          </div>
                          <Progress value={getOrderProgress(currentOrder)} className="h-3" />
                          <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                            <span>Order Placed</span>
                            <span>{currentOrder.status === 'delivered' ? 'Delivered' : 'In Progress'}</span>
                          </div>
                        </div>

                        {/* Delivery Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-primary" />
                              Delivery Address
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {currentOrder.shippingAddress.fullName}<br />
                              {currentOrder.shippingAddress.addressLine1}<br />
                              {currentOrder.shippingAddress.addressLine2 && `${currentOrder.shippingAddress.addressLine2}<br />`}
                              {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} - {currentOrder.shippingAddress.pincode}<br />
                              Phone: {currentOrder.shippingAddress.phone}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-primary" />
                              Delivery Timeline
                            </h4>
                            <p className="text-sm text-gray-600">
                              Estimated: {getEstimatedDelivery(currentOrder)}
                            </p>
                            {currentOrder.status === 'delivered' && (
                              <p className="text-sm text-green-600 font-medium">
                                Delivered: {new Date(currentOrder.updatedAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Payment Information */}
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <User className="h-4 w-4 mr-2 text-blue-600" />
                            Payment Details
                          </h4>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Method: {currentOrder.paymentMethod}</p>
                              <p className="text-sm text-gray-600">Status: {currentOrder.paymentStatus}</p>
                            </div>
                            <Badge className={currentOrder.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {currentOrder.paymentStatus.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4">Current Location</h4>
                        <div className="p-4 bg-gradient-to-br from-primary/10 to-blue-50 border border-primary/20 rounded-lg mb-6">
                          <p className="font-medium text-primary">{getCurrentLocation(currentOrder)}</p>
                          <p className="text-sm text-gray-600 mt-1">Last updated: {new Date(currentOrder.updatedAt).toLocaleString()}</p>
                        </div>

                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Download Invoice
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact Support
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid lg:grid-cols-2 gap-8">
                  <OrderTimeline order={currentOrder} />
                  <OrderItems items={currentOrder.items} total={currentOrder.total} />
                </div>
              </>
            ) : orderLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-gray-600">Loading order details...</p>
              </div>
            ) : orderError ? (
              <div className="text-center py-12">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Unable to load order details</h3>
                <p className="text-gray-600 mb-4">{orderError}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-5xl mb-4">📦</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">No order selected</h3>
                <p className="text-gray-600">Please select an order from the history to view details.</p>
              </div>
            )}
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your order history and tracking details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedOrderId(order.id)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-50 rounded-full">
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <p className="text-sm text-gray-600">Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Items</p>
                          <p className="text-sm text-gray-600">{order.items.length} books</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Total Amount</p>
                          <p className="text-sm text-gray-600">₹{order.total.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Calendar, User, Eye, Download, MessageCircle, CheckCircle2, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useNavigation, useRouter } from '../Router';
import { TRACKING_DATA } from './order-tracking/constants';
import { getStatusColor, getStatusIcon } from './order-tracking/utils';
import { OrderTimeline } from './order-tracking/OrderTimeline';
import { OrderItems } from './order-tracking/OrderItems';

export function OrderTrackingPage() {
  const navigation = useNavigation();
  const { pageData } = useRouter();
  const [searchOrderId, setSearchOrderId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('ORD-2024-001');
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  const recentOrders = Object.values(TRACKING_DATA);
  const currentOrder = TRACKING_DATA[selectedOrder as keyof typeof TRACKING_DATA];

  // Check if user came from checkout with a new order
  useEffect(() => {
    if (pageData?.orderId) {
      setShowOrderSuccess(true);
      setSelectedOrder(pageData.orderId);
      // Hide success message after 10 seconds
      const timer = setTimeout(() => {
        setShowOrderSuccess(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [pageData]);

  const handleSearchOrder = () => {
    if (searchOrderId && TRACKING_DATA[searchOrderId as keyof typeof TRACKING_DATA]) {
      setSelectedOrder(searchOrderId);
    }
  };

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
              Your order {pageData?.orderId || selectedOrder} has been confirmed. We'll start processing it right away.
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
            {currentOrder && (
              <>
                {/* Order Overview */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">Order {currentOrder.id}</CardTitle>
                        <CardDescription>
                          Placed on {currentOrder.orderDate} • {currentOrder.items.length} items
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(currentOrder.status)}>
                        {currentOrder.status}
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
                            <span className="text-sm text-gray-600">{currentOrder.progress}%</span>
                          </div>
                          <Progress value={currentOrder.progress} className="h-3" />
                          <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                            <span>Order Placed</span>
                            <span>{currentOrder.status === 'Delivered' ? 'Delivered' : 'In Progress'}</span>
                          </div>
                        </div>

                        {/* Delivery Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-primary" />
                              Delivery Address
                            </h4>
                            <p className="text-gray-600 text-sm">{currentOrder.deliveryAddress}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-primary" />
                              Delivery Timeline
                            </h4>
                            <p className="text-sm text-gray-600">
                              Estimated: {currentOrder.estimatedDelivery}
                            </p>
                            {currentOrder.actualDelivery && (
                              <p className="text-sm text-green-600 font-medium">
                                Delivered: {currentOrder.actualDelivery}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Delivery Person Info */}
                        {currentOrder.deliveryPerson && (
                          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-semibold mb-2 flex items-center">
                              <User className="h-4 w-4 mr-2 text-blue-600" />
                              Delivery Partner
                            </h4>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{currentOrder.deliveryPerson.name}</p>
                                <p className="text-sm text-gray-600">Vehicle: {currentOrder.deliveryPerson.vehicle}</p>
                              </div>
                              <Button variant="outline" size="sm">
                                <Phone className="h-4 w-4 mr-2" />
                                {currentOrder.deliveryPerson.phone}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4">Current Location</h4>
                        <div className="p-4 bg-gradient-to-br from-primary/10 to-blue-50 border border-primary/20 rounded-lg mb-6">
                          <p className="font-medium text-primary">{currentOrder.currentLocation}</p>
                          <p className="text-sm text-gray-600 mt-1">Last updated: 2 hours ago</p>
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
                  <OrderTimeline timeline={currentOrder.timeline} />
                  <OrderItems items={currentOrder.items} total={currentOrder.total} />
                </div>
              </>
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
                  {recentOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedOrder(order.id)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-50 rounded-full">
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <p className="text-sm text-gray-600">Ordered on {order.orderDate}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
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
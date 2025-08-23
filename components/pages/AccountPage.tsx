import { useState } from 'react';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  MapPin, 
  CreditCard, 
  Star, 
  Edit3, 
  Eye, 
  Download,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { useNavigation } from '../Router';
import { useAuth } from '../auth/AuthContext';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { useCurrentUser, useOrders, useAddresses, useWishlist, useUserReviewsCount } from '../../services/useApi';
import { Order, OrderItem, Address } from '../../services/types';

function AuthenticatedAccountPage() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  
  // Fetch real data from API
  const { data: currentUser, loading: userLoading } = useCurrentUser();
  const { data: orders, loading: ordersLoading } = useOrders();
  const { data: addresses, loading: addressesLoading } = useAddresses();
  const { wishlist, count: wishlistCount, loading: wishlistLoading } = useWishlist();
  const { data: reviewsCount, loading: reviewsCountLoading } = useUserReviewsCount();
  
  // Use real user data or fallback to auth context user
  const userProfile = {
    name: currentUser?.name || user?.name || 'User',
    email: currentUser?.email || user?.email || '',
    phone: currentUser?.phone || user?.mobile || '',
    joinDate: currentUser?.createdAt || 'January 2024',
    membershipTier: currentUser?.membership_tier || 'bronze',
    membershipPoints: currentUser?.membership_points || 0,
    membershipJoinDate: currentUser?.membership_join_date || 'January 2024'
  };

  // Calculate real stats from API data
  const stats = [
    { 
      label: 'Total Orders', 
      value: orders?.length?.toString() || '0', 
      icon: ShoppingBag, 
      color: 'text-blue-600' 
    },
    { 
      label: 'Wishlist Items', 
      value: wishlistCount?.toString() || '0', 
      icon: Heart, 
      color: 'text-red-500' 
    },
    { 
      label: 'Reviews Written', 
      value: reviewsCount?.toString() || '0', // Use real reviews count
      icon: Star, 
      color: 'text-yellow-500' 
    }
  ];

  // Use real orders data or show empty state
  const recentOrders = orders?.slice(0, 3).map((order: Order) => ({
    id: order.id,
    orderNumber: order.order_number || `#${order.id}`,
    date: order.createdAt,
    status: order.status,
    items: order.items?.length || 0,
    total: order.total,
    statusColor: order.status === 'delivered' ? 'text-green-600' : 
                 order.status === 'shipped' ? 'text-blue-600' : 'text-orange-600',
    statusBg: order.status === 'delivered' ? 'bg-green-50' : 
              order.status === 'shipped' ? 'bg-blue-50' : 'bg-orange-50',
    books: order.items?.map((item: OrderItem) => item.title) || []
  })) || [];

  // Use real addresses data or show empty state
  const userAddresses = addresses?.map((address: Address) => ({
    id: Math.random(), // Backend doesn't provide ID, using random
    type: 'Home', // Default type since backend doesn't provide it
    name: address.fullName,
    address: `${address.addressLine1}${address.addressLine2 ? `, ${address.addressLine2}` : ''}`,
    city: `${address.city}, ${address.state} - ${address.pincode}`,
    phone: address.phone,
    isDefault: false // Backend doesn't provide default flag
  })) || [];

  // Use real wishlist data
  const wishlistItems = wishlist?.map(item => ({
    id: item.productId,
    title: item.product.title,
    author: item.product.author || 'Unknown Author',
    price: item.product.price,
    originalPrice: item.product.originalPrice || item.product.price,
    image: item.product.image,
    availability: 'In Stock' // This would come from inventory API
  })) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getUserInitials = (name: string | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Show loading state while data is being fetched
  if (userLoading || ordersLoading || addressesLoading || wishlistLoading || reviewsCountLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarImage src="" alt={userProfile.name} />
              <AvatarFallback className="text-2xl text-primary bg-white">
                {getUserInitials(userProfile.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {userProfile.name}!</h1>
              <p className="text-blue-100 mb-4">Member since {userProfile.joinDate}</p>
              <div className="flex items-center space-x-4">
                <Badge className={`${
                  userProfile.membershipTier === 'gold' ? 'bg-yellow-500 text-yellow-900 hover:bg-yellow-400' :
                  userProfile.membershipTier === 'silver' ? 'bg-gray-400 text-gray-900 hover:bg-gray-300' :
                  userProfile.membershipTier === 'platinum' ? 'bg-purple-500 text-purple-900 hover:bg-purple-400' :
                  'bg-amber-600 text-amber-900 hover:bg-amber-500'
                }`}>
                  {userProfile.membershipTier.charAt(0).toUpperCase() + userProfile.membershipTier.slice(1)} Member
                </Badge>
                {userProfile.membershipTier === 'bronze' && (
                  <span className="text-sm text-blue-100">
                    Start shopping to earn points!
                  </span>
                )}
                {userProfile.membershipTier === 'silver' && (
                  <span className="text-sm text-blue-100">
                    {500 - userProfile.membershipPoints} points to Gold
                  </span>
                )}
                {userProfile.membershipTier === 'gold' && (
                  <span className="text-sm text-blue-100">
                    {1000 - userProfile.membershipPoints} points to Platinum
                  </span>
                )}
                {userProfile.membershipTier === 'platinum' && (
                  <span className="text-sm text-blue-100">
                    You've reached the highest tier!
                  </span>
                )}
              </div>
            </div>
            <Button 
              variant="outline" 
              className="text-primary border-white hover:bg-white/10"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-white shadow-sm border">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Your latest purchases and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 ${order.statusBg} rounded-full`}>
                              {getStatusIcon(order.status)}
                            </div>
                            <div>
                              <p className="font-semibold">{order.orderNumber}</p>
                              <p className="text-sm text-gray-600">{order.books.slice(0, 2).join(', ')}</p>
                              <p className="text-xs text-gray-500">{order.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`${order.statusBg} ${order.statusColor} border-0 mb-2`}>
                              {order.status}
                            </Badge>
                            <p className="font-semibold">₹{order.total.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab('orders')}>
                      View All Orders
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" onClick={() => navigation.goToProducts()}>
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Continue Shopping
                      </Button>
                      <Button variant="outline" onClick={() => navigation.goToOrderTracking()}>
                        <Package className="h-4 w-4 mr-2" />
                        Track Order
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTab('wishlist')}>
                        <Heart className="h-4 w-4 mr-2" />
                        View Wishlist
                      </Button>
                      <Button variant="outline" onClick={() => navigation.goToContact()}>
                        <Phone className="h-4 w-4 mr-2" />
                        Need Help?
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Recent Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {wishlistItems.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex space-x-3">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                            <p className="text-xs text-gray-600 mb-1">{item.author}</p>
                            <p className="text-sm font-semibold">₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => setActiveTab('wishlist')}>
                      View All Wishlist
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Track all your orders and download invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders?.map((order: Order) => {
                    const statusColor = order.status === 'delivered' ? 'text-green-600' : 
                                       order.status === 'shipped' ? 'text-blue-600' : 'text-orange-600';
                    const statusBg = order.status === 'delivered' ? 'bg-green-50' : 
                                    order.status === 'shipped' ? 'bg-blue-50' : 'bg-orange-50';
                    const orderNumber = order.order_number || `#${order.id}`;
                    
                    return (
                      <div key={order.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 ${statusBg} rounded-full`}>
                              {getStatusIcon(order.status)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{orderNumber}</h3>
                              <p className="text-sm text-gray-600">Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Badge className={`${statusBg} ${statusColor} border-0`}>
                            {order.status}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Items</p>
                            <p className="text-sm text-gray-600">{order.items.length} books</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Total Amount</p>
                            <p className="text-sm text-gray-600">₹{order.total.toLocaleString()}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Invoice
                            </Button>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Books Ordered:</p>
                          <div className="flex flex-wrap gap-1">
                            {order.items.map((item: OrderItem, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {item.title}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>My Wishlist ({wishlistItems.length} items)</CardTitle>
                <CardDescription>Save items for later and get notified of price drops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex space-x-4 p-4 border rounded-lg hover:shadow-md">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-24 h-32 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.author}</p>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-lg font-bold">₹{item.price}</span>
                          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                          <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                            {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                          </Badge>
                        </div>
                        <p className="text-sm text-green-600 mb-3">{item.availability}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">Add to Cart</Button>
                          <Button variant="outline" size="sm">Remove</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {wishlistItems.length === 0 && (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-4">Start adding books you love!</p>
                    <Button onClick={() => navigation.goToProducts()}>
                      Browse Books
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Saved Addresses</CardTitle>
                    <CardDescription>Manage your delivery addresses</CardDescription>
                  </div>
                  <Button>Add New Address</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {userAddresses.map((address) => (
                    <div key={address.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge variant={address.isDefault ? "default" : "outline"}>
                            {address.type}
                          </Badge>
                          {address.isDefault && (
                            <Badge className="bg-green-100 text-green-700 border-0">Default</Badge>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                      <h4 className="font-semibold mb-2">{address.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{address.address}</p>
                      <p className="text-sm text-gray-600 mb-1">{address.city}</p>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>



          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input value={userProfile.name} disabled={!isEditing} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input value={userProfile.email} disabled={!isEditing} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input value={userProfile.phone} disabled={!isEditing} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Member Since</label>
                    <Input value={userProfile.joinDate} disabled />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-4">Notification Preferences</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Order updates and shipping notifications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">New product launches and recommendations</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Promotional emails and special offers</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4">
                  {isEditing ? (
                    <>
                      <Button>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export function AccountPage() {
  return (
    <ProtectedRoute>
      <AuthenticatedAccountPage />
    </ProtectedRoute>
  );
}
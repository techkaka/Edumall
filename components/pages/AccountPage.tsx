import { useState } from 'react';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  MapPin, 
  CreditCard, 
  Gift, 
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
import { Progress } from '../ui/progress';
import { useNavigation } from '../Router';
import { useAuth } from '../auth/AuthContext';
import { ProtectedRoute } from '../auth/ProtectedRoute';

function AuthenticatedAccountPage() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: user?.name || 'User',
    email: user?.email || '',
    phone: user?.mobile || '',
    joinDate: user?.joinDate || 'January 2024',
    membershipTier: 'Gold'
  });

  const stats = [
    { label: 'Total Orders', value: '24', icon: ShoppingBag, color: 'text-blue-600' },
    { label: 'Wishlist Items', value: '12', icon: Heart, color: 'text-red-500' },
    { label: 'Reward Points', value: '2,450', icon: Gift, color: 'text-green-600' },
    { label: 'Reviews Written', value: '8', icon: Star, color: 'text-yellow-500' }
  ];

  const recentOrders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      items: 3,
      total: 2499,
      statusColor: 'text-green-600',
      statusBg: 'bg-green-50',
      books: ['NEET Complete Package', 'Physics Modules', 'Chemistry Guide']
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'In Transit',
      items: 2,
      total: 1899,
      statusColor: 'text-blue-600',
      statusBg: 'bg-blue-50',
      books: ['JEE Mathematics', 'Organic Chemistry']
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-05',
      status: 'Processing',
      items: 1,
      total: 999,
      statusColor: 'text-orange-600',
      statusBg: 'bg-orange-50',
      books: ['UPSC General Studies']
    }
  ];

  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: userProfile.name,
      address: 'Flat 401, Green Valley Apartment, Sector 18, Noida',
      city: 'Noida, UP - 201301',
      phone: userProfile.phone,
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: userProfile.name,
      address: 'Office 205, Tech Park, DLF Phase 3',
      city: 'Gurugram, HR - 122002',
      phone: userProfile.phone,
      isDefault: false
    }
  ];

  const loyaltyProgram = {
    currentTier: 'Gold',
    currentPoints: 2450,
    nextTier: 'Platinum',
    pointsNeeded: 550,
    progress: 82
  };

  const wishlistItems = [
    {
      id: 1,
      title: 'Advanced Organic Chemistry',
      author: 'Dr. M.S. Chouhan',
      price: 1299,
      originalPrice: 1899,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      availability: 'In Stock'
    },
    {
      id: 2,
      title: 'UPSC Mains Answer Writing',
      author: 'Prof. K.K. Mishra',
      price: 899,
      originalPrice: 1299,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      availability: 'Limited Stock'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'In Transit':
        return <Truck className="h-4 w-4" />;
      case 'Processing':
        return <Package className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
                <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-400">
                  {loyaltyProgram.currentTier} Member
                </Badge>
                <span className="text-sm text-blue-100">
                  {loyaltyProgram.pointsNeeded} points to {loyaltyProgram.nextTier}
                </span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-white shadow-sm border">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
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
                              <p className="font-semibold">{order.id}</p>
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
                    <CardTitle className="flex items-center">
                      <Gift className="h-5 w-5 mr-2 text-yellow-500" />
                      Kaka Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-primary">{loyaltyProgram.currentPoints}</p>
                      <p className="text-sm text-gray-600">Reward Points</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{loyaltyProgram.currentTier}</span>
                        <span>{loyaltyProgram.nextTier}</span>
                      </div>
                      <Progress value={loyaltyProgram.progress} className="h-2" />
                      <p className="text-xs text-gray-600 text-center">
                        {loyaltyProgram.pointsNeeded} points to {loyaltyProgram.nextTier}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => setActiveTab('rewards')}>
                      View Rewards
                    </Button>
                  </CardContent>
                </Card>

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
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 ${order.statusBg} rounded-full`}>
                            {getStatusIcon(order.status)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <p className="text-sm text-gray-600">Ordered on {order.date}</p>
                          </div>
                        </div>
                        <Badge className={`${order.statusBg} ${order.statusColor} border-0`}>
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Items</p>
                          <p className="text-sm text-gray-600">{order.items} books</p>
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
                          {order.books.map((book, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {book}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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
                  {addresses.map((address) => (
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

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-yellow-500" />
                  Kaka Rewards Program
                </CardTitle>
                <CardDescription>Earn points on every purchase and unlock exclusive benefits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {loyaltyProgram.currentPoints} Points
                  </h3>
                  <p className="text-gray-600 mb-4">Current Balance</p>
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <Badge className="bg-yellow-500 text-yellow-900">
                      {loyaltyProgram.currentTier} Member
                    </Badge>
                    <span className="text-sm text-gray-600">→</span>
                    <Badge variant="outline">
                      {loyaltyProgram.nextTier} ({loyaltyProgram.pointsNeeded} points needed)
                    </Badge>
                  </div>
                  <Progress value={loyaltyProgram.progress} className="h-3 mb-2" />
                  <p className="text-sm text-gray-600">
                    {loyaltyProgram.progress}% to {loyaltyProgram.nextTier}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-semibold mb-2">Earn Points</h4>
                    <p className="text-sm text-gray-600">Get 1 point for every ₹10 spent</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-semibold mb-2">Redeem Rewards</h4>
                    <p className="text-sm text-gray-600">100 points = ₹10 discount</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-semibold mb-2">Exclusive Access</h4>
                    <p className="text-sm text-gray-600">Early sale access & special offers</p>
                  </div>
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
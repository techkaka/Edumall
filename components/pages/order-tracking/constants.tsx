import { CheckCircle, Package, Truck } from 'lucide-react';

export const TRACKING_DATA = {
  'ORD-2024-001': {
    id: 'ORD-2024-001',
    status: 'In Transit',
    progress: 75,
    orderDate: '2024-01-15',
    estimatedDelivery: '2024-01-18',
    actualDelivery: null,
    currentLocation: 'Delhi Distribution Center',
    deliveryAddress: 'Flat 401, Green Valley Apartment, Sector 18, Noida, UP - 201301',
    deliveryPerson: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      vehicle: 'DL-8C-1234'
    },
    items: [
      {
        id: 1,
        title: 'NEET Complete Study Package 2025',
        author: 'Dr. R.K. Sharma',
        quantity: 1,
        price: 2499,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'
      },
      {
        id: 2,
        title: 'Physics Modules for NEET',
        author: 'Prof. A.K. Singh',
        quantity: 1,
        price: 1299,
        image: 'https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=400'
      }
    ],
    timeline: [
      {
        status: 'Order Placed',
        description: 'Your order has been successfully placed',
        timestamp: '2024-01-15 10:30 AM',
        completed: true,
        icon: CheckCircle,
        color: 'text-green-600'
      },
      {
        status: 'Order Confirmed',
        description: 'Payment verified and order confirmed',
        timestamp: '2024-01-15 11:00 AM',
        completed: true,
        icon: CheckCircle,
        color: 'text-green-600'
      },
      {
        status: 'Processing',
        description: 'Your books are being prepared for shipping',
        timestamp: '2024-01-16 09:15 AM',
        completed: true,
        icon: CheckCircle,
        color: 'text-green-600'
      },
      {
        status: 'Shipped',
        description: 'Package handed over to delivery partner',
        timestamp: '2024-01-16 06:30 PM',
        completed: true,
        icon: Package,
        color: 'text-blue-600'
      },
      {
        status: 'In Transit',
        description: 'Package is on the way to your location',
        timestamp: '2024-01-17 08:00 AM',
        completed: true,
        icon: Truck,
        color: 'text-blue-600'
      },
      {
        status: 'Out for Delivery',
        description: 'Package will be delivered today',
        timestamp: 'Expected today',
        completed: false,
        icon: Truck,
        color: 'text-orange-600'
      },
      {
        status: 'Delivered',
        description: 'Package delivered successfully',
        timestamp: 'Pending',
        completed: false,
        icon: CheckCircle,
        color: 'text-gray-400'
      }
    ],
    total: 3798,
    trackingHistory: [
      { location: 'Delhi Distribution Center', timestamp: '2024-01-17 08:00 AM', status: 'Package arrived at facility' },
      { location: 'Delhi Sorting Hub', timestamp: '2024-01-16 11:30 PM', status: 'Package sorted for delivery' },
      { location: 'Noida Local Office', timestamp: '2024-01-16 06:30 PM', status: 'Package shipped from seller' }
    ]
  },
  'ORD-2024-002': {
    id: 'ORD-2024-002',
    status: 'Delivered',
    progress: 100,
    orderDate: '2024-01-10',
    estimatedDelivery: '2024-01-13',
    actualDelivery: '2024-01-13',
    currentLocation: 'Delivered',
    deliveryAddress: 'Office 205, Tech Park, DLF Phase 3, Gurugram, HR - 122002',
    deliveryPerson: null,
    items: [
      {
        id: 1,
        title: 'JEE Mathematics Complete Guide',
        author: 'Prof. M.L. Khanna',
        quantity: 2,
        price: 1899,
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400'
      }
    ],
    timeline: [
      {
        status: 'Order Placed',
        description: 'Your order has been successfully placed',
        timestamp: '2024-01-10 02:15 PM',
        completed: true,
        icon: CheckCircle,
        color: 'text-green-600'
      },
      {
        status: 'Order Confirmed',
        description: 'Payment verified and order confirmed',
        timestamp: '2024-01-10 02:45 PM',
        completed: true,
        icon: CheckCircle,
        color: 'text-green-600'
      },
      {
        status: 'Processing',
        description: 'Your books are being prepared for shipping',
        timestamp: '2024-01-11 10:00 AM',
        completed: true,
        icon: CheckCircle,
        color: 'text-green-600'
      },
      {
        status: 'Shipped',
        description: 'Package handed over to delivery partner',
        timestamp: '2024-01-11 04:20 PM',
        completed: true,
        icon: Package,
        color: 'text-green-600'
      },
      {
        status: 'In Transit',
        description: 'Package is on the way to your location',
        timestamp: '2024-01-12 08:30 AM',
        completed: true,
        icon: Truck,
        color: 'text-green-600'
      },
      {
        status: 'Out for Delivery',
        description: 'Package out for delivery',
        timestamp: '2024-01-13 09:00 AM',
        completed: true,
        icon: Truck,
        color: 'text-green-600'
      },
      {
        status: 'Delivered',
        description: 'Package delivered successfully',
        timestamp: '2024-01-13 02:30 PM',
        completed: true,
        icon: CheckCircle,
        color: 'text-green-600'
      }
    ],
    total: 3798,
    trackingHistory: [
      { location: 'Delivered to Customer', timestamp: '2024-01-13 02:30 PM', status: 'Package delivered successfully' },
      { location: 'Out for Delivery', timestamp: '2024-01-13 09:00 AM', status: 'Package assigned to delivery partner' },
      { location: 'Gurugram Local Office', timestamp: '2024-01-12 08:30 AM', status: 'Package arrived at local facility' }
    ]
  }
};

export const STATUS_COLORS = {
  'Delivered': 'bg-green-100 text-green-800 border-green-200',
  'In Transit': 'bg-blue-100 text-blue-800 border-blue-200',
  'Processing': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Cancelled': 'bg-red-100 text-red-800 border-red-200',
  'default': 'bg-gray-100 text-gray-800 border-gray-200'
};
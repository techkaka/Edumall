import { CheckCircle, Truck, Package, Clock, AlertCircle } from 'lucide-react';

// Updated status colors to match API status values
const STATUS_COLORS = {
  'delivered': 'bg-green-100 text-green-800 border-green-200',
  'shipped': 'bg-blue-100 text-blue-800 border-blue-200',
  'processing': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'confirmed': 'bg-purple-100 text-purple-800 border-purple-200',
  'pending': 'bg-gray-100 text-gray-800 border-gray-200',
  'cancelled': 'bg-red-100 text-red-800 border-red-200',
  'default': 'bg-gray-100 text-gray-800 border-gray-200'
};

export const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status.toLowerCase() as keyof typeof STATUS_COLORS] || STATUS_COLORS.default;
};

export const getStatusIcon = (status: string) => {
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case 'delivered':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'shipped':
      return <Truck className="h-4 w-4 text-blue-600" />;
    case 'processing':
      return <Package className="h-4 w-4 text-yellow-600" />;
    case 'confirmed':
      return <CheckCircle className="h-4 w-4 text-purple-600" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-gray-600" />;
    case 'cancelled':
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
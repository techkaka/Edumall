import { CheckCircle, Truck, Package, Clock } from 'lucide-react';
import { STATUS_COLORS } from './constants';

export const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.default;
};

export const getStatusIcon = (status: string) => {
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
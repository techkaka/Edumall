import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { CheckCircle, Package, Truck, Clock, AlertCircle } from 'lucide-react';
import { Order } from '../../../services/types';

interface OrderTimelineProps {
  order: Order;
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  // Generate timeline based on order status
  const generateTimeline = (order: Order) => {
    const timeline = [];
    const orderDate = new Date(order.createdAt);
    const updatedDate = new Date(order.updatedAt);
    
    // Order Placed - Always completed
    timeline.push({
      status: 'Order Placed',
      description: 'Your order has been successfully placed',
      timestamp: orderDate.toLocaleString(),
      completed: true,
      icon: CheckCircle,
      color: 'text-green-600'
    });

    // Order Confirmed - Always completed if order exists
    timeline.push({
      status: 'Order Confirmed',
      description: 'Payment verified and order confirmed',
      timestamp: new Date(orderDate.getTime() + 30 * 60000).toLocaleString(), // 30 minutes later
      completed: true,
      icon: CheckCircle,
      color: 'text-green-600'
    });

    // Processing
    const processingCompleted = ['processing', 'shipped', 'delivered'].includes(order.status);
    timeline.push({
      status: 'Processing',
      description: 'Your books are being prepared for shipping',
      timestamp: processingCompleted ? new Date(orderDate.getTime() + 24 * 60 * 60000).toLocaleString() : 'In Progress',
      completed: processingCompleted,
      icon: processingCompleted ? CheckCircle : Clock,
      color: processingCompleted ? 'text-green-600' : 'text-yellow-600'
    });

    // Shipped
    const shippedCompleted = ['shipped', 'delivered'].includes(order.status);
    timeline.push({
      status: 'Shipped',
      description: 'Package handed over to delivery partner',
      timestamp: shippedCompleted ? new Date(orderDate.getTime() + 48 * 60 * 60000).toLocaleString() : 'Pending',
      completed: shippedCompleted,
      icon: shippedCompleted ? Package : Clock,
      color: shippedCompleted ? 'text-green-600' : 'text-gray-400'
    });

    // In Transit
    const inTransitCompleted = ['delivered'].includes(order.status);
    timeline.push({
      status: 'In Transit',
      description: 'Package is on the way to your location',
      timestamp: inTransitCompleted ? new Date(orderDate.getTime() + 72 * 60 * 60000).toLocaleString() : 'In Progress',
      completed: inTransitCompleted,
      icon: inTransitCompleted ? Truck : Clock,
      color: inTransitCompleted ? 'text-green-600' : 'text-blue-600'
    });

    // Delivered
    const deliveredCompleted = order.status === 'delivered';
    timeline.push({
      status: 'Delivered',
      description: 'Package delivered successfully',
      timestamp: deliveredCompleted ? updatedDate.toLocaleString() : 'Expected soon',
      completed: deliveredCompleted,
      icon: deliveredCompleted ? CheckCircle : Clock,
      color: deliveredCompleted ? 'text-green-600' : 'text-gray-400'
    });

    // Handle cancelled orders
    if (order.status === 'cancelled') {
      timeline.push({
        status: 'Order Cancelled',
        description: 'Order has been cancelled',
        timestamp: updatedDate.toLocaleString(),
        completed: true,
        icon: AlertCircle,
        color: 'text-red-600'
      });
    }

    return timeline;
  };

  const timeline = generateTimeline(order);

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle>Order Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start space-x-4 relative">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                item.completed ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900">{item.status}</h4>
                  {item.completed && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                <p className="text-xs text-gray-500">{item.timestamp}</p>
              </div>
              {index < timeline.length - 1 && (
                <div className={`absolute left-5 mt-10 w-0.5 h-6 ${
                  item.completed ? 'bg-green-200' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

interface OrderItem {
  id: number;
  title: string;
  author: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderItemsProps {
  items: OrderItem[];
  total: number;
}

export function OrderItems({ items, total }: OrderItemsProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle>Order Items ({items.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 p-4 border rounded-lg">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-16 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 mb-2">by {item.author}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                  <span className="font-medium">₹{item.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between font-semibold text-lg">
              <span>Total Amount</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { CheckCircle } from 'lucide-react';

interface TimelineItem {
  status: string;
  description: string;
  timestamp: string;
  completed: boolean;
  icon: React.ComponentType<any>;
  color: string;
}

interface OrderTimelineProps {
  timeline: TimelineItem[];
}

export function OrderTimeline({ timeline }: OrderTimelineProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle>Order Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
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
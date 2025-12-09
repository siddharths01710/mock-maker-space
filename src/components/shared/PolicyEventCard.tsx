import { Phone, User, Calendar, IndianRupee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PolicyEvent } from '@/types';
import { motion } from 'framer-motion';

interface PolicyEventCardProps {
  event: PolicyEvent;
  index?: number;
}

export function PolicyEventCard({ event, index = 0 }: PolicyEventCardProps) {
  const eventColors = {
    renewal: 'bg-primary/10 text-primary border-primary/20',
    maturity: 'bg-success/10 text-success border-success/20',
    lapsing: 'bg-destructive/10 text-destructive border-destructive/20',
    birthday: 'bg-accent/10 text-accent border-accent/20',
    anniversary: 'bg-purple-100 text-purple-600 border-purple-200',
  };

  const getDaysLabel = (days: number) => {
    if (days === 0) return 'Today';
    if (days === 1) return '1 day to go';
    return `${days} days to go`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-medium text-sm">{event.customerName}</h4>
                <p className="text-xs text-muted-foreground">{event.productName}</p>
              </div>
            </div>
            <Badge variant="outline" className={eventColors[event.eventType]}>
              {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{getDaysLabel(event.daysToEvent)}</span>
            </div>
            {event.amount && (
              <div className="flex items-center gap-1">
                <IndianRupee className="h-3 w-3" />
                <span>{event.amount.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 text-xs">
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button size="sm" variant="outline" className="flex-1 text-xs">
              <User className="h-3 w-3 mr-1" />
              Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

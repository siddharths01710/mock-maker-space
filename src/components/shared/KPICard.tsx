import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { KPI } from '@/types';
import { motion } from 'framer-motion';

interface KPICardProps {
  kpi: KPI;
  index?: number;
}

export function KPICard({ kpi, index = 0 }: KPICardProps) {
  const statusColors = {
    good: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    critical: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  const statusDotColors = {
    good: 'bg-success',
    warning: 'bg-warning',
    critical: 'bg-destructive',
  };

  const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={`border ${statusColors[kpi.status]}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${statusDotColors[kpi.status]}`} />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {kpi.name}
              </span>
            </div>
            {kpi.trend && (
              <TrendIcon className="h-4 w-4" />
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{kpi.value}</span>
            {kpi.target && (
              <span className="text-xs text-muted-foreground">/ {kpi.target}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

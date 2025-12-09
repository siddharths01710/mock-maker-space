import { Sparkles, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/data/categories';
import { motion } from 'framer-motion';

interface AISummaryCardProps {
  title?: string;
  summary: string;
  onViewInsights?: () => void;
}

export function AISummaryCard({ title, summary, onViewInsights }: AISummaryCardProps) {
  const { language } = useApp();

  const t = (key: string) => translations[key]?.[language] || translations[key]?.EN || key;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-primary mb-1">
                {title || t('aiSummary')}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {summary}
              </p>
              {onViewInsights && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={onViewInsights}
                  className="text-primary p-0 h-auto mt-2 font-medium"
                >
                  {t('viewInsights')}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

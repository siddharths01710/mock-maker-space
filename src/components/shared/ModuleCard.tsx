import * as Icons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Module } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ModuleCardProps {
  module: Module;
  categoryId: string;
  index?: number;
}

export function ModuleCard({ module, categoryId, index = 0 }: ModuleCardProps) {
  const { language, setCurrentModule } = useApp();
  const navigate = useNavigate();

  const handleClick = () => {
    setCurrentModule(module.id);
    navigate(`/category/${categoryId}/module/${module.id}`);
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        onClick={handleClick}
        className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/30 active:scale-[0.98] group"
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {getIcon(module.icon)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">
                {language === 'HI' ? module.nameHi : module.name}
              </h3>
              {module.description && (
                <p className="text-xs text-muted-foreground truncate">
                  {module.description}
                </p>
              )}
            </div>
            {module.hasAiSummary && (
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Icons.Sparkles className="h-3 w-3 text-accent" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

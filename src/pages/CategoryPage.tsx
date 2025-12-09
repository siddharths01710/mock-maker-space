import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TopNavBar } from '@/components/layout/TopNavBar';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { AISummaryCard } from '@/components/shared/AISummaryCard';
import { ModuleCard } from '@/components/shared/ModuleCard';
import { useApp } from '@/contexts/AppContext';
import { categories } from '@/data/categories';
import { motion } from 'framer-motion';
import { FloatingChatButton } from '@/components/shared/FloatingChatButton';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { language } = useApp();
  const navigate = useNavigate();

  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Category not found</p>
      </div>
    );
  }

  const categoryName = language === 'HI' ? category.nameHi : category.name;

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavBar />
      <SideNavigation />

      <main className="pt-16 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{categoryName}</h1>
              <p className="text-sm text-muted-foreground">
                {category.modules.length} modules available
              </p>
            </div>
          </div>
        </motion.div>

        {/* AI Summary for categories with business data */}
        {category.modules.some((m) => m.hasAiSummary) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <AISummaryCard
              summary={`Your ${categoryName} section has 5 pending actions. Top priority: Review 3 new leads and complete 2 overdue tasks for optimal performance.`}
              onViewInsights={() => {}}
            />
          </motion.section>
        )}

        {/* Module Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="space-y-3">
            {category.modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                categoryId={categoryId!}
                index={index}
              />
            ))}
          </div>
        </motion.section>
      </main>

      <FloatingChatButton />
    </div>
  );
}

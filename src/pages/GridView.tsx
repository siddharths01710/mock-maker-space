import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TopNavBar } from '@/components/layout/TopNavBar';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { useApp } from '@/contexts/AppContext';
import { categories } from '@/data/categories';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FloatingChatButton } from '@/components/shared/FloatingChatButton';

export default function GridView() {
  const { language, user } = useApp();
  const navigate = useNavigate();
  const [openCategories, setOpenCategories] = useState<string[]>(['my-activities']);

  const filteredCategories = categories.filter((cat) => {
    if (!cat.restrictedTo) return true;
    return user && cat.restrictedTo.includes(user.role);
  });

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavBar />
      <SideNavigation />

      <main className="pt-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-6"
        >
          <h1 className="text-xl font-bold mb-1">Menu Grid</h1>
          <p className="text-sm text-muted-foreground">Quick access to all modules</p>
        </motion.div>

        <div className="space-y-4">
          {filteredCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.05 }}
            >
              <Collapsible
                open={openCategories.includes(category.id)}
                onOpenChange={() => toggleCategory(category.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 h-auto bg-card hover:bg-muted/50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {getIcon(category.icon)}
                      </div>
                      <span className="font-semibold">
                        {language === 'HI' ? category.nameHi : category.name}
                      </span>
                    </div>
                    {openCategories.includes(category.id) ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="grid grid-cols-3 gap-3">
                    {category.modules.map((module, modIndex) => (
                      <motion.div
                        key={module.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: modIndex * 0.03 }}
                      >
                        <Card
                          onClick={() => navigate(`/category/${category.id}/module/${module.id}`)}
                          className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all active:scale-95"
                        >
                          <CardContent className="p-4 text-center">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                              {getIcon(module.icon)}
                            </div>
                            <p className="text-xs font-medium line-clamp-2">
                              {language === 'HI' ? module.nameHi : module.name}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))}
        </div>
      </main>

      <FloatingChatButton />
    </div>
  );
}

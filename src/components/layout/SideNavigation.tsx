import { X, ChevronRight, LogOut } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { categories, translations } from '@/data/categories';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function SideNavigation() {
  const { sidebarOpen, setSidebarOpen, language, user, setUser, setCurrentCategory, setCurrentModule } = useApp();
  const navigate = useNavigate();

  const t = (key: string) => translations[key]?.[language] || translations[key]?.EN || key;

  const handleCategoryClick = (categoryId: string) => {
    setCurrentCategory(categoryId);
    setCurrentModule(null);
    setSidebarOpen(false);
    navigate(`/category/${categoryId}`);
  };

  const handleLogout = () => {
    setUser(null);
    setSidebarOpen(false);
    navigate('/');
  };

  const filteredCategories = categories.filter((cat) => {
    if (!cat.restrictedTo) return true;
    return user && cat.restrictedTo.includes(user.role);
  });

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-foreground/50 z-50"
          />

          {/* Sidebar */}
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-72 gradient-primary z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary-foreground/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-foreground flex items-center justify-center">
                  <span className="text-primary font-bold">BL</span>
                </div>
                <div>
                  <h2 className="text-primary-foreground font-semibold">Bajaj Life</h2>
                  <p className="text-primary-foreground/70 text-xs">Pre-Sales Portal</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* User Info */}
            {user && (
              <div className="p-4 border-b border-primary-foreground/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-accent-foreground font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-primary-foreground font-medium">{user.name}</p>
                    <p className="text-primary-foreground/70 text-xs capitalize">
                      {user.role.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto py-2">
              {filteredCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCategoryClick(category.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getIcon(category.icon)}
                    <span className="font-medium text-sm">
                      {language === 'HI' ? category.nameHi : category.name}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-primary-foreground/10">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start gap-3 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="h-5 w-5" />
                {t('logout')}
              </Button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

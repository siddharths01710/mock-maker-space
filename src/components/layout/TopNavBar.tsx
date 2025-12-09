import { useState } from 'react';
import { Menu, Search, Grid3X3, MessageSquare, LayoutDashboard, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { ViewMode, Language } from '@/types';
import { translations } from '@/data/categories';
import { motion, AnimatePresence } from 'framer-motion';

const languages: { code: Language; label: string; enabled: boolean }[] = [
  { code: 'EN', label: 'EN', enabled: true },
  { code: 'HI', label: 'HI', enabled: true },
  { code: 'BN', label: 'BN', enabled: false },
  { code: 'MR', label: 'MR', enabled: false },
  { code: 'TA', label: 'TA', enabled: false },
  { code: 'TE', label: 'TE', enabled: false },
];

const viewModes: { mode: ViewMode; icon: React.ElementType; label: string }[] = [
  { mode: 'detailed', icon: LayoutDashboard, label: 'detailedView' },
  { mode: 'grid', icon: Grid3X3, label: 'gridView' },
  { mode: 'chat', icon: MessageSquare, label: 'chatView' },
];

export function TopNavBar() {
  const { language, setLanguage, viewMode, setViewMode, sidebarOpen, setSidebarOpen, user } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);

  const t = (key: string) => translations[key]?.[language] || translations[key]?.EN || key;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 gradient-primary shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-foreground flex items-center justify-center">
              <span className="text-primary font-bold text-sm">BL</span>
            </div>
            <span className="text-primary-foreground font-semibold text-sm hidden sm:block">
              Bajaj Life Pre-Sales
            </span>
          </div>
        </div>

        {/* Center: Search */}
        <AnimatePresence>
          {searchOpen ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex-1 mx-4 max-w-xs"
            >
              <Input
                placeholder={t('search')}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
            </motion.div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
        </AnimatePresence>

        {/* Right: View Toggle + Language + Profile */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-primary-foreground/10 rounded-lg p-1">
            {viewModes.map(({ mode, icon: Icon }) => (
              <Button
                key={mode}
                variant="ghost"
                size="icon"
                onClick={() => setViewMode(mode)}
                className={`h-8 w-8 ${
                  viewMode === mode
                    ? 'bg-primary-foreground text-primary'
                    : 'text-primary-foreground hover:bg-primary-foreground/10'
                }`}
              >
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>

          {/* Language Toggle */}
          <div className="flex items-center bg-primary-foreground/10 rounded-lg p-1">
            {languages.slice(0, 2).map(({ code, label, enabled }) => (
              <Button
                key={code}
                variant="ghost"
                size="sm"
                onClick={() => enabled && setLanguage(code)}
                disabled={!enabled}
                className={`h-7 px-2 text-xs font-medium ${
                  language === code
                    ? 'bg-primary-foreground text-primary'
                    : 'text-primary-foreground hover:bg-primary-foreground/10'
                }`}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* User Avatar */}
          {user && (
            <div className="flex items-center gap-2 ml-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <User className="h-4 w-4 text-accent-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

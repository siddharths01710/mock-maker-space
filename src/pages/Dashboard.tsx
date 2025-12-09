import { useState, useEffect } from 'react';
import { RefreshCw, Megaphone, Gift, ChevronRight, Bell, Clock, IndianRupee, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TopNavBar } from '@/components/layout/TopNavBar';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { AISummaryCard } from '@/components/shared/AISummaryCard';
import { KPICard } from '@/components/shared/KPICard';
import { PolicyEventCard } from '@/components/shared/PolicyEventCard';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/data/categories';
import { KPI, PolicyEvent } from '@/types';
import { motion } from 'framer-motion';

const mockKPIs: KPI[] = [
  { id: '1', name: 'RNB', value: '₹45L', target: '₹60L', status: 'warning', trend: 'up' },
  { id: '2', name: 'Login NOP', value: '24', target: '30', status: 'good', trend: 'up' },
  { id: '3', name: 'Issuance NOP', value: '18', target: '25', status: 'warning', trend: 'stable' },
  { id: '4', name: 'WPC', value: '₹32L', target: '₹40L', status: 'good', trend: 'up' },
  { id: '5', name: '25M Persistency', value: '87%', target: '90%', status: 'critical', trend: 'down' },
  { id: '6', name: '13M Persistency', value: '92%', target: '95%', status: 'good', trend: 'up' },
];

const mockEvents: PolicyEvent[] = [
  { id: '1', customerName: 'Siddharth Singh', productName: 'Invest Protect Goal', eventType: 'renewal', daysToEvent: 5, amount: 10000, mobile: '9876543210' },
  { id: '2', customerName: 'Priya Sharma', productName: 'Term Life Plus', eventType: 'maturity', daysToEvent: 3, amount: 500000, mobile: '9876543211' },
  { id: '3', customerName: 'Rahul Verma', productName: 'ULIP Growth', eventType: 'lapsing', daysToEvent: 2, amount: 25000, mobile: '9876543212' },
  { id: '4', customerName: 'Anita Patel', productName: 'Child Plan', eventType: 'birthday', daysToEvent: 0, mobile: '9876543213' },
  { id: '5', customerName: 'Vikram Malhotra', productName: 'Retirement Plan', eventType: 'anniversary', daysToEvent: 1, mobile: '9876543214' },
];

const banners = [
  { id: '1', title: 'New Product Launch!', subtitle: 'Introducing Bajaj Allianz Smart Protect Goal', color: 'from-primary to-primary/80' },
  { id: '2', title: 'CEO Message', subtitle: 'Our commitment to empowering sales teams', color: 'from-accent to-accent/80' },
  { id: '3', title: 'Contest Alert', subtitle: 'Win exciting prizes in Q4 Sales Challenge', color: 'from-success to-success/80' },
];

export default function Dashboard() {
  const { user, language } = useApp();
  const [currentBanner, setCurrentBanner] = useState(0);

  const t = (key: string) => translations[key]?.[language] || translations[key]?.EN || key;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavBar />
      <SideNavigation />

      <main className="pt-16 px-4">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-6"
        >
          <h1 className="text-2xl font-bold mb-1">
            {t('welcome')}, {user?.name?.split(' ')[0]}! 👋
          </h1>
        </motion.div>


        {/* KPI Snapshot */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">KPI Snapshot</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockKPIs.slice(0, 6).map((kpi, index) => (
              <KPICard key={kpi.id} kpi={kpi} index={index} />
            ))}
          </div>
        </motion.section>

        {/* AI Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <AISummaryCard
            summary="Your persistency is at 87%, below target. Focus on 3 lapsing policies worth ₹45,000 in the next week. RNB is trending up - 2 more logins can hit monthly target."
            onViewInsights={() => {}}
          />
        </motion.section>

        {/* My Earnings Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">My Earnings (YTD)</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Total Earnings Card */}
          <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20 mb-3">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">₹2,45,890</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Split: Incentives & Commissions */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-success/20 bg-success/5">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mb-2">
                    <Gift className="h-5 w-5 text-success" />
                  </div>
                  <p className="text-xs text-muted-foreground">Incentives</p>
                  <p className="text-xl font-bold text-success">₹85,450</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <IndianRupee className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Commissions</p>
                  <p className="text-xl font-bold text-primary">₹1,60,440</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Morning Huddle */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card className="gradient-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Morning Huddle</h3>
                    <p className="text-primary-foreground/70 text-sm">Daily meeting with Branch Managers</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Clock className="h-4 w-4 mr-1" />
                  Punch In
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Daily Activity Tracker */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-6"
        >
          <h2 className="font-semibold mb-4">Daily Activity Tracker</h2>
          <Tabs defaultValue="renewal" className="w-full">
            <TabsList className="w-full grid grid-cols-5 h-auto p-1">
              <TabsTrigger value="renewal" className="text-xs py-2 px-1">
                <RefreshCw className="h-3 w-3 mr-1" />
                Renewals
              </TabsTrigger>
              <TabsTrigger value="maturity" className="text-xs py-2 px-1">
                <IndianRupee className="h-3 w-3 mr-1" />
                Maturity
              </TabsTrigger>
              <TabsTrigger value="lapsing" className="text-xs py-2 px-1">
                Lapsing
              </TabsTrigger>
              <TabsTrigger value="birthday" className="text-xs py-2 px-1">
                <Gift className="h-3 w-3 mr-1" />
                Birthday
              </TabsTrigger>
              <TabsTrigger value="anniversary" className="text-xs py-2 px-1">
                Anniversary
              </TabsTrigger>
            </TabsList>
            <TabsContent value="renewal" className="mt-4 space-y-3">
              {mockEvents.filter(e => e.eventType === 'renewal').map((event, index) => (
                <PolicyEventCard key={event.id} event={event} index={index} />
              ))}
            </TabsContent>
            <TabsContent value="maturity" className="mt-4 space-y-3">
              {mockEvents.filter(e => e.eventType === 'maturity').map((event, index) => (
                <PolicyEventCard key={event.id} event={event} index={index} />
              ))}
            </TabsContent>
            <TabsContent value="lapsing" className="mt-4 space-y-3">
              {mockEvents.filter(e => e.eventType === 'lapsing').map((event, index) => (
                <PolicyEventCard key={event.id} event={event} index={index} />
              ))}
            </TabsContent>
            <TabsContent value="birthday" className="mt-4 space-y-3">
              {mockEvents.filter(e => e.eventType === 'birthday').map((event, index) => (
                <PolicyEventCard key={event.id} event={event} index={index} />
              ))}
            </TabsContent>
            <TabsContent value="anniversary" className="mt-4 space-y-3">
              {mockEvents.filter(e => e.eventType === 'anniversary').map((event, index) => (
                <PolicyEventCard key={event.id} event={event} index={index} />
              ))}
            </TabsContent>
          </Tabs>
        </motion.section>

        {/* Recommended For You */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h2 className="font-semibold mb-4">Recommended For You</h2>
          <div className="flex gap-2 flex-wrap">
            {['Recruitment Leads', 'Goal Sheet', 'Training', 'Campaigns', 'Contests'].map((item) => (
              <Badge key={item} variant="secondary" className="px-3 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                {item}
              </Badge>
            ))}
          </div>
        </motion.section>

        {/* Organisational Updates Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <h2 className="font-semibold mb-4">Organisational Updates</h2>
          <div className="relative overflow-hidden rounded-xl">
            <motion.div
              key={currentBanner}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className={`bg-gradient-to-r ${banners[currentBanner].color} p-6 rounded-xl text-primary-foreground`}
            >
              <div className="flex items-center gap-3">
                <Megaphone className="h-8 w-8" />
                <div>
                  <h3 className="font-bold">{banners[currentBanner].title}</h3>
                  <p className="text-primary-foreground/80 text-sm">{banners[currentBanner].subtitle}</p>
                </div>
              </div>
            </motion.div>
            <div className="flex justify-center gap-1 mt-3">
              {banners.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentBanner ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

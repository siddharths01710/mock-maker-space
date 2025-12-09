import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, RefreshCw, FileCheck, Clock, AlertTriangle, Home, Gift, Shield, Phone, ChevronRight, Headphones, FileText, MessageSquareHeart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TopNavBar } from '@/components/layout/TopNavBar';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { AISummaryCard } from '@/components/shared/AISummaryCard';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/data/categories';
import { motion } from 'framer-motion';

interface Customer {
  id: string;
  name: string;
  policyNumber: string;
  policyName: string;
  mobile: string;
  isActive: boolean;
  sumAssured: number;
  premiumAmount: number;
  upcomingEvent: string;
  eventDate: string;
  category: 'all' | 'renewal' | 'active' | 'maturing' | 'lapsing' | 'household' | 'offers' | 'pasa';
}

const mockCustomers: Customer[] = [
  { id: '1', name: 'Rajesh Kumar', policyNumber: 'POL-2024-001', policyName: 'Life Secure Plus', mobile: '+91 98765 43210', isActive: true, sumAssured: 2500000, premiumAmount: 25000, upcomingEvent: 'Renewal Due', eventDate: '15 Jan 2025', category: 'renewal' },
  { id: '2', name: 'Priya Sharma', policyNumber: 'POL-2024-002', policyName: 'Term Shield Pro', mobile: '+91 87654 32109', isActive: true, sumAssured: 5000000, premiumAmount: 12000, upcomingEvent: 'Anniversary', eventDate: '20 Jan 2025', category: 'active' },
  { id: '3', name: 'Amit Patel', policyNumber: 'POL-2023-045', policyName: 'Wealth Builder', mobile: '+91 76543 21098', isActive: true, sumAssured: 1000000, premiumAmount: 50000, upcomingEvent: 'Maturity', eventDate: '28 Feb 2025', category: 'maturing' },
  { id: '4', name: 'Sneha Reddy', policyNumber: 'POL-2022-078', policyName: 'Family Protector', mobile: '+91 65432 10987', isActive: false, sumAssured: 3000000, premiumAmount: 30000, upcomingEvent: 'Lapse Warning', eventDate: '10 Jan 2025', category: 'lapsing' },
  { id: '5', name: 'Vikram Singh', policyNumber: 'POL-2024-015', policyName: 'Smart Invest', mobile: '+91 54321 09876', isActive: true, sumAssured: 1500000, premiumAmount: 20000, upcomingEvent: 'Birthday', eventDate: '05 Feb 2025', category: 'household' },
  { id: '6', name: 'Anita Desai', policyNumber: 'POL-2023-089', policyName: 'Health Guard', mobile: '+91 43210 98765', isActive: true, sumAssured: 500000, premiumAmount: 8000, upcomingEvent: 'Offer Available', eventDate: '-', category: 'offers' },
  { id: '7', name: 'Rahul Mehta', policyNumber: 'POL-2024-023', policyName: 'Child Future Plan', mobile: '+91 32109 87654', isActive: true, sumAssured: 2000000, premiumAmount: 35000, upcomingEvent: 'PASA Eligible', eventDate: '-', category: 'pasa' },
  { id: '8', name: 'Kavita Joshi', policyNumber: 'POL-2023-056', policyName: 'Retirement Plus', mobile: '+91 21098 76543', isActive: true, sumAssured: 4000000, premiumAmount: 60000, upcomingEvent: 'Renewal Due', eventDate: '22 Jan 2025', category: 'renewal' },
];

const summaryItems = [
  { id: 'all', label: 'All Customers', count: 156, icon: Users, color: 'bg-primary' },
  { id: 'renewal', label: 'Upcoming Renewals', count: 23, subValue: '₹45.2L', icon: RefreshCw, color: 'bg-orange-500' },
  { id: 'active', label: 'Active Policies', count: 142, icon: FileCheck, color: 'bg-green-500' },
  { id: 'maturing', label: 'Maturing Policies', count: 8, subValue: '₹1.2Cr', icon: Clock, color: 'bg-blue-500' },
  { id: 'lapsing', label: 'Lapsing Policy', count: 5, icon: AlertTriangle, color: 'bg-red-500' },
  { id: 'household', label: 'Households', count: 89, icon: Home, color: 'bg-purple-500' },
  { id: 'offers', label: 'Offers Available', count: 34, icon: Gift, color: 'bg-amber-500' },
  { id: 'pasa', label: 'PASA Eligible', count: 12, icon: Shield, color: 'bg-teal-500' },
];

export default function MyCustomers() {
  const navigate = useNavigate();
  const { language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const t = (key: string) => translations[key]?.[language] || translations[key]?.EN || key;

  const filteredCustomers = selectedCategory
    ? selectedCategory === 'all'
      ? mockCustomers
      : mockCustomers.filter(c => c.category === selectedCategory)
    : [];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleCall = (mobile: string) => {
    window.location.href = `tel:${mobile.replace(/\s/g, '')}`;
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar />
      <SideNavigation />

      <main className="pt-14 pb-20 px-4">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3 py-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => selectedCategory ? setSelectedCategory(null) : navigate('/')}
              className="h-9 w-9"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">
                {selectedCategory 
                  ? summaryItems.find(s => s.id === selectedCategory)?.label || 'Customers'
                  : 'My Customers'}
              </h1>
              <p className="text-xs text-muted-foreground">
                {selectedCategory ? `${filteredCustomers.length} customers` : 'Manage your customer portfolio'}
              </p>
            </div>
          </div>

          {!selectedCategory ? (
            <>
              {/* AI Summary */}
              <AISummaryCard
                summary="Your portfolio has 5 policies at lapse risk requiring immediate attention. 23 renewals worth ₹45.2L are due this month. Focus on 12 PASA eligible customers for cross-sell opportunities."
              />

              {/* Customer Summary Banner */}
              <Card>
                <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-3">Customer Summary</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {summaryItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <button
                            onClick={() => handleCategoryClick(item.id)}
                            className="w-full p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left h-full"
                          >
                            <div className="flex items-start gap-2">
                              <div className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                                <Icon className="h-3.5 w-3.5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0 overflow-hidden">
                                <p className="text-base font-bold leading-tight">{item.count}</p>
                                <p className="text-[10px] text-muted-foreground leading-tight">{item.label}</p>
                                {item.subValue && (
                                  <p className="text-[10px] font-medium text-primary mt-0.5">{item.subValue}</p>
                                )}
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground mt-1" />
                            </div>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Servicing Tools */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-3">Customer Servicing</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'customer-servicing', label: 'Customer Servicing', subtitle: 'Raise and Track Customer SRs', icon: Headphones, color: 'bg-blue-500' },
                      { id: 'policy-documents', label: 'Policy Documents', subtitle: 'Download Policy Statements and Documents with ease', icon: FileText, color: 'bg-green-500' },
                      { id: 'customer-greeting', label: 'Customer Greeting', subtitle: 'Personalised Communication Templates', icon: MessageSquareHeart, color: 'bg-pink-500' },
                    ].map((tool, index) => {
                      const Icon = tool.icon;
                      return (
                        <motion.div
                          key={tool.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <button
                            onClick={() => navigate(`/tool/${tool.id}`)}
                            className="w-full p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl ${tool.color} flex items-center justify-center flex-shrink-0`}>
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold">{tool.label}</p>
                                <p className="text-xs text-muted-foreground">{tool.subtitle}</p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            /* Customer List View */
            <div className="space-y-3">
              {filteredCustomers.map((customer, index) => (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{customer.name}</h4>
                            <Badge 
                              variant={customer.isActive ? "default" : "destructive"}
                              className="text-[10px] px-1.5 py-0"
                            >
                              {customer.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{customer.policyNumber}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-muted/50 rounded-lg p-2">
                          <p className="text-[10px] text-muted-foreground">Policy</p>
                          <p className="text-xs font-medium truncate">{customer.policyName}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-2">
                          <p className="text-[10px] text-muted-foreground">Mobile</p>
                          <p className="text-xs font-medium">{customer.mobile}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-2">
                          <p className="text-[10px] text-muted-foreground">Sum Assured</p>
                          <p className="text-xs font-medium">{formatCurrency(customer.sumAssured)}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-2">
                          <p className="text-[10px] text-muted-foreground">Premium</p>
                          <p className="text-xs font-medium">{formatCurrency(customer.premiumAmount)}/yr</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2 bg-primary/5 rounded-lg mb-3">
                        <div>
                          <p className="text-[10px] text-muted-foreground">Upcoming Event</p>
                          <p className="text-xs font-medium text-primary">{customer.upcomingEvent}</p>
                        </div>
                        {customer.eventDate !== '-' && (
                          <Badge variant="outline" className="text-[10px]">{customer.eventDate}</Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleCall(customer.mobile)}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => navigate(`/customer/${customer.id}`)}
                        >
                          View Profile
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
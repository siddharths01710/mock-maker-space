import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Users, UserCheck, Clock, CheckCircle, XCircle, Gift, FileText, Target, BookOpen, ClipboardList, Phone, User, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TopNavBar } from '@/components/layout/TopNavBar';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { AISummaryCard } from '@/components/shared/AISummaryCard';
import { motion } from 'framer-motion';
import { FloatingChatButton } from '@/components/shared/FloatingChatButton';

type LeadDisposition = 'Assigned' | 'Follow Up' | 'Converted' | 'Negative';

interface Lead {
  id: string;
  name: string;
  disposition: LeadDisposition;
  mobile: string;
  expectedPremium: number;
  existingProduct?: string;
}

const mockLeads: Lead[] = [
  { id: '1', name: 'Rajesh Kumar', disposition: 'Assigned', mobile: '9876543210', expectedPremium: 25000, existingProduct: 'Term Life - ₹50L' },
  { id: '2', name: 'Priya Sharma', disposition: 'Follow Up', mobile: '9876543211', expectedPremium: 35000 },
  { id: '3', name: 'Amit Patel', disposition: 'Converted', mobile: '9876543212', expectedPremium: 45000, existingProduct: 'Health Shield - ₹10L' },
  { id: '4', name: 'Sunita Gupta', disposition: 'Negative', mobile: '9876543213', expectedPremium: 20000 },
  { id: '5', name: 'Vikram Singh', disposition: 'Assigned', mobile: '9876543214', expectedPremium: 55000 },
  { id: '6', name: 'Meera Reddy', disposition: 'Follow Up', mobile: '9876543215', expectedPremium: 30000, existingProduct: 'ULIP - ₹25L' },
  { id: '7', name: 'Kiran Desai', disposition: 'Converted', mobile: '9876543216', expectedPremium: 40000 },
  { id: '8', name: 'Anand Joshi', disposition: 'Assigned', mobile: '9876543217', expectedPremium: 28000 },
];

const leadSummary = {
  all: mockLeads.length,
  assigned: mockLeads.filter(l => l.disposition === 'Assigned').length,
  followUp: mockLeads.filter(l => l.disposition === 'Follow Up').length,
  converted: mockLeads.filter(l => l.disposition === 'Converted').length,
  negative: mockLeads.filter(l => l.disposition === 'Negative').length,
  referral: 3,
};

const tools = [
  { id: 'quotation', name: 'Quotation Modules', subtitle: 'Create Quotes within seconds', icon: FileText },
  { id: 'pitches', name: 'Product Pitches', subtitle: 'Pitch with Precision', icon: Target },
  { id: 'underwriting', name: 'Underwriting Guidelines', subtitle: 'All information in one Place', icon: BookOpen },
  { id: 'tracker', name: 'Application Tracker', subtitle: 'Track all applications with ease', icon: ClipboardList },
];

const getDispositionColor = (disposition: LeadDisposition) => {
  switch (disposition) {
    case 'Assigned': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    case 'Follow Up': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    case 'Converted': return 'bg-green-500/10 text-green-600 border-green-500/20';
    case 'Negative': return 'bg-red-500/10 text-red-600 border-red-500/20';
  }
};

export default function LeadManagement() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showLeadsList, setShowLeadsList] = useState(false);
  const [filterDisposition, setFilterDisposition] = useState<string | null>(null);

  // Check if navigated from chat with view=leads param
  useEffect(() => {
    if (searchParams.get('view') === 'leads') {
      setShowLeadsList(true);
    }
  }, [searchParams]);

  const filteredLeads = filterDisposition 
    ? mockLeads.filter(l => l.disposition === filterDisposition)
    : mockLeads;

  const handleSummaryClick = (type: string) => {
    if (type === 'all') {
      setFilterDisposition(null);
    } else if (type === 'referral') {
      // Handle referral leads separately
      setFilterDisposition(null);
    } else {
      const dispositionMap: Record<string, LeadDisposition> = {
        assigned: 'Assigned',
        followUp: 'Follow Up',
        converted: 'Converted',
        negative: 'Negative',
      };
      setFilterDisposition(dispositionMap[type] || null);
    }
    setShowLeadsList(true);
  };

  const handleCall = (mobile: string) => {
    window.location.href = `tel:${mobile}`;
  };

  if (showLeadsList) {
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
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="icon" onClick={() => setShowLeadsList(false)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">
                  {filterDisposition ? `${filterDisposition} Leads` : 'All Leads'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {filteredLeads.length} leads found
                </p>
              </div>
            </div>
          </motion.div>

          {/* Lead Cards */}
          <div className="space-y-3">
            {filteredLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{lead.name}</h3>
                          <p className="text-sm text-muted-foreground">{lead.mobile}</p>
                        </div>
                      </div>
                      <Badge className={`${getDispositionColor(lead.disposition)} border`}>
                        {lead.disposition}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Expected Premium</span>
                        <span className="font-medium">₹{lead.expectedPremium.toLocaleString()}/yr</span>
                      </div>
                      {lead.existingProduct && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Existing Product</span>
                          <span className="font-medium text-primary">{lead.existingProduct}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleCall(lead.mobile)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(`/lead/${lead.id}`)}
                      >
                        View Profile
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>

        <FloatingChatButton />
      </div>
    );
  }

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
              <h1 className="text-xl font-bold">Lead Management</h1>
              <p className="text-sm text-muted-foreground">
                Manage and track all your leads
              </p>
            </div>
          </div>
        </motion.div>

        {/* AI Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <AISummaryCard
            summary="You have 3 high-priority leads requiring immediate follow-up. 2 leads are ready for conversion - schedule meetings today for optimal results."
            onViewInsights={() => {}}
          />
        </motion.section>

        {/* Lead Summary Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">LEAD SUMMARY</h2>
          <div className="grid grid-cols-3 gap-2">
            <Card 
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => handleSummaryClick('all')}
            >
              <CardContent className="p-3 text-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <p className="text-lg font-bold">{leadSummary.all}</p>
                <p className="text-xs text-muted-foreground">All Leads</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-blue-500/50 transition-colors"
              onClick={() => handleSummaryClick('assigned')}
            >
              <CardContent className="p-3 text-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
                  <UserCheck className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-lg font-bold">{leadSummary.assigned}</p>
                <p className="text-xs text-muted-foreground">Assigned</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-amber-500/50 transition-colors"
              onClick={() => handleSummaryClick('followUp')}
            >
              <CardContent className="p-3 text-center">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
                <p className="text-lg font-bold">{leadSummary.followUp}</p>
                <p className="text-xs text-muted-foreground">Follow Up</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-green-500/50 transition-colors"
              onClick={() => handleSummaryClick('converted')}
            >
              <CardContent className="p-3 text-center">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-lg font-bold">{leadSummary.converted}</p>
                <p className="text-xs text-muted-foreground">Converted</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-red-500/50 transition-colors"
              onClick={() => handleSummaryClick('negative')}
            >
              <CardContent className="p-3 text-center">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                </div>
                <p className="text-lg font-bold">{leadSummary.negative}</p>
                <p className="text-xs text-muted-foreground">Negative</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-purple-500/50 transition-colors"
              onClick={() => handleSummaryClick('referral')}
            >
              <CardContent className="p-3 text-center">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-2">
                  <Gift className="h-4 w-4 text-purple-500" />
                </div>
                <p className="text-lg font-bold">{leadSummary.referral}</p>
                <p className="text-xs text-muted-foreground">Referral</p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Tools Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">TOOLS</h2>
          <div className="space-y-3">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
              >
                <Card 
                  className="cursor-pointer hover:border-primary/50 transition-all hover:shadow-md"
                  onClick={() => navigate(`/tool/${tool.id}`)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground">{tool.subtitle}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <FloatingChatButton />
    </div>
  );
}

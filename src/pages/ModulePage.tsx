import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, User, Download, Filter, Search, MapPin, Calculator, FileText, Award, BookOpen, HelpCircle, Zap } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TopNavBar } from '@/components/layout/TopNavBar';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { AISummaryCard } from '@/components/shared/AISummaryCard';
import { useApp } from '@/contexts/AppContext';
import { categories } from '@/data/categories';
import { motion } from 'framer-motion';
import { FloatingChatButton } from '@/components/shared/FloatingChatButton';

// Mock data for different modules
const mockRecruitmentLeads = [
  { id: '1', name: 'Amit Kumar', contact: '9876543210', source: 'Referral', income: '₹5L-10L', education: 'Graduate', disposition: 'Assigned' },
  { id: '2', name: 'Sneha Reddy', contact: '9876543211', source: 'Walk-in', income: '₹3L-5L', education: 'Post Graduate', disposition: 'Met' },
  { id: '3', name: 'Raj Patel', contact: '9876543212', source: 'Digital', income: '₹10L+', education: 'Graduate', disposition: 'Follow Up' },
  { id: '4', name: 'Priya Menon', contact: '9876543213', source: 'Referral', income: '₹5L-10L', education: 'Graduate', disposition: 'Converted' },
];

const mockJobs = [
  { id: '1', title: 'Insurance Sales Executive', location: 'Mumbai', experience: '0-12 months' },
  { id: '2', title: 'Financial Advisor', location: 'Pune', experience: '12-24 months' },
  { id: '3', title: 'Relationship Manager', location: 'Delhi', experience: '24-36 months' },
];

const mockContests = [
  { id: '1', name: 'Q4 Sales Champion', status: 'Live', enrolled: 245, prize: '₹50,000' },
  { id: '2', name: 'Persistency Star', status: 'Upcoming', enrolled: 0, prize: '₹25,000' },
  { id: '3', name: 'New Business Sprint', status: 'Live', enrolled: 189, prize: '₹35,000' },
];

export default function ModulePage() {
  const { categoryId, moduleId } = useParams<{ categoryId: string; moduleId: string }>();
  const { language } = useApp();
  const navigate = useNavigate();

  const category = categories.find((c) => c.id === categoryId);
  const module = category?.modules.find((m) => m.id === moduleId);

  if (!category || !module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Module not found</p>
      </div>
    );
  }

  const moduleName = language === 'HI' ? module.nameHi : module.name;

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  const renderModuleContent = () => {
    switch (moduleId) {
      case 'about-bajaj':
        return (
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">About Bajaj Life Insurance</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Bajaj Life Insurance Company Limited is a joint venture between Bajaj Finserv Limited and Allianz SE.
                With a legacy of over two decades, we are committed to protecting families and empowering them to achieve their life goals.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Our mission is to provide innovative insurance solutions that offer financial security and peace of mind to our customers.
                We leverage cutting-edge technology and a customer-centric approach to deliver exceptional service.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <p className="text-2xl font-bold text-primary">20+</p>
                  <p className="text-xs text-muted-foreground">Years of Trust</p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <p className="text-2xl font-bold text-primary">5Cr+</p>
                  <p className="text-xs text-muted-foreground">Lives Insured</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'careers':
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Open Positions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockJobs.map((job) => (
                  <div key={job.id} className="p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{job.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          📍 {job.location} • 🕒 {job.experience}
                        </p>
                      </div>
                      <Button size="sm" variant="accent">Apply Now</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">How To Apply</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                    <span>Click "Apply Now" on your preferred position</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                    <span>Fill in your personal, academic and professional details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                    <span>Upload required documents (Resume, ID, Education certificates)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                    <span>Complete the online assessment</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        );

      case 'insurance-easy':
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-32 h-32 rounded-3xl gradient-primary flex items-center justify-center shadow-lg cursor-pointer"
            >
              <BookOpen className="h-16 w-16 text-primary-foreground" />
            </motion.div>
            <h3 className="font-semibold mt-6 text-lg">Insurance Made Easy</h3>
            <p className="text-sm text-muted-foreground text-center mt-2 max-w-xs">
              Demystify insurance and learn all terminologies related to it
            </p>
            <Button variant="accent" className="mt-6">
              Start Learning
            </Button>
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">CEO's Message</h3>
                    <p className="text-xs text-muted-foreground mb-3">Tarun Chugh, MD & CEO</p>
                    <p className="text-sm text-muted-foreground italic">
                      "At Bajaj Life, we believe in empowering our sales force with the best tools and support. 
                      Our commitment to your success is unwavering, and together we will continue to protect millions of families across India."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {[
              { name: 'Rahul Sharma', title: 'Senior Sales Manager', testimonial: 'Working at Bajaj Life has transformed my career. The support and training provided are exceptional.' },
              { name: 'Priya Patel', title: 'Insurance Advisor', testimonial: 'The technology tools and customer-first approach make selling insurance a rewarding experience.' },
            ].map((person, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{person.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{person.title}</p>
                      <p className="text-sm text-muted-foreground italic">"{person.testimonial}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'product-suite':
        return (
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'Term', icon: 'Shield', desc: 'Pure protection plans' },
              { name: 'Non-Term', icon: 'PiggyBank', desc: 'Savings & endowment' },
              { name: 'ULIP', icon: 'TrendingUp', desc: 'Market-linked returns' },
            ].map((product) => (
              <motion.div
                key={product.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="cursor-pointer hover:border-primary/30 transition-colors">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      {getIcon(product.icon)}
                    </div>
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{product.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        );

      case 'recruitment-leads':
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search leads..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {mockRecruitmentLeads.map((lead) => (
                <Card key={lead.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{lead.name}</h4>
                          <p className="text-xs text-muted-foreground">{lead.contact}</p>
                        </div>
                      </div>
                      <Badge variant={lead.disposition === 'Converted' ? 'default' : 'secondary'} className="text-xs">
                        {lead.disposition}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-3">
                      <div>Source: {lead.source}</div>
                      <div>Income: {lead.income}</div>
                      <div>Edu: {lead.education}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        Update
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'area-map':
        return (
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="font-medium">Pune - Kalyani Nagar</p>
                  <p className="text-sm text-muted-foreground">3 Active Hotspots</p>
                </div>
              </div>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Prospect Hotspots</h4>
                <div className="space-y-2">
                  {['Kalyani Nagar Main Road', 'Viman Nagar', 'Koregaon Park'].map((area, index) => (
                    <div key={area} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-sm">{area}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">{12 - index * 3} leads</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'goal-sheet':
        return (
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <Calculator className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold">Goal Sheet Calculator</h3>
                <p className="text-sm text-muted-foreground">Be in control of your leads</p>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Leads to Convert', actual: 15, target: 20 },
                  { label: 'Login NOP', actual: 8, target: 12 },
                  { label: 'Issuance NOP', actual: 5, target: 10 },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.label}</span>
                      <span className="font-medium">{item.actual} / {item.target}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(item.actual / item.target) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'incentive-snapshot':
        return (
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-accent mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">This Month's Incentive</p>
                <p className="text-3xl font-bold mt-2">₹15,450</p>
                <p className="text-sm text-muted-foreground mt-4">Last Quarter Total: ₹42,300</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Incentive Calculation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-2">Formula</p>
                  <p className="text-sm font-medium">1% of WPC + ₹3,000 (if Persistency {'>'} 90%)</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">WPC Amount</span>
                    <span className="font-medium">₹12,45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">1% of WPC</span>
                    <span className="font-medium">₹12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Persistency Bonus</span>
                    <span className="font-medium text-success">₹3,000</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">Total Incentive</span>
                    <span className="font-bold text-accent">₹15,450</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'rnr-contests':
        return (
          <div className="space-y-4">
            {mockContests.map((contest) => (
              <Card key={contest.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{contest.name}</h4>
                      <Badge 
                        variant={contest.status === 'Live' ? 'default' : 'secondary'}
                        className={`text-xs mt-1 ${contest.status === 'Live' ? 'bg-success' : ''}`}
                      >
                        {contest.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent">{contest.prize}</p>
                      <p className="text-xs text-muted-foreground">{contest.enrolled} enrolled</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {contest.status === 'Live' ? 'View Details' : 'Get Notified'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'career-path':
        return (
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-center mb-6">Your Career Journey</h3>
              <div className="relative">
                {['Agent', 'Sales Manager', 'Branch Head', 'Regional Head', 'General Manager'].map((level, index) => (
                  <div key={level} className="flex items-center gap-4 mb-6 last:mb-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      index === 1 ? 'gradient-accent text-accent-foreground shadow-lg' : 
                      index < 1 ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {index < 1 ? '✓' : index === 1 ? <Zap className="h-5 w-5" /> : (index + 1)}
                    </div>
                    <div className={index === 1 ? 'font-semibold' : ''}>
                      <p className="text-sm">{level}</p>
                      {index === 1 && <p className="text-xs text-accent">Current Level</p>}
                    </div>
                    {index < 4 && (
                      <div className="absolute left-6 mt-12 w-0.5 h-6 bg-muted" style={{ top: `${index * 72}px` }} />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'support-help':
        return (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 text-center">
                <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-6">We're here to support you</p>
                <div className="space-y-3">
                  <Button variant="default" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    IT Help Desk: 1800-209-5858
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Branch Support: 1800-209-0144
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'ic-prospect-tracker':
        // IC Prospect Tracker opens the Area Map feature
        return (
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="font-medium">Pune - Kalyani Nagar</p>
                  <p className="text-sm text-muted-foreground">3 Active Hotspots</p>
                </div>
              </div>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Prospect Hotspots</h4>
                <div className="space-y-2">
                  {['Kalyani Nagar Main Road', 'Viman Nagar', 'Koregaon Park'].map((area, index) => (
                    <div key={area} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm">{area}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">{12 - index * 3} leads</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {getIcon(module.icon)}
              </div>
              <h3 className="font-semibold mb-2">{moduleName}</h3>
              <p className="text-sm text-muted-foreground">
                This module is under development. Check back soon for updates.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {getIcon(module.icon)}
              </div>
              <h1 className="text-xl font-bold">{moduleName}</h1>
            </div>
          </div>
        </motion.div>

        {/* AI Summary for relevant modules */}
        {module.hasAiSummary && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <AISummaryCard
              summary={`You have 12 active items in ${moduleName}. 3 require immediate attention. Your conversion rate is 15% above average.`}
              onViewInsights={() => {}}
            />
          </motion.section>
        )}

        {/* Module Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {renderModuleContent()}
        </motion.section>
      </main>

      <FloatingChatButton />
    </div>
  );
}

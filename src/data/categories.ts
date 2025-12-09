import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'join-bajaj-life',
    name: 'Join Bajaj Life',
    nameHi: 'जॉइन बजाज लाइफ',
    icon: 'Briefcase',
    restrictedTo: ['prospect_agent'],
    modules: [
      { id: 'about-bajaj', name: 'About Bajaj Life', nameHi: 'अबाउट बजाज लाइफ', icon: 'Info' },
      { id: 'careers', name: 'Careers', nameHi: 'करियर्स', icon: 'GraduationCap' },
      { id: 'insurance-easy', name: 'Insurance Made Easy', nameHi: 'इंश्योरेंस मेड ईज़ी', icon: 'Lightbulb' },
      { id: 'testimonials', name: 'Testimonials', nameHi: 'टेस्टिमोनियल्स', icon: 'Quote' },
      { id: 'product-suite', name: 'Our LI Product Suite', nameHi: 'अवर LI प्रोडक्ट सूट', icon: 'Package' },
    ],
  },
  {
    id: 'my-activities',
    name: 'My Activities',
    nameHi: 'माय एक्टिविटीज़',
    icon: 'Activity',
    modules: [
      { id: 'kpi-snapshot', name: 'KPI Snapshot', nameHi: 'KPI स्नैपशॉट', icon: 'BarChart3', hasAiSummary: true },
      { id: 'commission-snapshot', name: 'Commission Snapshot', nameHi: 'कमीशन स्नैपशॉट', icon: 'Trophy' },
      { id: 'morning-huddle', name: 'Morning Huddle', nameHi: 'मॉर्निंग हडल', icon: 'Users' },
      { id: 'daily-tracker', name: 'Daily Activity Tracker', nameHi: 'डेली एक्टिविटी ट्रैकर', icon: 'Calendar' },
      { id: 'recommended', name: 'Recommended For You', nameHi: 'रिकमेंडेड फॉर यू', icon: 'Star' },
      { id: 'org-updates', name: 'Organisational Updates', nameHi: 'ऑर्गनाइज़ेशनल अपडेट्स', icon: 'Bell' },
    ],
  },
  {
    id: 'recruitment-corner',
    name: 'Recruitment Corner',
    nameHi: 'रिक्रूटमेंट कॉर्नर',
    icon: 'UserPlus',
    modules: [
      { id: 'recruitment-leads', name: 'Recruitment Leads', nameHi: 'रिक्रूटमेंट लीड्स', icon: 'Users', hasAiSummary: true },
      { id: 'onboarding-tracker', name: 'Onboarding Tracker', nameHi: 'ऑनबोर्डिंग ट्रैकर', icon: 'ClipboardCheck' },
      { id: 'ic-training', name: 'IC Training', nameHi: 'IC ट्रेनिंग', icon: 'BookOpen' },
      { id: 'ic-activation', name: 'IC Activation', nameHi: 'IC एक्टिवेशन', icon: 'Zap' },
      { id: 'ic-prospect-tracker', name: 'IC Prospect Tracker', nameHi: 'IC प्रॉस्पेक्ट ट्रैकर', icon: 'MapPin' },
      { id: 'reports', name: 'Reports', nameHi: 'रिपोर्ट्स', icon: 'FileText' },
    ],
  },
  {
    id: 'lead-retention-pool',
    name: 'Lead Management',
    nameHi: 'लीड मैनेजमेंट',
    icon: 'Target',
    modules: [
      { id: 'retention-chart', name: 'Lead Retention Pie Chart', nameHi: 'लीड रिटेंशन पाई चार्ट', icon: 'PieChart', hasAiSummary: true },
      { id: 'negative-closures', name: 'Past Negative Closures', nameHi: 'पास्ट नेगेटिव क्लोज़र्स', icon: 'XCircle' },
      { id: 'household-leads', name: 'Household Leads', nameHi: 'हाउसहोल्ड लीड्स', icon: 'Home' },
      { id: 'referral-leads', name: 'Referral Leads', nameHi: 'रेफरल लीड्स', icon: 'Share2' },
    ],
  },
  {
    id: 'my-customers',
    name: 'My Customers',
    nameHi: 'माय कस्टमर्स',
    icon: 'Users',
    modules: [
      { id: 'all-customers', name: 'All Customers View', nameHi: 'ऑल कस्टमर्स व्यू', icon: 'Users', hasAiSummary: true },
      { id: 'renewals', name: 'Renewals / Maturity / Lapse', nameHi: 'रिन्यूअल्स / मैच्योरिटी / लैप्स', icon: 'RefreshCw' },
      { id: 'campaigns', name: 'Campaigns & Upsell', nameHi: 'कैंपेन्स & अपसेल', icon: 'Megaphone' },
      { id: 'customer-events', name: 'Customer Events', nameHi: 'कस्टमर इवेंट्स', icon: 'Gift' },
      { id: 'customer-servicing', name: 'Customer Servicing', nameHi: 'कस्टमर सर्विसिंग', icon: 'Headphones' },
    ],
  },
  {
    id: 'my-performance',
    name: 'My Performance',
    nameHi: 'माय परफॉर्मेंस',
    icon: 'TrendingUp',
    modules: [
      { id: 'kpi-breakup', name: 'KPI Breakup', nameHi: 'KPI ब्रेकअप', icon: 'BarChart3', hasAiSummary: true },
      { id: 'incentive-snapshot', name: 'Incentive Snapshot', nameHi: 'इंसेंटिव स्नैपशॉट', icon: 'Award' },
      { id: 'commission-view', name: 'Commission View', nameHi: 'कमीशन व्यू', icon: 'DollarSign' },
      { id: 'rnr-contests', name: 'RnR & Contests', nameHi: 'RnR & कॉन्टेस्ट्स', icon: 'Trophy' },
    ],
  },
  {
    id: 'my-corner',
    name: 'My Corner',
    nameHi: 'माय कॉर्नर',
    icon: 'User',
    modules: [
      { id: 'my-profile', name: 'My Profile', nameHi: 'माय प्रोफाइल', icon: 'User' },
      { id: 'training-corner', name: 'Training Corner', nameHi: 'ट्रेनिंग कॉर्नर', icon: 'BookOpen' },
      { id: 'career-path', name: 'Career Path', nameHi: 'करियर पाथ', icon: 'Route' },
      { id: 'support-help', name: 'Support & Help Desk', nameHi: 'सपोर्ट & हेल्प डेस्क', icon: 'HelpCircle' },
    ],
  },
];

export const translations: Record<string, { EN: string; HI: string }> = {
  welcome: { EN: 'Welcome', HI: 'वेलकम' },
  dashboard: { EN: 'Dashboard', HI: 'डैशबोर्ड' },
  search: { EN: 'Search by keywords...', HI: 'कीवर्ड्स से सर्च करें...' },
  login: { EN: 'Login', HI: 'लॉगिन' },
  logout: { EN: 'Logout', HI: 'लॉगआउट' },
  viewInsights: { EN: 'View Insights', HI: 'व्यू इनसाइट्स' },
  aiSummary: { EN: 'AI Summary', HI: 'AI समरी' },
  detailedView: { EN: 'Detailed View', HI: 'डीटेल्ड व्यू' },
  gridView: { EN: 'Menu Grid', HI: 'मेनू ग्रिड' },
  chatView: { EN: 'AI Chat', HI: 'AI चैट' },
};

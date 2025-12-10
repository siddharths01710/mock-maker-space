import { ArrowRight, Briefcase, MapPin, Clock, BookOpen, Quote, Building2, Shield, PiggyBank, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TopNavBar } from '@/components/layout/TopNavBar';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { motion } from 'framer-motion';
import { FloatingChatButton } from '@/components/shared/FloatingChatButton';

const mockJobs = [
  { id: '1', title: 'Insurance Sales Executive', location: 'Mumbai', experience: '0-12 months' },
  { id: '2', title: 'Financial Advisor', location: 'Pune', experience: '12-24 months' },
  { id: '3', title: 'Relationship Manager', location: 'Delhi', experience: '24-36 months' },
  { id: '4', title: 'Senior Sales Manager', location: 'Bangalore', experience: '36-48 months' },
  { id: '5', title: 'Branch Manager', location: 'Chennai', experience: '48+ months' },
];

const testimonials = [
  { id: '1', name: 'Rahul Sharma', title: 'Senior Sales Manager', years: '5 years', quote: 'Working at Bajaj Life has transformed my career. The support and training provided are exceptional. I have grown both professionally and personally.' },
  { id: '2', name: 'Priya Patel', title: 'Insurance Advisor', years: '3 years', quote: 'The technology tools and customer-first approach make selling insurance a rewarding experience. The work-life balance here is excellent.' },
  { id: '3', name: 'Amit Kumar', title: 'Branch Manager', years: '8 years', quote: 'Bajaj Life has given me opportunities I never imagined. From an advisor to Branch Manager, the growth has been phenomenal.' },
  { id: '4', name: 'Sneha Reddy', title: 'Financial Advisor', years: '2 years', quote: 'The training programs are world-class. I feel confident every day knowing I am backed by a great organization.' },
];

export default function ProspectAgentDashboard() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavBar />
      <SideNavigation />

      <main className="pt-16 px-4">
        {/* About Bajaj Life Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">About Bajaj Life</h2>
              <p className="text-sm text-muted-foreground">Your Partner in Protection</p>
            </div>
          </div>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Bajaj Life Insurance Company Limited is a joint venture between Bajaj Finserv Limited and Allianz SE. 
                With a legacy of over two decades, we are committed to protecting families and empowering them to achieve their life goals.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Our mission is to provide innovative insurance solutions that offer financial security and peace of mind to our customers.
                We leverage cutting-edge technology and a customer-centric approach to deliver exceptional service across India.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="text-center p-3 bg-primary/5 rounded-xl">
                  <p className="text-xl font-bold text-primary">20+</p>
                  <p className="text-[10px] text-muted-foreground">Years of Trust</p>
                </div>
                <div className="text-center p-3 bg-primary/5 rounded-xl">
                  <p className="text-xl font-bold text-primary">5Cr+</p>
                  <p className="text-[10px] text-muted-foreground">Lives Insured</p>
                </div>
                <div className="text-center p-3 bg-primary/5 rounded-xl">
                  <p className="text-xl font-bold text-primary">500+</p>
                  <p className="text-[10px] text-muted-foreground">Branches</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Product Suite Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="font-semibold mb-4">Product Suite</h2>
          <div className="grid grid-cols-3 gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Card className="cursor-pointer hover:border-primary/50 transition-colors h-full">
                <CardContent className="p-4 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
                    <Shield className="h-6 w-6 text-blue-500" />
                  </div>
                  <h4 className="font-medium text-sm">Term Products</h4>
                  <p className="text-[10px] text-muted-foreground mt-1">Pure protection plans</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Card className="cursor-pointer hover:border-primary/50 transition-colors h-full">
                <CardContent className="p-4 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
                    <PiggyBank className="h-6 w-6 text-green-500" />
                  </div>
                  <h4 className="font-medium text-sm">Traditional Products</h4>
                  <p className="text-[10px] text-muted-foreground mt-1">Savings & endowment</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Card className="cursor-pointer hover:border-primary/50 transition-colors h-full">
                <CardContent className="p-4 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                  </div>
                  <h4 className="font-medium text-sm">ULIP Products</h4>
                  <p className="text-[10px] text-muted-foreground mt-1">Market-linked returns</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Insurance Made Easy Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-br from-accent/10 to-transparent border-accent/20 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Insurance Made Easy</h3>
                  <p className="text-sm text-muted-foreground mt-1">Learn about key Insurance Terminologies</p>
                </div>
              </div>
              <Button variant="accent" className="w-full mt-4">
                Start Learning
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.section>

        {/* Careers Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Careers</h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs">
              View All
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {mockJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                className="flex-shrink-0 w-64"
              >
                <Card className="h-full">
                  <CardContent className="p-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-sm mb-2">{job.title}</h4>
                    <div className="space-y-1 mb-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {job.experience} exp
                      </div>
                    </div>
                    <Button size="sm" variant="accent" className="w-full">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Employee Testimonials Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="font-semibold mb-4">Employee Testimonials</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.05 }}
                className="flex-shrink-0 w-72"
              >
                <Card className="h-full bg-gradient-to-br from-muted/50 to-transparent">
                  <CardContent className="p-4">
                    <Quote className="h-6 w-6 text-primary/30 mb-2" />
                    <p className="text-sm text-muted-foreground italic leading-relaxed mb-4 line-clamp-4">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3 pt-3 border-t">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.title} • {testimonial.years}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CEO's Message Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h2 className="font-semibold mb-4">CEO's Message</h2>
          <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20 overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-lg">TC</span>
                </div>
                <div>
                  <h3 className="font-semibold">Tarun Chugh</h3>
                  <p className="text-xs text-muted-foreground mb-3">MD & CEO, Bajaj Life Insurance</p>
                </div>
              </div>
              <div className="mt-4 pl-0">
                <Quote className="h-5 w-5 text-primary/40 mb-2" />
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  "At Bajaj Life, we believe in empowering our people to achieve extraordinary results.
                  Joining our team means becoming part of a family that values innovation, integrity, and customer-centricity. 
                  We invest in your growth through world-class training, cutting-edge technology, and a supportive environment 
                  that celebrates success. Together, we are not just selling insurance – we are protecting dreams and 
                  securing futures. I invite you to be part of this meaningful journey where your career aspirations 
                  meet unlimited opportunities."
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <FloatingChatButton />
    </div>
  );
}

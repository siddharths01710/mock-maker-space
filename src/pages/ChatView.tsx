import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles, ArrowRight, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TopNavBar } from '@/components/layout/TopNavBar';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { useApp } from '@/contexts/AppContext';
import { categories } from '@/data/categories';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  moduleId?: string;
  categoryId?: string;
  moduleName?: string;
  actionType?: 'leads' | 'module';
  actionPath?: string;
}

const suggestedPrompts = [
  'Show me my KPIs',
  'View all my Leads',
  'Recruitment Leads',
  'My Performance',
  'Customer Events',
];

export default function ChatView() {
  const { language, user } = useApp();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello ${user?.name?.split(' ')[0] || 'there'}! 👋 I'm your AI assistant. Ask me about any module or feature, and I'll help you navigate to it with a quick summary.`,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findModule = (query: string) => {
    const lowerQuery = query.toLowerCase();
    for (const category of categories) {
      for (const module of category.modules) {
        if (
          module.name.toLowerCase().includes(lowerQuery) ||
          module.nameHi.toLowerCase().includes(lowerQuery)
        ) {
          return { module, category };
        }
      }
      if (
        category.name.toLowerCase().includes(lowerQuery) ||
        category.nameHi.toLowerCase().includes(lowerQuery)
      ) {
        return { category, module: category.modules[0] };
      }
    }
    return null;
  };

  const checkLeadsQuery = (query: string): boolean => {
    const lowerQuery = query.toLowerCase();
    return (
      lowerQuery.includes('view all my leads') ||
      lowerQuery.includes('show my leads') ||
      lowerQuery.includes('all leads') ||
      lowerQuery.includes('my leads')
    );
  };

  const generateAISummary = (moduleName: string) => {
    const summaries: Record<string, string> = {
      'KPI Snapshot': 'Your current KPI status shows strong performance in Login NOP (80% achieved) but Persistency needs attention at 87%. Focus on the 3 lapsing policies to improve your score.',
      'Recruitment Leads': 'You have 15 active recruitment leads. 4 are in "Follow Up" status and ready for conversion. Your conversion rate is 26%, above the team average of 22%.',
      'My Performance': 'This month you\'ve achieved ₹45L RNB against a target of ₹60L. Your commission earnings are ₹2.4L YTD. Keep pushing for the Q4 bonus!',
      'Customer Events': 'You have 8 customer events this week: 3 renewals, 2 birthdays, 2 anniversaries, and 1 maturity. Prioritize the ₹50,000 renewal due in 2 days.',
      'Training Corner': 'You have 2 training modules in progress and 3 completed. Complete "Advanced Sales Techniques" to unlock your next badge!',
    };
    return summaries[moduleName] || `Here's a quick overview of ${moduleName}. This module helps you manage and track relevant information efficiently.`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      let aiMessage: Message;

      // Check for leads query first
      if (checkLeadsQuery(currentInput)) {
        const totalLeads = 24;
        const leadsRequiringAction = 8;
        aiMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: `You have ${totalLeads} leads with ${leadsRequiringAction} requiring action.`,
          actionType: 'leads',
          actionPath: '/category/lead-retention-pool?view=leads',
        };
      } else {
        const result = findModule(currentInput);

        if (result) {
          const { module, category } = result;
          aiMessage = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: generateAISummary(module.name),
            moduleId: module.id,
            categoryId: category.id,
            moduleName: module.name,
            actionType: 'module',
          };
        } else {
          aiMessage = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: "I couldn't find a specific module matching your query. Try asking about KPIs, Leads, Customers, Performance, or Training. You can also tap on the suggestions below!",
          };
        }
      }

      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  const handleOpenModule = (categoryId: string, moduleId: string) => {
    navigate(`/category/${categoryId}/module/${moduleId}`);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // In a real app, this would start/stop actual voice recording
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavBar />
      <SideNavigation />

      <main className="flex-1 pt-16 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-md'
                      : 'bg-card border rounded-2xl rounded-bl-md'
                  } p-4`}
                >
                  {message.type === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-primary">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  
                  {/* Module CTA */}
                  {message.actionType === 'module' && message.moduleId && message.categoryId && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenModule(message.categoryId!, message.moduleId!)}
                      className="mt-3 w-full"
                    >
                      Open {message.moduleName}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                  
                  {/* Leads CTA */}
                  {message.actionType === 'leads' && message.actionPath && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleNavigate(message.actionPath!)}
                      className="mt-3 w-full"
                    >
                      Click here to view all leads
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {messages.length <= 2 && (
          <div className="px-4 pb-4">
            <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputValue(prompt);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="text-xs"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="pr-10"
                disabled={isRecording}
              />
              
              {/* Voice Recording Button / Animation */}
              {isRecording ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={handleVoiceToggle}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing animation rings */}
                    <motion.div
                      className="absolute w-6 h-6 rounded-full bg-success/30"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0.3, 0.7] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute w-4 h-4 rounded-full bg-success/50"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.4, 0.8] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    />
                    {/* Stop button */}
                    <Square className="h-3 w-3 text-success fill-success relative z-10" />
                  </div>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={handleVoiceToggle}
                >
                  <Mic className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </div>
            <Button onClick={handleSend} size="icon" variant="accent" disabled={isRecording}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Recording indicator */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center justify-center gap-2 mt-3"
              >
              <motion.div
                  className="w-2 h-2 rounded-full bg-success"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
                <span className="text-sm text-muted-foreground">Listening... Tap stop to end</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

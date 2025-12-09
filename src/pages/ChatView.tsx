import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
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
}

const suggestedPrompts = [
  'Show me my KPIs',
  'Recruitment Leads',
  'My Performance',
  'Customer Events',
  'Training status',
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
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const result = findModule(inputValue);
      let aiMessage: Message;

      if (result) {
        const { module, category } = result;
        aiMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: generateAISummary(module.name),
          moduleId: module.id,
          categoryId: category.id,
          moduleName: module.name,
        };
      } else {
        aiMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: "I couldn't find a specific module matching your query. Try asking about KPIs, Recruitment, Customers, Performance, or Training. You can also tap on the suggestions below!",
        };
      }

      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  const handleOpenModule = (categoryId: string, moduleId: string) => {
    navigate(`/category/${categoryId}/module/${moduleId}`);
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
                  {message.moduleId && message.categoryId && (
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
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              >
                <Mic className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            <Button onClick={handleSend} size="icon" variant="accent">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      {/* Floating Chat Button (visible on other pages) */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          variant="accent"
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => {}}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
}

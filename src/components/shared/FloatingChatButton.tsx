import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

export function FloatingChatButton() {
  const navigate = useNavigate();
  const { setViewMode } = useApp();

  const handleClick = () => {
    setViewMode('chat');
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Button
        variant="accent"
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={handleClick}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </motion.div>
  );
}

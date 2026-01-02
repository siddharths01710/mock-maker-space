import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, User, Crown, ArrowRight, Shield, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { UserRole } from '@/types';
import { motion } from 'framer-motion';

const roles: { role: UserRole; name: string; description: string; icon: React.ElementType; enabled: boolean }[] = [
  {
    role: 'prospect_agent',
    name: 'Prospect Agent',
    description: 'New to Bajaj? Start your journey here',
    icon: Briefcase,
    enabled: true,
  },
  {
    role: 'agent',
    name: 'Agent',
    description: 'Active insurance agents',
    icon: User,
    enabled: true,
  },
  {
    role: 'sales_manager',
    name: 'Sales Manager',
    description: 'Manage your Leads, Customers and Agents',
    icon: Users,
    enabled: true,
  },
  {
    role: 'upper_hierarchy',
    name: 'Upper Hierarchy',
    description: 'Regional and branch leadership',
    icon: Crown,
    enabled: true,
  },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const { setUser } = useApp();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!selectedRole || mobileNumber.length < 10) return;

    const roleNames = {
      prospect_agent: 'Prospect User',
      agent: 'Agent User',
      sales_manager: 'Claudius Crasto',
      upper_hierarchy: 'Admin User',
    };

    setUser({
      id: '1',
      name: roleNames[selectedRole],
      role: selectedRole,
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen gradient-primary flex flex-col">
      {/* Header */}
      <header className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-xl bg-primary-foreground flex items-center justify-center shadow-lg">
            <span className="text-primary font-bold text-lg">BL</span>
          </div>
          <div>
            <h1 className="text-primary-foreground font-bold text-xl">Bajaj Life</h1>
            <p className="text-primary-foreground/70 text-sm">Pre-Sales Portal</p>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-6 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-primary-foreground text-2xl font-bold mb-2">
            Welcome Back!
          </h2>
          <p className="text-primary-foreground/70">
            Select your role to continue
          </p>
        </motion.div>

        {/* Mobile Number Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/50" />
            <Input
              type="tel"
              placeholder="Enter Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="pl-12 h-14 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-lg"
              maxLength={10}
            />
          </div>
          {mobileNumber.length > 0 && mobileNumber.length < 10 && (
            <p className="text-primary-foreground/70 text-xs mt-2">Enter 10 digit mobile number</p>
          )}
        </motion.div>

        {/* Role Cards */}
        <div className="flex-1 space-y-3">
          {roles.map((role, index) => (
            <motion.div
              key={role.role}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
            >
              <Card
                onClick={() => role.enabled && setSelectedRole(role.role)}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedRole === role.role
                    ? 'ring-2 ring-accent border-accent shadow-lg'
                    : role.enabled
                    ? 'hover:shadow-md hover:border-primary/30'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedRole === role.role
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <role.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{role.name}</h3>
                        {!role.enabled && (
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                    {selectedRole === role.role && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                      >
                        <Shield className="h-3 w-3 text-accent-foreground" />
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Login Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Button
            variant="accent"
            size="xl"
            onClick={handleLogin}
            disabled={!selectedRole || mobileNumber.length < 10}
            className="w-full"
          >
            Continue
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-primary-foreground/50 text-xs mt-6"
        >
          © 2025 Bajaj Life Insurance Co. Ltd.
        </motion.p>
      </main>
    </div>
  );
}

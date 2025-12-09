import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProspectAgentDashboard from "./pages/ProspectAgentDashboard";
import CategoryPage from "./pages/CategoryPage";
import ModulePage from "./pages/ModulePage";
import GridView from "./pages/GridView";
import ChatView from "./pages/ChatView";
import LeadManagement from "./pages/LeadManagement";
import MyCustomers from "./pages/MyCustomers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, viewMode } = useApp();

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Route based on view mode and user role
  const getDashboardComponent = () => {
    // Prospect agents always see their dedicated dashboard
    if (user.role === 'prospect_agent') {
      return <ProspectAgentDashboard />;
    }
    
    switch (viewMode) {
      case 'grid':
        return <GridView />;
      case 'chat':
        return <ChatView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={getDashboardComponent()} />
      <Route path="/category/lead-retention-pool" element={<LeadManagement />} />
      <Route path="/category/my-customers" element={<MyCustomers />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route path="/customer/:customerId" element={<MyCustomers />} />
      <Route path="/category/:categoryId/module/:moduleId" element={<ModulePage />} />
      <Route path="/lead/:leadId" element={<LeadManagement />} />
      <Route path="/tool/:toolId" element={<ModulePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

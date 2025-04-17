
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import DiagramsPage from "./pages/DiagramsPage";
import TemplatesPage from "./pages/TemplatesPage";
import TutorialsPage from "./pages/TutorialsPage";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/editor" element={<Index />} />
          <Route path="/diagrams" element={<DiagramsPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          {/* Placeholder routes for new sidebar items */}
          <Route path="/settings" element={<Navigate to="/editor" replace />} />
          <Route path="/help" element={<Navigate to="/editor" replace />} />
          {/* Redirect /payments to /editor for now */}
          <Route path="/payments" element={<Navigate to="/editor" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DiagramsPage from "./pages/DiagramsPage";
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
          <Route path="/cards" element={<Index />} /> {/* Placeholder routes */}
          <Route path="/payments" element={<Index />} />
          <Route path="/budget" element={<Index />} />
          <Route path="/savings" element={<Index />} />
          <Route path="/currency" element={<Index />} />
          <Route path="/credit" element={<Index />} />
          <Route path="/premium" element={<Index />} />
          <Route path="/security" element={<Index />} />
          <Route path="/support" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

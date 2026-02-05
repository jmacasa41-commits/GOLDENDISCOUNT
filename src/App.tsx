import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Category from "./pages/Category";
import DiscountDetail from "./pages/DiscountDetail";
import SavedDiscounts from "./pages/SavedDiscounts";
import NotFound from "./pages/NotFound";
import { LocationProvider } from "@/contexts/LocationContext";
import { SavedDiscountsProvider } from "@/contexts/SavedDiscountsContext";

import Nearby from "./pages/Nearby";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocationProvider>
      <SavedDiscountsProvider>
        <TooltipProvider>

          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/home" element={<Home />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/discount/:discountId" element={<DiscountDetail />} />
              <Route path="/saved" element={<SavedDiscounts />} />
              <Route path="/nearby" element={<Nearby />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SavedDiscountsProvider>
    </LocationProvider>

  </QueryClientProvider>
);

export default App;

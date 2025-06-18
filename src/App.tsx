
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/AddProject";
import ProjectEstimation from "./pages/ProjectEstimation";
import MaterialProcurement from "./pages/MaterialProcurement";
import MaterialTracking from "./pages/MaterialTracking";
import LaborManagement from "./pages/LaborManagement";
import AddLabor from "./pages/AddLabor";
import LaborProfile from "./pages/LaborProfile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/add-project" element={
              <ProtectedRoute>
                <AddProject />
              </ProtectedRoute>
            } />
            <Route path="/project-estimation" element={
              <ProtectedRoute>
                <ProjectEstimation />
              </ProtectedRoute>
            } />
            <Route path="/material-procurement" element={
              <ProtectedRoute>
                <MaterialProcurement />
              </ProtectedRoute>
            } />
            <Route path="/material-tracking" element={
              <ProtectedRoute>
                <MaterialTracking />
              </ProtectedRoute>
            } />
            <Route path="/labor-management" element={
              <ProtectedRoute>
                <LaborManagement />
              </ProtectedRoute>
            } />
            <Route path="/add-labor" element={
              <ProtectedRoute>
                <AddLabor />
              </ProtectedRoute>
            } />
            <Route path="/labor-profile/:id" element={
              <ProtectedRoute>
                <LaborProfile />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

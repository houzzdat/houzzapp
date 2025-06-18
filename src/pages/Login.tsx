
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Building2, Users, Package, DollarSign, Shield, Mail, Lock, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const USER_ROLES = [
  {
    id: "project-manager",
    title: "Project Manager",
    icon: Building2,
    description: "Full project access and modification rights",
    permissions: [
      "Financial data access and approval authority",
      "Supplier and contractor management",
      "Quality control and inspection rights",
      "Client communication and reporting"
    ],
    color: "bg-brand-orange"
  },
  {
    id: "site-engineer",
    title: "Site Engineer",
    icon: Users,
    description: "Daily operations and technical oversight",
    permissions: [
      "Daily progress updates and photo uploads",
      "Material receipt and quality verification",
      "Labor attendance and work allocation",
      "Safety compliance reporting",
      "Technical issue reporting"
    ],
    color: "bg-brand-medium-blue"
  },
  {
    id: "procurement-manager",
    title: "Procurement Manager",
    icon: Package,
    description: "Material and supplier management",
    permissions: [
      "Material requirement planning",
      "Supplier quotation and comparison",
      "Purchase order generation and tracking",
      "Inventory management",
      "Cost optimization recommendations"
    ],
    color: "bg-green-600"
  },
  {
    id: "finance-manager",
    title: "Finance Manager",
    icon: DollarSign,
    description: "Financial oversight and analysis",
    permissions: [
      "Budget planning and tracking",
      "Payment processing and approvals",
      "Financial reporting and analysis",
      "Cost variance analysis",
      "Profitability tracking"
    ],
    color: "bg-purple-600"
  }
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || "/dashboard";

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast({
        title: "Role Required",
        description: "Please select your role to continue.",
        variant: "destructive",
      });
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, { role: selectedRole });
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Account Exists",
              description: "This email is already registered. Try signing in instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Sign Up Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Account Created",
            description: "Please check your email to confirm your account.",
          });
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Sign In Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome Back",
            description: "Successfully signed in!",
          });
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Reset Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Reset Email Sent",
          description: "Check your email for password reset instructions.",
        });
        setShowForgotPassword(false);
        setResetEmail("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h1 className="text-3xl font-bold text-brand-dark-blue">SitePilot</h1>
            </div>
            <p className="text-brand-gray text-lg">Reset Your Password</p>
          </div>

          <Card className="shadow-xl border-2 border-slate-200/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-brand-dark-blue">Forgot Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resetEmail">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="resetEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-brand-medium-blue hover:bg-brand-dark-blue"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="text-brand-medium-blue hover:text-brand-dark-blue flex items-center gap-2 mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-3xl font-bold text-brand-dark-blue">SitePilot</h1>
          </div>
          <p className="text-brand-gray text-lg">Construction Project Management Platform</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Login Form */}
          <Card className="shadow-xl border-2 border-slate-200/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-brand-dark-blue">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </CardTitle>
              <CardDescription>
                {isSignUp ? "Sign up to access construction projects" : "Sign in to access your construction projects"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email/Password Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!selectedRole || isLoading}
                  className="w-full h-12 bg-brand-medium-blue hover:bg-brand-dark-blue"
                >
                  {isLoading ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")}
                </Button>
              </form>

              <div className="space-y-3 text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-brand-medium-blue hover:text-brand-dark-blue underline"
                >
                  {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </button>

                {!isSignUp && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-brand-medium-blue hover:text-brand-dark-blue underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}
              </div>

              {!selectedRole && (
                <div className="text-center text-sm text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Please select your role to continue
                </div>
              )}
            </CardContent>
          </Card>

          {/* Role Selection */}
          <Card className="shadow-xl border-2 border-slate-200/50">
            <CardHeader>
              <CardTitle className="text-xl text-brand-dark-blue">Select Your Role</CardTitle>
              <CardDescription>Choose the role that matches your responsibilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {USER_ROLES.map((role) => (
                  <div
                    key={role.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedRole === role.id
                        ? "border-brand-orange bg-brand-orange/5 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 ${role.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <role.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{role.title}</h3>
                          {selectedRole === role.id && (
                            <Badge className="bg-brand-orange text-white text-xs">Selected</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                        <div className="space-y-1">
                          {role.permissions.slice(0, 2).map((permission, index) => (
                            <div key={index} className="text-xs text-gray-500 flex items-center gap-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full flex-shrink-0" />
                              <span className="text-overflow-safe">{permission}</span>
                            </div>
                          ))}
                          {role.permissions.length > 2 && (
                            <div className="text-xs text-gray-400">
                              +{role.permissions.length - 2} more permissions
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Need help? Contact your system administrator</p>
        </div>
      </div>
    </div>
  );
}

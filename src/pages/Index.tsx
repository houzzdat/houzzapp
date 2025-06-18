
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, FileText, Calendar, TrendingUp, Shield, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h1 className="text-5xl font-bold text-brand-dark-blue">SitePilot</h1>
          </div>
          <p className="text-xl text-brand-gray mb-6">
            Complete Construction Project Management Platform
          </p>
          <div className="flex items-center justify-center gap-4">
            {user ? (
              <>
                <span className="text-brand-dark-blue">Welcome, {user.email}</span>
                <Link to="/dashboard">
                  <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-3 text-lg">
                    Go to Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-3 text-lg">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="shadow-lg border-2 border-slate-200/50 hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-brand-medium-blue rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-brand-dark-blue">Project Management</CardTitle>
              <CardDescription>
                Comprehensive project tracking from initiation to completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-brand-gray">
                <li>• Project planning and scheduling</li>
                <li>• Resource allocation</li>
                <li>• Progress monitoring</li>
                <li>• Team collaboration</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-slate-200/50 hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-brand-dark-blue">Estimation & Costing</CardTitle>
              <CardDescription>
                Advanced algorithms for accurate project estimation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-brand-gray">
                <li>• Material quantity calculations</li>
                <li>• Labor cost estimation</li>
                <li>• Equipment rental planning</li>
                <li>• Timeline predictions</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-slate-200/50 hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-brand-dark-blue">Team Management</CardTitle>
              <CardDescription>
                Organize teams with role-based access control
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-brand-gray">
                <li>• Role-based permissions</li>
                <li>• Task assignments</li>
                <li>• Performance tracking</li>
                <li>• Communication tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-slate-200/50 hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-brand-dark-blue">Timeline Planning</CardTitle>
              <CardDescription>
                Smart scheduling with dependency management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-brand-gray">
                <li>• Gantt chart visualization</li>
                <li>• Critical path analysis</li>
                <li>• Milestone tracking</li>
                <li>• Buffer time calculations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-slate-200/50 hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-brand-dark-blue">Safety & Quality</CardTitle>
              <CardDescription>
                Comprehensive safety protocols and quality assurance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-brand-gray">
                <li>• Safety checklist automation</li>
                <li>• Quality control testing</li>
                <li>• Compliance monitoring</li>
                <li>• Incident reporting</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-slate-200/50 hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-brand-dark-blue">Analytics & Reports</CardTitle>
              <CardDescription>
                Data-driven insights for better decision making
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-brand-gray">
                <li>• Cost variance analysis</li>
                <li>• Performance metrics</li>
                <li>• Profit tracking</li>
                <li>• Custom reporting</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* User Roles Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-brand-dark-blue mb-4">Built for Construction Teams</h2>
          <p className="text-brand-gray text-lg mb-8">
            Tailored access levels for different roles in your construction projects
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-brand-dark-blue mb-2">Project Manager</h3>
              <Badge className="bg-brand-orange/10 text-brand-orange">Full Access</Badge>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-brand-medium-blue rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-brand-dark-blue mb-2">Site Engineer</h3>
              <Badge className="bg-blue-100 text-blue-800">Field Operations</Badge>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-brand-dark-blue mb-2">Procurement</h3>
              <Badge className="bg-green-100 text-green-800">Materials</Badge>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-brand-dark-blue mb-2">Finance</h3>
              <Badge className="bg-purple-100 text-purple-800">Budget Control</Badge>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-brand-gray">
          <p>&copy; 2024 SitePilot. Comprehensive Construction Management Solution.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

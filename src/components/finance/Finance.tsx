
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, FileText } from "lucide-react";

import BudgetWorkflow from "./BudgetWorkflow";
import PaymentWorkflow from "./PaymentWorkflow";
import ProjectViewSelector from "../shared/ProjectViewSelector";
import FinanceSummaryCards from "./FinanceSummaryCards";
import FinanceDateFilter from "./FinanceDateFilter";
import FinanceTabs from "./FinanceTabs";

const BUDGET_SAMPLE = [
  { id: 1, item: "Foundation", planned: 200000, spent: 195000, variance: -5000, date: "2024-06-10" },
  { id: 2, item: "Steel Purchase", planned: 120000, spent: 110000, variance: -10000, date: "2024-06-12" },
  { id: 3, item: "Labor Wages", planned: 300000, spent: 280200, variance: -19800, date: "2024-06-15" },
  { id: 4, item: "Cement", planned: 80000, spent: 85000, variance: 5000, date: "2024-06-08" },
];

const PAYMENTS_SAMPLE = [
  { id: 1, desc: "Kalpana Steels", method: "Bank Transfer", amount: 80000, date: "2024-06-15" },
  { id: 2, desc: "SafeGuard PPE", method: "UPI", amount: 22000, date: "2024-06-14" },
  { id: 3, desc: "Wage Payment", method: "Cash", amount: 25200, date: "2024-06-13" },
  { id: 4, desc: "Concrete Supplier", method: "Bank Transfer", amount: 45000, date: "2024-06-11" },
];

const EXPENSES_SAMPLE = [
  { id: 1, purpose: "Concrete Mixer Rental", category: "Site Equipment", amount: 12000, by: "Supervisor", date: "2024-06-14" },
  { id: 2, purpose: "Paint Supplies", category: "Materials", amount: 8800, by: "Procurement", date: "2024-06-14" },
  { id: 3, purpose: "Tea & Snacks", category: "Miscellaneous", amount: 1250, by: "Supervisor", date: "2024-06-13" },
  { id: 4, purpose: "Safety Equipment", category: "Safety", amount: 15000, by: "Safety Officer", date: "2024-06-10" },
];

const filterByDateRange = (data: any[], startDate: string, endDate: string) => {
  if (!startDate || !endDate) return data;
  return data.filter(item => item.date >= startDate && item.date <= endDate);
};

export default function Finance() {
  const [tab, setTab] = useState("budget");
  const [startDate, setStartDate] = useState("2024-06-01");
  const [endDate, setEndDate] = useState("2024-06-30");
  const [showWorkflows, setShowWorkflows] = useState(false);
  const [viewMode, setViewMode] = useState<"active" | "consolidated">("active");

  // Filter data based on date range
  const filteredBudget = filterByDateRange(BUDGET_SAMPLE, startDate, endDate);
  const filteredPayments = filterByDateRange(PAYMENTS_SAMPLE, startDate, endDate);
  const filteredExpenses = filterByDateRange(EXPENSES_SAMPLE, startDate, endDate);

  // Calculate aggregates
  const totalPlanned = filteredBudget.reduce((sum, item) => sum + item.planned, 0);
  const totalSpent = filteredBudget.reduce((sum, item) => sum + item.spent, 0);
  const totalVariance = filteredBudget.reduce((sum, item) => sum + item.variance, 0);
  const totalPayments = filteredPayments.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = filteredExpenses.reduce((sum, item) => sum + item.amount, 0);

  const handleViewModeChange = (newViewMode: "active" | "consolidated") => {
    setViewMode(newViewMode);
  };

  return (
    <div className="py-6 px-4 w-full max-w-6xl mx-auto animate-fade-in">
      {/* Enhanced Header - Matching Dashboard Style */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-orange to-brand-orange/80 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <FileText size={20} className="text-white sm:hidden" />
              <FileText size={24} className="text-white hidden sm:block" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-responsive-xl sm:text-responsive-2xl font-bold text-brand-dark-blue text-wrap-safe">Finance Management</h2>
              <p className="text-brand-gray text-responsive-xs sm:text-responsive-sm text-wrap-safe">Budget tracking, payments, and financial analysis</p>
            </div>
          </div>
          <Button
            onClick={() => setShowWorkflows(!showWorkflows)}
            variant="outline"
            className="rounded-xl border-brand-orange/30 hover:border-brand-orange bg-white hover:bg-brand-orange/5 transition-all"
          >
            <Settings size={16} className="mr-2" />
            <span className="hidden sm:inline">{showWorkflows ? "Hide Workflows" : "Show Workflows"}</span>
            <span className="sm:hidden">Workflows</span>
          </Button>
        </div>

        {/* Project View Selector - Enhanced styling */}
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <ProjectViewSelector onViewModeChange={handleViewModeChange} />
        </div>
      </div>

      {/* Date Range Selector - Card style */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6 shadow-lg border border-slate-200/50">
        <FinanceDateFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      {/* Financial Summary Cards - Enhanced */}
      <div className="mb-6">
        <FinanceSummaryCards
          totalPlanned={totalPlanned}
          totalSpent={totalSpent}
          totalVariance={totalVariance}
          totalPayments={totalPayments}
        />
      </div>

      {/* Workflows Section */}
      {showWorkflows && (
        <div className="mb-6">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200/50">
            <h3 className="text-responsive-lg font-semibold text-brand-dark-blue mb-4 flex items-center gap-2">
              <Settings size={20} className="text-brand-orange" />
              Workflow Actions
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BudgetWorkflow />
              <PaymentWorkflow />
            </div>
          </div>
        </div>
      )}

      {/* Finance Tabs - Enhanced card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50">
        <FinanceTabs
          tab={tab}
          onTabChange={setTab}
          filteredBudget={filteredBudget}
          filteredPayments={filteredPayments}
          filteredExpenses={filteredExpenses}
          totalPlanned={totalPlanned}
          totalSpent={totalSpent}
          totalVariance={totalVariance}
          totalPayments={totalPayments}
          totalExpenses={totalExpenses}
        />
      </div>
    </div>
  );
}

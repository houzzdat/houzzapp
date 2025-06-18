
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { DateRange } from "react-day-picker";
import MaterialUsedTab from "@/components/materials/MaterialUsedTab";
import MaterialReceivedTab from "@/components/materials/MaterialReceivedTab";
import DateRangeSelector from "@/components/shared/DateRangeSelector";

export default function MaterialTracking() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/material-procurement")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Material Procurement
          </Button>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-brand-dark-blue mb-2">
                Material Tracking
              </h1>
              <p className="text-brand-gray">
                Track daily material usage and receipts
              </p>
            </div>
            
            {/* Date Range Selector moved to top right */}
            <div>
              <DateRangeSelector
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
            </div>
          </div>
        </div>

        {/* Material Tracking Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-dark-blue">Material Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="used" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="used">Material Used</TabsTrigger>
                <TabsTrigger value="received">Material Received</TabsTrigger>
              </TabsList>
              
              <TabsContent value="used" className="mt-6">
                <MaterialUsedTab dateRange={dateRange} />
              </TabsContent>
              
              <TabsContent value="received" className="mt-6">
                <MaterialReceivedTab dateRange={dateRange} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, MapPin, CreditCard } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Worker = Database['public']['Tables']['workers']['Row'];

interface PersonalDetailsCardProps {
  worker: Worker;
}

export default function PersonalDetailsCard({ worker }: PersonalDetailsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-brand-dark-blue flex items-center gap-2">
          <User size={20} />
          Personal Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center mb-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
            <User size={40} className="text-gray-500" />
          </div>
          <h3 className="font-semibold text-lg">{worker.name}</h3>
          <Badge variant="outline" className="mt-1">{worker.category}</Badge>
        </div>
        
        <div className="space-y-3">
          {worker.aadhar_number && (
            <div className="flex items-start gap-3">
              <CreditCard size={16} className="mt-1 text-brand-gray" />
              <div>
                <p className="text-sm text-brand-gray">Aadhar Number</p>
                <p className="font-medium">{worker.aadhar_number}</p>
              </div>
            </div>
          )}
          
          {worker.phone_number && (
            <div className="flex items-start gap-3">
              <Phone size={16} className="mt-1 text-brand-gray" />
              <div>
                <p className="text-sm text-brand-gray">Phone</p>
                <p className="font-medium">{worker.phone_number}</p>
              </div>
            </div>
          )}
          
          {worker.address && (
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-1 text-brand-gray" />
              <div>
                <p className="text-sm text-brand-gray">Address</p>
                <p className="font-medium">{worker.address}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

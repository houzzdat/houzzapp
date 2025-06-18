
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IndianRupee } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type PaymentRecord = Database['public']['Tables']['payment_records']['Row'];

interface PaymentHistoryCardProps {
  paymentRecords: PaymentRecord[];
}

export default function PaymentHistoryCard({ paymentRecords }: PaymentHistoryCardProps) {
  const formattedPaymentRecords = paymentRecords.slice(0, 10).map(record => ({
    date: record.payment_date,
    amount: record.amount,
    description: record.notes || 'Labor Payment',
    method: record.payment_method || 'Cash'
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-brand-dark-blue flex items-center gap-2">
          <IndianRupee size={20} />
          Payment History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {formattedPaymentRecords.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedPaymentRecords.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>{record.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{record.method}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">₹{record.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-brand-gray py-4">No payment records found</p>
        )}
      </CardContent>
    </Card>
  );
}


import { Button } from "@/components/ui/button";

interface InvoiceFormActionsProps {
  isCreating: boolean;
  onCancel: () => void;
}

export default function InvoiceFormActions({ isCreating, onCancel }: InvoiceFormActionsProps) {
  return (
    <div className="flex gap-3">
      <Button 
        type="submit" 
        className="bg-brand-orange hover:bg-brand-orange/90"
        disabled={isCreating}
      >
        {isCreating ? "Adding..." : "Add Invoice"}
      </Button>
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
}

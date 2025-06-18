
import { Button } from "@/components/ui/button";

interface POFormActionsProps {
  isCreating: boolean;
  onCancel: () => void;
}

export default function POFormActions({ isCreating, onCancel }: POFormActionsProps) {
  return (
    <div className="flex gap-3">
      <Button 
        type="submit" 
        className="bg-brand-orange hover:bg-brand-orange/90"
        disabled={isCreating}
      >
        {isCreating ? "Creating..." : "Create PO"}
      </Button>
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
}

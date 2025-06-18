
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, Search, Plus } from "lucide-react";
import { useState } from "react";
import BulkMaterialImport from "@/components/materials/BulkMaterialImport";
import MaterialBrowser from "@/components/materials/MaterialBrowser";
import AddMaterialForm from "@/components/materials/AddMaterialForm";

export default function MaterialActionButtons() {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showBrowserDialog, setShowBrowserDialog] = useState(false);
  const [showAddMaterialDialog, setShowAddMaterialDialog] = useState(false);

  const handleMaterialAdded = () => {
    setShowAddMaterialDialog(false);
    // Optionally refresh the material browser if it's open
  };

  return (
    <div className="flex gap-2 p-4 bg-gray-50 rounded-lg">
      <Dialog open={showBrowserDialog} onOpenChange={setShowBrowserDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Browse Materials
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Material Database</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto">
            <MaterialBrowser />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddMaterialDialog} onOpenChange={setShowAddMaterialDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Material
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Material</DialogTitle>
          </DialogHeader>
          <AddMaterialForm 
            onSuccess={handleMaterialAdded}
            onCancel={() => setShowAddMaterialDialog(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import Materials
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Bulk Material Import</DialogTitle>
          </DialogHeader>
          <BulkMaterialImport />
        </DialogContent>
      </Dialog>
    </div>
  );
}

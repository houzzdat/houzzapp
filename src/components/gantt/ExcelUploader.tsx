
import { useState } from "react";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";

type Task = {
  id: string;
  title: string;
  start: string;
  end: string;
  assignedTo: string;
  progress: number;
  dependencies: string[];
  category?: string;
};

interface ExcelUploaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onTasksImported: (tasks: Task[]) => void;
}

const ExcelUploader = ({ open, setOpen, onTasksImported }: ExcelUploaderProps) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus('uploading');
    
    try {
      // Simulate Excel parsing (in real app, you'd use a library like xlsx)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data that would come from Excel parsing
      const mockTasks: Task[] = [
        {
          id: Math.random().toString(36).slice(2),
          title: "Project Initiation",
          start: "2024-06-16",
          end: "2024-06-18",
          assignedTo: "Project Manager",
          progress: 100,
          dependencies: [],
          category: "management"
        },
        {
          id: Math.random().toString(36).slice(2),
          title: "Site Survey",
          start: "2024-06-19",
          end: "2024-06-21",
          assignedTo: "Survey Team",
          progress: 80,
          dependencies: [],
          category: "survey"
        },
        {
          id: Math.random().toString(36).slice(2),
          title: "Foundation Work",
          start: "2024-06-22",
          end: "2024-06-28",
          assignedTo: "Construction Crew",
          progress: 30,
          dependencies: [],
          category: "construction"
        }
      ];

      onTasksImported(mockTasks);
      setUploadStatus('success');
      
      setTimeout(() => {
        setOpen(false);
        setUploadStatus('idle');
      }, 1500);
      
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Failed to parse Excel file. Please check the format.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-green-600" />
            Upload Project Plan
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Upload an Excel file with your project tasks. Expected columns: Task Name, Start Date, End Date, Assigned To, Progress, Category.
          </div>
          
          {uploadStatus === 'idle' && (
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <label className="cursor-pointer">
                <span className="text-sm font-medium text-primary hover:text-primary/80">
                  Choose Excel file
                </span>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Supports .xlsx, .xls, .csv files
              </p>
            </div>
          )}
          
          {uploadStatus === 'uploading' && (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Processing your file...</p>
            </div>
          )}
          
          {uploadStatus === 'success' && (
            <div className="text-center py-6">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-600">Tasks imported successfully!</p>
            </div>
          )}
          
          {uploadStatus === 'error' && (
            <div className="text-center py-6">
              <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-red-600">Upload failed</p>
              <p className="text-xs text-muted-foreground mt-1">{errorMessage}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setUploadStatus('idle')}
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExcelUploader;

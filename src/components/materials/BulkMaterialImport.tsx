
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Download, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type MaterialCategory = Database['public']['Enums']['material_category'];

interface ImportResult {
  success: number;
  errors: string[];
}

export default function BulkMaterialImport() {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  const categoryMapping: Record<string, MaterialCategory> = {
    'Foundation Materials': 'concrete',
    'Structural - Concrete': 'concrete',
    'Structural - Steel': 'steel',
    'Masonry Materials': 'brick',
    'Roofing Materials': 'finishing',
    'Electrical Materials': 'electrical',
    'Plumbing Materials': 'plumbing',
    'HVAC Materials': 'electrical',
    'Flooring Materials': 'finishing',
    'Wall Finishes': 'finishing',
    'Ceiling Materials': 'finishing',
    'Doors': 'finishing',
    'Windows': 'finishing',
    'Waterproofing': 'finishing',
    'Insulation': 'finishing',
    'Hardware & Fasteners': 'steel',
    'Paints & Coatings': 'finishing',
    'Safety Materials': 'electrical',
    'Landscaping': 'finishing'
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setImportResult(null);
    } else {
      toast.error('Please select a valid CSV file');
    }
  };

  const parseCsvLine = (line: string): string[] => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    const errors: string[] = [];
    let successCount = 0;

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      // Skip header line
      const dataLines = lines.slice(1);

      for (let i = 0; i < dataLines.length; i++) {
        try {
          const [category, material, rateStr] = parseCsvLine(dataLines[i]);
          
          if (!category || !material || !rateStr) {
            errors.push(`Line ${i + 2}: Missing required fields`);
            continue;
          }

          const baseRate = parseFloat(rateStr);
          if (isNaN(baseRate)) {
            errors.push(`Line ${i + 2}: Invalid rate value`);
            continue;
          }

          const dbCategory = categoryMapping[category] || 'finishing';
          
          // Determine unit based on material name
          let unit = 'nos';
          if (material.toLowerCase().includes('concrete') || material.toLowerCase().includes('mortar')) {
            unit = 'cum';
          } else if (material.toLowerCase().includes('sand') || material.toLowerCase().includes('aggregate')) {
            unit = 'cum';
          } else if (material.toLowerCase().includes('cement') && material.toLowerCase().includes('bag')) {
            unit = 'bag';
          } else if (material.toLowerCase().includes('wire') || material.toLowerCase().includes('pipe') || material.toLowerCase().includes('cable')) {
            unit = 'mtr';
          } else if (material.toLowerCase().includes('paint') || material.toLowerCase().includes('polish')) {
            unit = 'ltr';
          } else if (material.toLowerCase().includes('tiles') || material.toLowerCase().includes('flooring')) {
            unit = 'sqm';
          }

          const { error } = await supabase
            .from('material_master')
            .insert({
              name: material,
              category: dbCategory,
              unit: unit,
              base_rate: baseRate,
              calculation_formula: 'built_area * 1.0',
              wastage_factor: 0.05,
              description: `Imported ${category} material`
            });

          if (error) {
            errors.push(`Line ${i + 2}: ${error.message}`);
          } else {
            successCount++;
          }
        } catch (error) {
          errors.push(`Line ${i + 2}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      setImportResult({ success: successCount, errors });
      
      if (successCount > 0) {
        toast.success(`Successfully imported ${successCount} materials`);
      }
      if (errors.length > 0) {
        toast.warning(`Import completed with ${errors.length} errors`);
      }

    } catch (error) {
      toast.error('Failed to process file');
      console.error('Import error:', error);
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const template = `Category,Material,Standard_Rate_Per_Unit
Foundation Materials,Excavation,120.0
Structural - Concrete,OPC Cement 43 Grade,340.0
Masonry Materials,Common Burnt Clay Bricks,4.5`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'material_import_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Bulk Material Import
        </CardTitle>
        <CardDescription>
          Import materials from CSV file. Download the template to see the required format.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Template
          </Button>
        </div>

        <div className="space-y-2">
          <label htmlFor="csvFile" className="text-sm font-medium">
            Select CSV File
          </label>
          <Input
            id="csvFile"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>

        {file && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Ready to import: {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleImport}
          disabled={!file || importing}
          className="w-full"
        >
          {importing ? 'Importing...' : 'Import Materials'}
        </Button>

        {importResult && (
          <div className="space-y-2">
            {importResult.success > 0 && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Successfully imported {importResult.success} materials
                </AlertDescription>
              </Alert>
            )}
            
            {importResult.errors.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div>Import errors:</div>
                  <ul className="mt-2 text-xs max-h-32 overflow-y-auto">
                    {importResult.errors.slice(0, 10).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                    {importResult.errors.length > 10 && (
                      <li>... and {importResult.errors.length - 10} more errors</li>
                    )}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

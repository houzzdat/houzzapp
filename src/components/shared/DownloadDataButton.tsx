
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, FileText, File } from "lucide-react";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface DownloadDataButtonProps {
  data: any[];
  filename: string;
  headers?: string[];
  title?: string;
}

export default function DownloadDataButton({ 
  data, 
  filename, 
  headers, 
  title 
}: DownloadDataButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadCSV = () => {
    setIsDownloading(true);
    try {
      if (!data || data.length === 0) {
        console.warn('No data to download');
        return;
      }

      const csvContent = convertToCSV(data, headers);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading CSV:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadXLSX = () => {
    setIsDownloading(true);
    try {
      if (!data || data.length === 0) {
        console.warn('No data to download');
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    } catch (error) {
      console.error('Error downloading XLSX:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadPDF = () => {
    setIsDownloading(true);
    try {
      if (!data || data.length === 0) {
        console.warn('No data to download');
        return;
      }

      const doc = new jsPDF();
      
      // Add title
      if (title) {
        doc.setFontSize(16);
        doc.text(title, 14, 20);
      }

      // Prepare table data
      const tableHeaders = headers || (data.length > 0 ? Object.keys(data[0]) : []);
      const tableData = data.map(row => 
        tableHeaders.map(header => row[header] || '')
      );

      // Add table
      (doc as any).autoTable({
        head: [tableHeaders],
        body: tableData,
        startY: title ? 30 : 20,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] }
      });

      doc.save(`${filename}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const convertToCSV = (data: any[], headers?: string[]) => {
    if (!data || data.length === 0) return '';
    
    const csvHeaders = headers || Object.keys(data[0]);
    const csvRows = data.map(row => 
      csvHeaders.map(header => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains comma or quote
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );
    
    return [csvHeaders.join(','), ...csvRows].join('\n');
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isDownloading}>
          <Download className="mr-2" size={16} />
          {isDownloading ? 'Downloading...' : 'Download Data'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
        <DropdownMenuItem onClick={downloadCSV} className="cursor-pointer">
          <FileText className="mr-2" size={16} />
          Download as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadXLSX} className="cursor-pointer">
          <FileSpreadsheet className="mr-2" size={16} />
          Download as XLSX
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadPDF} className="cursor-pointer">
          <File className="mr-2" size={16} />
          Download as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

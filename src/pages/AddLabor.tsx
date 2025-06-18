
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Camera, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { LaborService } from "@/services/laborService";
import { Database } from "@/integrations/supabase/types";

type LaborCategory = Database['public']['Tables']['workers']['Row']['category'];

interface LaborFormData {
  name: string;
  aadharNumber: string;
  phoneNumber: string;
  address: string;
  category: string;
  phase: string;
  ratePerDay: string;
  aadharImage: File | null;
  profileImage: File | null;
}

export default function AddLabor() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<LaborFormData>({
    name: "",
    aadharNumber: "",
    phoneNumber: "",
    address: "",
    category: "",
    phase: "",
    ratePerDay: "",
    aadharImage: null,
    profileImage: null
  });

  const laborCategories = [
    "mason", "electrician", "plumber", "carpenter", "painter", 
    "helper", "supervisor", "engineer"
  ];

  const phases = [
    "Foundation", "Superstructure", "Finishing", "MEP Work", "Landscaping"
  ];

  const handleInputChange = (field: keyof LaborFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: 'aadharImage' | 'profileImage', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.aadharNumber || !formData.phoneNumber || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare worker data for database
      const workerData = {
        name: formData.name,
        aadhar_number: formData.aadharNumber,
        phone_number: formData.phoneNumber,
        address: formData.address || null,
        category: formData.category as LaborCategory,
        phase: formData.phase || null,
        rate_per_day: parseFloat(formData.ratePerDay) || 0,
        total_mandays: 0,
        mandays_used: 0,
        total_payment: 0,
        payment_made: 0,
        payment_status: 'pending' as const,
        profile_image_url: null, // TODO: Handle file uploads
        aadhar_image_url: null,  // TODO: Handle file uploads
        is_active: true
      };

      console.log('Saving worker data:', workerData);
      
      // Save to database using LaborService
      const savedWorker = await LaborService.createWorker(workerData);
      
      console.log('Worker saved successfully:', savedWorker);
      
      toast({
        title: "Success",
        description: "Labor details saved successfully"
      });
      
      // Navigate back to labor management
      navigate('/labor-management');
      
    } catch (error) {
      console.error('Error saving worker:', error);
      toast({
        title: "Error",
        description: "Failed to save labor details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/labor-management')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Labor Management
          </Button>
          
          <h1 className="text-3xl font-bold text-brand-dark-blue mb-2">
            Add New Labor
          </h1>
          <p className="text-brand-gray">
            Fill in the details to add a new worker to the project
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-dark-blue">Labor Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="aadhar">Aadhar Number *</Label>
                  <Input
                    id="aadhar"
                    value={formData.aadharNumber}
                    onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                    placeholder="XXXX-XXXX-XXXX"
                    maxLength={14}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="+91-XXXXXXXXXX"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="rate">Rate per Day (₹)</Label>
                  <Input
                    id="rate"
                    type="number"
                    value={formData.ratePerDay}
                    onChange={(e) => handleInputChange('ratePerDay', e.target.value)}
                    placeholder="500"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Complete address"
                  rows={3}
                />
              </div>

              {/* Work Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category">Labor Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {laborCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="phase">Construction Phase</Label>
                  <Select value={formData.phase} onValueChange={(value) => handleInputChange('phase', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      {phases.map((phase) => (
                        <SelectItem key={phase} value={phase}>
                          {phase}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Upload Aadhar Card</Label>
                  <div className="mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById('aadhar-upload')?.click()}
                    >
                      <Upload className="mr-2" size={16} />
                      {formData.aadharImage ? formData.aadharImage.name : 'Choose Aadhar Image'}
                    </Button>
                    <input
                      id="aadhar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload('aadharImage', e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Take Profile Photo</Label>
                  <div className="mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById('photo-upload')?.click()}
                    >
                      <Camera className="mr-2" size={16} />
                      {formData.profileImage ? formData.profileImage.name : 'Take/Upload Photo'}
                    </Button>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      capture="user"
                      className="hidden"
                      onChange={(e) => handleFileUpload('profileImage', e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/labor-management')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                  disabled={isSubmitting}
                >
                  <Save className="mr-2" size={16} />
                  {isSubmitting ? 'Saving...' : 'Save Labor Details'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

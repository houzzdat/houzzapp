
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const greenBuildingCertifications = [
  "None",
  "LEED",
  "GRIHA", 
  "IGBC"
];

interface EnvironmentalSectionProps {
  form: any;
}

export default function EnvironmentalSection({ form }: EnvironmentalSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="greenBuildingCertification"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Green Building Certification</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select certification" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {greenBuildingCertifications.map((cert) => (
                  <SelectItem key={cert} value={cert}>
                    {cert}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sustainableMaterialsPreference"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Sustainable Materials Preference
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="carbonFootprintTracking"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Carbon Footprint Tracking
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="wasteManagementPlan"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Waste Management Plan
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}

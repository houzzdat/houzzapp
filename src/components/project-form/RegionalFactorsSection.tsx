
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
];

const laborAvailabilityOptions = [
  "Poor",
  "Fair", 
  "Good",
  "Excellent"
];

const monsoonImpactOptions = [
  "Low",
  "Moderate",
  "High"
];

interface RegionalFactorsSectionProps {
  form: any;
}

export default function RegionalFactorsSection({ form }: RegionalFactorsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="projectLocationState"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Location State *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="projectLocationCity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Location City *</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter city name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="distanceFromSupplierHub"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Distance from Supplier Hub (km)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter distance"
                {...field}
                onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="localLaborAvailability"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Local Labor Availability</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select labor availability" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {laborAvailabilityOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="monsoonImpact"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monsoon Impact *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select monsoon impact" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {monsoonImpactOptions.map((impact) => (
                  <SelectItem key={impact} value={impact}>
                    {impact}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

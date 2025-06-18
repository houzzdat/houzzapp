
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const testingFrequencies = [
  "Basic",
  "Standard",
  "Enhanced"
];

const qualityAssuranceLevels = [
  "Basic",
  "Standard", 
  "Premium"
];

interface QualityControlSectionProps {
  form: any;
}

export default function QualityControlSection({ form }: QualityControlSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="concreteTestingFrequency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Concrete Testing Frequency *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select testing frequency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {testingFrequencies.map((frequency) => (
                  <SelectItem key={frequency} value={frequency}>
                    {frequency}
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
        name="qualityAssuranceLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quality Assurance Level *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select QA level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {qualityAssuranceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
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
        name="steelTestingRequired"
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
                Steel Testing Required *
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="thirdPartyInspection"
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
                Third Party Inspection
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}

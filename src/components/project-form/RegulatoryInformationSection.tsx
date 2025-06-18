
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const permitStatuses = [
  "Not Applied",
  "Applied",
  "Under Review",
  "Approved",
  "Rejected"
];

const siteSafetyLevels = [
  "Basic",
  "Standard",
  "Enhanced"
];

const fireSafetyRequirementsOptions = [
  "Fire Extinguishers",
  "Smoke Detectors",
  "Sprinkler System",
  "Fire Alarm System",
  "Emergency Exit Signs",
  "Fire Safety Training"
];

interface RegulatoryInformationSectionProps {
  form: any;
}

export default function RegulatoryInformationSection({ form }: RegulatoryInformationSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="localBuildingCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local Building Code *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter applicable local building codes and regulations"
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="permitStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Permit Status *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select permit status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {permitStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
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
        name="siteSafetyLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Site Safety Level *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select safety level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {siteSafetyLevels.map((level) => (
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
        name="environmentalClearance"
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
                Environmental Clearance Required
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fireNOCRequired"
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
                Fire NOC Required *
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="seismicDesignRequired"
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
                Seismic Design Required *
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="accessibilityCompliance"
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
                Accessibility Compliance Required
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="accessibilityFeatures"
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
                Accessibility Features
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="fireSafetyRequirements"
          render={() => (
            <FormItem>
              <FormLabel>Fire Safety Requirements *</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {fireSafetyRequirementsOptions.map((requirement) => (
                  <FormField
                    key={requirement}
                    control={form.control}
                    name="fireSafetyRequirements"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={requirement}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(requirement)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), requirement])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== requirement
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {requirement}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

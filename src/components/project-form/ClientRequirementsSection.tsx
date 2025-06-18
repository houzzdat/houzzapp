
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const qualityStandards = [
  "Standard Quality",
  "Premium Quality",
  "Luxury Quality",
  "Commercial Grade",
  "Industrial Grade"
];

const sustainabilityGoals = [
  "LEED Certification",
  "Energy Efficiency",
  "Water Conservation",
  "Sustainable Materials",
  "Waste Reduction",
  "Carbon Footprint Reduction"
];

const endUsePurposes = [
  "Residential - Single Family",
  "Residential - Multi Family",
  "Commercial - Office",
  "Commercial - Retail",
  "Industrial - Manufacturing",
  "Industrial - Warehouse",
  "Educational",
  "Healthcare",
  "Hospitality",
  "Mixed Use"
];

interface ClientRequirementsSectionProps {
  form: any;
}

export default function ClientRequirementsSection({ form }: ClientRequirementsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="budgetRange"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Budget Range (₹) *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter budget range"
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
        name="qualityStandards"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quality Standards *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality standards" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {qualityStandards.map((standard) => (
                  <SelectItem key={standard} value={standard}>
                    {standard}
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
        name="endUsePurpose"
        render={({ field }) => (
          <FormItem>
            <FormLabel>End Use Purpose *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select end use purpose" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {endUsePurposes.map((purpose) => (
                  <SelectItem key={purpose} value={purpose}>
                    {purpose}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="specialRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requirements</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter any special requirements or customizations"
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="sustainabilityGoals"
          render={() => (
            <FormItem>
              <FormLabel>Sustainability Goals</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {sustainabilityGoals.map((goal) => (
                  <FormField
                    key={goal}
                    control={form.control}
                    name="sustainabilityGoals"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={goal}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(goal)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), goal])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== goal
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {goal}
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

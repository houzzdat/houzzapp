
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const workforceAvailabilityOptions = [
  "Abundant",
  "Adequate",
  "Limited",
  "Scarce",
  "Need to Import"
];

const equipmentRequirements = [
  "Concrete Mixer",
  "Tower Crane",
  "Excavator",
  "Bulldozer",
  "Concrete Pump",
  "Scaffolding",
  "Welding Equipment",
  "Material Hoist"
];

interface ResourceConstraintsSectionProps {
  form: any;
}

export default function ResourceConstraintsSection({ form }: ResourceConstraintsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="workforceAvailability"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Workforce Availability</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select workforce availability" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {workforceAvailabilityOptions.map((option) => (
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
        name="timelineConstraints"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Timeline Constraints (months)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter timeline in months"
                {...field}
                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="budgetConstraints"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Budget Constraints (₹)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter maximum budget"
                {...field}
                onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="materialPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material Preferences</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Specify preferred materials, brands, or quality requirements"
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
          name="equipmentRequirements"
          render={() => (
            <FormItem>
              <FormLabel>Equipment Requirements</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {equipmentRequirements.map((equipment) => (
                  <FormField
                    key={equipment}
                    control={form.control}
                    name="equipmentRequirements"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={equipment}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(equipment)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, equipment])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== equipment
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {equipment}
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

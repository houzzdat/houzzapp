
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const acTypes = [
  "Split AC",
  "Window AC", 
  "VRF System",
  "Central AC",
  "Cassette AC"
];

interface MEPSystemsSectionProps {
  form: any;
}

export default function MEPSystemsSection({ form }: MEPSystemsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="totalElectricalLoad"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Electrical Load (kW) *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter total electrical load"
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
        name="numberOfLightPoints"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Light Points *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter number of light points"
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
        name="numberOfPowerPoints"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Power Points *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter number of power points"
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
        name="acType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>AC Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select AC type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {acTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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
        name="totalACTonnage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total AC Tonnage (TR)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.5"
                placeholder="Enter total AC tonnage"
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
        name="numberOfBathrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Bathrooms *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter number of bathrooms"
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
        name="numberOfKitchens"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Kitchens *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter number of kitchens"
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
        name="waterTankCapacity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Water Tank Capacity (liters) *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter water tank capacity"
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
        name="fireSafetyRequired"
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
                Fire Safety System Required
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}

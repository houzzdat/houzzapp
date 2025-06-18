
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const soilTypes = [
  "Black Cotton Soil",
  "Red Soil",
  "Sandy Soil",
  "Clay Soil",
  "Rock",
  "Mixed Soil"
];

const siteAccessOptions = [
  "Good",
  "Moderate", 
  "Difficult"
];

const climateZones = [
  "Hot and Dry",
  "Warm and Humid",
  "Moderate",
  "Cold",
  "Coastal"
];

const seismicZones = [
  "Zone I",
  "Zone II", 
  "Zone III",
  "Zone IV",
  "Zone V"
];

const existingUtilitiesOptions = [
  "Electricity",
  "Water Supply",
  "Drainage",
  "Gas Connection",
  "Internet/Cable",
  "Street Lighting"
];

interface SiteInformationSectionProps {
  form: any;
}

export default function SiteInformationSection({ form }: SiteInformationSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="siteAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Address *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter complete site address"
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
        name="plotDimensions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Plot Dimensions (sq ft) *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter plot area"
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
        name="soilType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Soil Type *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {soilTypes.map((type) => (
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
        name="soilBearingCapacity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Soil Bearing Capacity (kN/m²) *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter soil bearing capacity"
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
        name="waterTableLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Water Table Level (meters)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter water table level"
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
        name="siteAccess"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Site Access *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select site access" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {siteAccessOptions.map((access) => (
                  <SelectItem key={access} value={access}>
                    {access}
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
        name="climateZone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Climate Zone *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select climate zone" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {climateZones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
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
        name="seismicZone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Seismic Zone *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select seismic zone" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {seismicZones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
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
          name="existingUtilities"
          render={() => (
            <FormItem>
              <FormLabel>Existing Utilities</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {existingUtilitiesOptions.map((utility) => (
                  <FormField
                    key={utility}
                    control={form.control}
                    name="existingUtilities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={utility}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(utility)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), utility])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== utility
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {utility}
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

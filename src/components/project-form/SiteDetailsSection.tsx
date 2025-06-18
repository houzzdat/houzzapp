
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface SiteDetailsSectionProps {
  form: any;
}

export default function SiteDetailsSection({ form }: SiteDetailsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="siteAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Site Address</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter complete site address"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="plotDimensions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Plot Dimensions</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., 50x80 ft"
                {...field}
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
            <FormLabel>Soil Type</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Clay, Sandy, Rocky"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

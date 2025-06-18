
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const deliveryTimelines = [
  "Rush",
  "Standard", 
  "Flexible"
];

const paymentTermsOptions = [
  "Advance",
  "Standard",
  "Credit"
];

const preferredSuppliersOptions = [
  "Local Suppliers", 
  "Regional Suppliers",
  "National Suppliers",
  "International Suppliers",
  "Eco-friendly Suppliers"
];

interface ProcurementSectionProps {
  form: any;
}

export default function ProcurementSection({ form }: ProcurementSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="deliveryTimeline"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Delivery Timeline *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery timeline" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {deliveryTimelines.map((timeline) => (
                  <SelectItem key={timeline} value={timeline}>
                    {timeline}
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
        name="paymentTermsPreference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Terms Preference</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {paymentTermsOptions.map((terms) => (
                  <SelectItem key={terms} value={terms}>
                    {terms}
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
        name="bulkPurchasePreference"
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
                Bulk Purchase Preference
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="preferredSuppliers"
          render={() => (
            <FormItem>
              <FormLabel>Preferred Suppliers</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {preferredSuppliersOptions.map((supplier) => (
                  <FormField
                    key={supplier}
                    control={form.control}
                    name="preferredSuppliers"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={supplier}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(supplier)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), supplier])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== supplier
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {supplier}
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

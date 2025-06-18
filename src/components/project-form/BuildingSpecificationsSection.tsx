
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const constructionTypes = [
  "RCC Frame Structure",
  "Load Bearing Structure",
  "Steel Frame Structure",
  "Composite Structure",
  "Prefabricated Structure"
];

const architecturalStyles = [
  "Modern/Contemporary",
  "Traditional",
  "Colonial",
  "Industrial",
  "Minimalist",
  "Mediterranean"
];

const roofTypes = [
  "RCC Slab",
  "Pitched Roof",
  "Flat Roof",
  "Green Roof",
  "Metal Roofing",
  "Tile Roofing"
];

interface BuildingSpecificationsSectionProps {
  form: any;
}

export default function BuildingSpecificationsSection({ form }: BuildingSpecificationsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="builtUpArea"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Built-up Area (sq ft) *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter built-up area"
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
        name="numberOfFloors"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Floors *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter number of floors"
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
        name="floorHeight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Floor Height (ft) *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.1"
                placeholder="Enter floor height"
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
        name="floorToFloorHeight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Floor to Floor Height (mm) *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter floor to floor height"
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
        name="externalWallThickness"
        render={({ field }) => (
          <FormItem>
            <FormLabel>External Wall Thickness (mm) *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter external wall thickness"
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
        name="internalWallThickness"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Internal Wall Thickness (mm) *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter internal wall thickness"
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
        name="constructionType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Construction Type *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select construction type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {constructionTypes.map((type) => (
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
        name="architecturalStyle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Architectural Style</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select architectural style" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {architecturalStyles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style}
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
        name="roofType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Roof Type *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select roof type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {roofTypes.map((type) => (
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
    </div>
  );
}

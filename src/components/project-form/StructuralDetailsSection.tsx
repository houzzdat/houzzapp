
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const foundationTypes = [
  "Isolated Footing",
  "Combined Footing",
  "Strip Foundation",
  "Raft Foundation",
  "Pile Foundation"
];

const structuralSystems = [
  "RCC Frame",
  "Steel Frame",
  "Load Bearing Wall",
  "Precast Concrete",
  "Composite Structure"
];

const structuralGradeConcreteOptions = [
  "M15",
  "M20",
  "M25",
  "M30",
  "M35",
  "M40"
];

const steelGradeOptions = [
  "Fe415",
  "Fe500",
  "Fe550"
];

interface StructuralDetailsSectionProps {
  form: any;
}

export default function StructuralDetailsSection({ form }: StructuralDetailsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="foundationType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Foundation Type *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select foundation type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {foundationTypes.map((type) => (
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
        name="structuralSystem"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Structural System *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select structural system" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {structuralSystems.map((system) => (
                  <SelectItem key={system} value={system}>
                    {system}
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
        name="structuralGradeConcrete"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Structural Grade Concrete *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select concrete grade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {structuralGradeConcreteOptions.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
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
        name="steelGrade"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Steel Grade *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select steel grade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {steelGradeOptions.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
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
        name="wallThickness"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Wall Thickness (inches) *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter wall thickness"
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
          name="columnSpecifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Column Specifications *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter column specifications (e.g., 12x18 RCC columns, Grade of concrete M25)"
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}


import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const qualityGrades = [
  "Economy",
  "Standard",
  "Premium",
  "Luxury"
];

const brickTypes = [
  "Common Burnt Clay",
  "Fly Ash Bricks",
  "Concrete Blocks",
  "AAC Blocks",
  "Red Clay Bricks"
];

const cementTypes = [
  "OPC 43",
  "OPC 53", 
  "PPC",
  "PSC"
];

const tileQualities = [
  "Ceramic",
  "Vitrified",
  "Natural Stone",
  "Porcelain"
];

const paintTypes = [
  "Emulsion", 
  "Enamel",
  "Texture",
  "Primer",
  "Distemper"
];

const windowMaterials = [
  "Aluminum",
  "UPVC",
  "Wood",
  "Steel"
];

const sanitaryWareQualities = [
  "Economy",
  "Standard", 
  "Premium"
];

interface MaterialQualityFieldsProps {
  form: any;
}

export default function MaterialQualityFields({ form }: MaterialQualityFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="constructionQualityGrade"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Construction Quality Grade *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality grade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {qualityGrades.map((grade) => (
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
        name="brickType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brick Type *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select brick type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {brickTypes.map((type) => (
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
        name="cementType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cement Type *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select cement type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {cementTypes.map((type) => (
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
        name="tileQuality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tile Quality</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select tile quality" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {tileQualities.map((quality) => (
                  <SelectItem key={quality} value={quality}>
                    {quality}
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
        name="paintType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Paint Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select paint type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {paintTypes.map((type) => (
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
        name="windowMaterial"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Window Material *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select window material" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {windowMaterials.map((material) => (
                  <SelectItem key={material} value={material}>
                    {material}
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
        name="sanitaryWareQuality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sanitary Ware Quality</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select sanitary ware quality" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sanitaryWareQualities.map((quality) => (
                  <SelectItem key={quality} value={quality}>
                    {quality}
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

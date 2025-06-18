
import MaterialActionButtons from "./MaterialActionButtons";
import MaterialQualityFields from "./MaterialQualityFields";

interface MaterialStandardsSectionProps {
  form: any;
}

export default function MaterialStandardsSection({ form }: MaterialStandardsSectionProps) {
  return (
    <div className="space-y-6">
      <MaterialActionButtons />
      <MaterialQualityFields form={form} />
    </div>
  );
}

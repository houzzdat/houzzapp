
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileHeaderProps {
  workerName: string;
}

export default function ProfileHeader({ workerName }: ProfileHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        onClick={() => navigate('/labor-management')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2" size={16} />
        Back to Labor Management
      </Button>
      
      <h1 className="text-3xl font-bold text-brand-dark-blue mb-2">
        {workerName}'s Profile
      </h1>
      <p className="text-brand-gray">
        Complete worker profile and activity history
      </p>
    </div>
  );
}

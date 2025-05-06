import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "../ui/button";

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <LucideLoaderCircle className="animate-spin mr-2 w-4 h-4" />
      ) : null}
      {label}
    </Button>
  );
};

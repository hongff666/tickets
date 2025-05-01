import { LucideLoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex-1 flex justify-center items-center self-center">
      <LucideLoaderCircle className="w-16 h-16 animate-spin" />
    </div>
  );
};

export { Spinner };

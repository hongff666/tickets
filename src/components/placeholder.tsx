import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement, ReactElement } from "react";

type PlaceHolderProps = {
  label: string;
  icon?: ReactElement<{ className?: string }>;
  button?: ReactElement<{ className?: string }>;
};

const PlaceHolder = ({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div />,
}: PlaceHolderProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-y-2">
      {cloneElement(icon, {
        className: "h-16 w-16",
      })}
      <h1 className="text-2xl font-bold">{label}</h1>
      {cloneElement(button, {
        className: "h-10",
      })}
    </div>
  );
};

export { PlaceHolder };

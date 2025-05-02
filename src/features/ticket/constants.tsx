import {
  LucideCircleCheck,
  LucideFileText,
  LucideNotebookPen,
} from "lucide-react";

const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  CLOSED: <LucideCircleCheck />,
  IN_PROGRESS: <LucideNotebookPen />,
};

export { TICKET_ICONS };

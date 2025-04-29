import {
  LucideCircleCheck,
  LucideFileText,
  LucideNotebookPen,
} from "lucide-react";

const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  DONE: <LucideCircleCheck />,
  "IN-PROGRESS": <LucideNotebookPen />,
};

export { TICKET_ICONS };

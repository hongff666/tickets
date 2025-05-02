import { TicketStatus } from "@prisma/client";
import {
  LucideCircleCheck,
  LucideFileText,
  LucideNotebookPen,
} from "lucide-react";

const TICKET_ICONS: Record<TicketStatus, React.ReactElement> = {
  OPEN: <LucideFileText />,
  CLOSED: <LucideCircleCheck />,
  IN_PROGRESS: <LucideNotebookPen />,
};

export { TICKET_ICONS };

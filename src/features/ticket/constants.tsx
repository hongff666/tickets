import { TicketStatus } from '@prisma/client'
import {
  LucideCircleCheck,
  LucideFileText,
  LucideNotebookPen,
} from 'lucide-react'

const TICKET_ICONS: Record<TicketStatus, React.ReactElement> = {
  OPEN: <LucideFileText />,
  CLOSED: <LucideCircleCheck />,
  IN_PROGRESS: <LucideNotebookPen />,
}

export { TICKET_ICONS }

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: 'Open',
  CLOSED: 'Closed',
  IN_PROGRESS: 'In Progress',
}

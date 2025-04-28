import {
  LucideCircleCheck,
  LucideFileText,
  LucideNotebookPen,
} from "lucide-react";
import Link from "next/link";

import { Heading } from "@/components/heading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  DONE: <LucideCircleCheck />,
  "IN-PROGRESS": <LucideNotebookPen />,
};

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Tickets Page"
        description="All your tickets in one place."
      />

      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
        {initialTickets.map((ticket) => {
          return (
            <Card key={ticket.id} className="w-full max-w-[420px]">
              <CardHeader>
                <CardTitle className="flex gap-x-2 items-center">
                  <p>{TICKET_ICONS[ticket.status]}</p>
                  <span className="truncate">{ticket.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 whitespace-break-spaces">
                  {ticket.content +
                    ticket.content +
                    ticket.content +
                    ticket.content +
                    ticket.content +
                    ticket.content +
                    ticket.content}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={ticketPath(ticket.id)} className="underline">
                  view
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default TicketsPage;

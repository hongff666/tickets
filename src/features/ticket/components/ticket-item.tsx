import { LucideExternalLink } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ticketPath } from "@/paths";

import { TICKET_ICONS } from "../constants";
import type { Ticket } from "../types";

type TicketItemProps = {
  ticket: Ticket;
};

const TicketItem = ({ ticket }: TicketItemProps) => {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link href={ticketPath(ticket.id)}>
        <LucideExternalLink className="w-4 h-4" />
      </Link>
    </Button>
  );
  return (
    <div className="w-full max-w-[420px] flex gap-x-1">
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center">
            <p>{TICKET_ICONS[ticket.status]}</p>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 whitespace-break-spaces">
            {ticket.content}
          </p>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-y-2">
        {detailButton}
      </div>
    </div>
  );
};

export { TicketItem };

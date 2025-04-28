import clsx from "clsx";
import Link from "next/link";

import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const TICKET_ICONS = {
  OPEN: "🟢",
  DONE: "✅",
  "IN-PROGRESS": "🔵",
};

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tickets Page</h2>
        <p className="text-sm text-muted-foreground">
          All your tickets in one place.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
        {initialTickets.map((ticket) => {
          return (
            <div key={ticket.id} className="w-full max-w-[420px] p-4 border border-slate-500 rounded">
              <h3 className="text-lg font-semibold truncate">{ticket.title}</h3>
              <p className={clsx("text-sm text-slate-500 truncate",{
                "line-through": ticket.status === "DONE", 
              })}>
                {ticket.content + ticket.content + ticket.content}
              </p>
              <p>{TICKET_ICONS[ticket.status]}</p>

              <Link href={ticketPath(ticket.id)} className="underline">
                view
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TicketsPage;

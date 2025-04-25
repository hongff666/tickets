import Link from "next/link";

import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const TicketsPage = () => {
  const tickets = initialTickets;

  return (
    <div>
      {tickets.map((ticket) => {
        return (
          <div key={ticket.id} className="border-2 border-gray-300 p-4 rounded-md shadow-md mb-2">
            <h2>{ticket.title}</h2>
            <p>{ticket.content}</p>
            <Link href={ticketPath(ticket.id)} className="underline">
              detail
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default TicketsPage;

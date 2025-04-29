import Link from "next/link";

import { PlaceHolder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { ticketsPath } from "@/paths";

type TicketPagePropsType = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPagePropsType) => {
  // 获取ticketId参数
  const ticketId = (await params).ticketId;

  // 根据ticketId获取ticket数据
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  if (ticket) {
    return (
      <div className="border-2 border-gray-300 p-4 rounded-md shadow-md">
        <h2 className="text-lg">{ticket.title}</h2>
        <p>{ticket.content}</p>
        <p>{ticket.createdAt.toISOString()}</p>
        <p>{ticket.updatedAt.toISOString()}</p>
        <p>{ticket.status}</p>
      </div>
    );
  } else {
    return (
      <PlaceHolder
        label="Ticket not found"
        button={
          <Button asChild variant="outline">
            <Link href={ticketsPath()}>Go to Tickets</Link>
          </Button>
        }
      />
    );
  }
};

export default TicketPage;

import Link from "next/link";

import { PlaceHolder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { TicketItem } from "@/features/ticket/components/ticket-item";
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
      <div className="flex flex-col items-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
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

import { notFound } from "next/navigation";

import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketPagePropsType = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPagePropsType) => {
  // 获取ticketId参数
  const ticketId = (await params).ticketId;

  // 根据ticketId获取ticket数据
  const ticket = await getTicket(ticketId);

  if (ticket) {
    return (
      <div className="flex flex-col items-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>
    );
  } else {
    notFound();
  }
};

export default TicketPage;

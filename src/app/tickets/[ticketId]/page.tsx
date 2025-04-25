import { initialTickets } from "@/data";

type TicketPagePropsType = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPagePropsType) => {
  // 获取ticketId参数
  const ticketId = (await params).ticketId;

  // 更具ticketId获取ticket数据
  const ticket = initialTickets.find(
    (ticket) => ticket.id === ticketId
  );

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
    return <p>Ticket not found</p>;
  }
};

export default TicketPage;

type TicketPagePropsType = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPagePropsType) => {
  // 获取ticketId参数
  const ticketId = (await params).ticketId;

  return (
    <div>
      <p>ticketId: {ticketId}</p>
    </div>
  );
};

export default TicketPage;

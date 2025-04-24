const TicketPage = async ({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) => {
  // 获取ticketId参数
  const ticketId = (await params).ticketId;

  return (
    <div>
      <p>ticketId: {ticketId}</p>
    </div>
  );
};
export default TicketPage;

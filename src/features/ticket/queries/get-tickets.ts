import { prisma } from '@/lib/prisma'

const getTickets = async () => {
  const tickets = await prisma.ticket.findMany()
  return tickets
}
export { getTickets }

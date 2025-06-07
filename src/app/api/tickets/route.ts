import { getTickets } from '@/features/ticket/queries/get-tickets'

export async function GET() {
  const { list, metadata } = await getTickets(undefined, {
    page: 0,
    size: 10,
    sortKey: 'createdAt',
    sortValue: 'desc',
    q: '',
  })
  return Response.json({ list, metadata })
}

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
    ],
  })

function formatQuery(query: string, paramsJson: string): string {
  let params: any[]

  try {
    params = JSON.parse(paramsJson)
  } catch (e) {
    return query + ' /* Failed to parse params */'
  }

  if (!Array.isArray(params)) return query + ' /* Params not array */'

  let i = 0
  return query.replace(/\$(\d+)/g, () => {
    const param = params[i++]
    if (param === null) return 'NULL'
    if (typeof param === 'string') return `'${param.replace(/'/g, "''")}'`
    if (typeof param === 'object') return `'${JSON.stringify(param)}'`
    return String(param)
  })
}

;(prisma as any).$on('query', (e: any) => {
  const formatted = formatQuery(e.query, e.params)
  console.log(`Query: ${formatted} - Duration: ${e.duration}ms`)
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export { prisma }

import { MyBig } from '@/lib/bit'

export const toCent = (amount: number) => {
  return new MyBig(amount).mul(100).round(2).toNumber()
}

export const fromCent = (amount: number) => {
  return new MyBig(amount).div(100).round(2).toNumber()
}

export const toCurrentFromCent = (amount: number, currency = 'USD') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return formatter.format(fromCent(amount))
}

export const isEmptyValue = (value: any): boolean => {
  return value === '' || value === null || value === undefined
}
export const convertToLocaleString = (num: number): string => num.toLocaleString()

export const convertToFixed = (num: number): string => num.toFixed(2)

export const convertToCurrency = (num: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR'
  }).format(num)

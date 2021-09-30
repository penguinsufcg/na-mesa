export const formatCurrency = (money: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(money)
}

export const formatTime = (date: string, options: Intl.DateTimeFormatOptions | undefined): string => {
  const dateObject = new Date(date)

  return dateObject.toLocaleTimeString('pt-br', { ...options })
}

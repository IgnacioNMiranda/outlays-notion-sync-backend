export interface CreateOutlayPageDTO {
  name: string
  date: string
  tags: string[]
  price: number
  type: 'Outlay' | 'Refund'
  paymentMethod: string
  installments?: number
}

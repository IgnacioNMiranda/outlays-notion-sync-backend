export interface CreateOutlayPageDTO {
  name: string
  date: string
  tags: string[]
  price: number
  refund?: number
  paymentMethod: string
  installments?: number
}

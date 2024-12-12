export enum OrderStatus {
  Created = 'Created',
  AssignedToTailor = 'AssignedToTailor',
  Processing = 'Processing',
  Completed = 'Completed',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Canceled = 'Canceled',
}

export interface OrderData {
  userId: string
  garment: string
  color: string
  fabric: string
  measurument: Record<string, number>
  customOptions: Record<string, string>
  status: OrderStatus
  tailorId?: string | null
  created: string
  updated: string
}

export interface Order extends OrderData {
  id: string
}

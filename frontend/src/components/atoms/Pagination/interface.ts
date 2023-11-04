import { IServerResponse } from 'models/serverResponse'

export interface PaginationProps {
  className?: string
  pageCount: number
  apiRequest: (page?: number) => Promise<IServerResponse>
}

export interface IApiPaginatedListResponse<T> {
  count: number
  next: string
  previous: string
  results: T[]
}

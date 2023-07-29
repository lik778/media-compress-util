export interface ServiceResponse<T> {
  code: number
  data: T
  message: string
}
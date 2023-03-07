export interface IRatesResponse {
  meta: {
    key: string
    serverTime: string
    status: number
  }
  data: {
    root: {
      ratesTable: Record<string, IFixationResponse>
    }
  }
}

export interface IFixationResponse {
  borrowingRate: number
  monthlyRate: number
}

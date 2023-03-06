export enum StatusCodes {
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404
}

export interface IHttpServiceConfig {
  baseUrl: string
  contentType?: string
  baseHeaders?: Record<string, string>
}

export interface IClientOpts<S> {
  headers?: Record<string, string>
  method: string
  payload?: S
}

export const DEFAULT_CONTENT_TYPE = 'application/json'

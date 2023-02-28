export interface AuthTokenResult {
  email: string
  sub: string
  iat: number
  exp: number
}

export interface IUseToken {
  email: string
  sub: string
  isExpired: boolean
}

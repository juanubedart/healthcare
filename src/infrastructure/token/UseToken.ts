import * as jwt from "jsonwebtoken"
import { AuthTokenResult, IUseToken } from "./AuthInterfaces"

export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwt.decode(token) as AuthTokenResult

    const currentDate = new Date()
    const expiredDate = new Date(decode.exp)

    return {
      sub: decode.sub,
      email: decode.email,
      isExpired: +expiredDate <= +currentDate / 1000,
    }
  } catch (error) {
    return "Invalid token"
  }
}

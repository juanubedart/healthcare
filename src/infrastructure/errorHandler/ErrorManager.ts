import { HttpException, HttpStatus } from "@nestjs/common"

export class ErrorManager extends Error {
  constructor({ type, message }: { type: keyof typeof HttpStatus; message: string }) {
    super(`${type} :: ${message}`)
  }

  public static createSignature(message: string) {
    if (message.includes(" :: ")) {
      const name = message.split(" :: ")[0]
      throw new HttpException(message, HttpStatus[name])
    }

    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

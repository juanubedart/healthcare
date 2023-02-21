import { ICrypto } from "./ICrypto"
import * as bcrypt from "bcrypt"

export class Crypto implements ICrypto {
  async encrypt(value: string): Promise<string> {
    const encrypted = await bcrypt.hash(value, +process.env.HASH_SALT)
    return encrypted
  }
  async compare(value: string, valueEncrypted: string): Promise<boolean> {
    const match = await bcrypt.compare(value, valueEncrypted)
    return match
  }
}

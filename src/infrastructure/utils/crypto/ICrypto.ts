export interface ICrypto {
  encrypt(value: string): Promise<string>
  compare(value: string, valueEncrypted: string): Promise<boolean>
}

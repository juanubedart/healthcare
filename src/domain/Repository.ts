import { DeleteResult, UpdateResult } from "typeorm"

export abstract class Repository<T> {
  abstract create(entity: T): Promise<T>
  abstract update(id: string, entity: T): Promise<UpdateResult | undefined>
  abstract delete(id: string): Promise<DeleteResult | undefined>
  abstract findOne(id: string): Promise<T>
  abstract findAll(): Promise<T[]>
}

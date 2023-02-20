import { Module } from "@nestjs/common"
import { ParientsController } from "../controllers/parients.controller"

@Module({
  controllers: [ParientsController],
})
export class ParientsModule {}

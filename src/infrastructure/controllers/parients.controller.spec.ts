import { Test, TestingModule } from "@nestjs/testing"
import { ParientsController } from "./parients.controller"

describe("ParientsController", () => {
  let controller: ParientsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParientsController],
    }).compile()

    controller = module.get<ParientsController>(ParientsController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })
})

import { Test, TestingModule } from "@nestjs/testing"
import { EventMedicalHistoryController } from "./eventsMedicalHistorycontroller"

describe("EventMedicalHistoryController", () => {
  let controller: EventMedicalHistoryController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventMedicalHistoryController],
    }).compile()

    controller = module.get<EventMedicalHistoryController>(EventMedicalHistoryController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })
})

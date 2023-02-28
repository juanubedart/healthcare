import { Injectable, NestMiddleware } from "@nestjs/common"
import { InjectSentry, SentryService } from "@ntegral/nestjs-sentry"
import { Handlers } from "@sentry/node"

@Injectable()
export class SentryMiddleware implements NestMiddleware {
  constructor(@InjectSentry() private readonly sentryService: SentryService) {}

  use(req: any, res: any, next: () => void) {
    this.sentryService.instance().configureScope((scope) => {
      scope.addEventProcessor((event) => {
        return Handlers.parseRequest(event, req)
      })
    })

    next()
  }
}

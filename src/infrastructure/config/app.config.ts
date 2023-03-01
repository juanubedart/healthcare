import { registerAs } from "@nestjs/config"

export default registerAs("app", () => ({
  apiPrefix: "api/v1",
  fallbackLanguage: "en",
  headerLanguage: process.env.APP_HEADER_LANGUAGE || "x-custom-lang",
}))

import { SetMetadata } from "@nestjs/common"
import { PUBLIC_KEY } from "../constants"

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true)

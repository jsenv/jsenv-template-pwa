// eslint-disable-next-line import/no-unresolved
import { DEV } from "#env"

const message = DEV ? "development" : "production"
document.querySelector("#message").innerHTML = message

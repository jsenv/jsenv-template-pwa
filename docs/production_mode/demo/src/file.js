const message = import.meta.dev ? "development" : "production"
document.querySelector("#message").innerHTML = message

import { dev } from "#env"

export const greet = () => {
  return dev ? "Welcome dev" : "Welcome"
}

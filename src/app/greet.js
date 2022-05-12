export const greet = () => {
  return import.meta.dev ? "Welcome dev" : "Welcome"
}

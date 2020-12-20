export const createDOM = (stringContainingHTMLSource) => {
  const domParser = new DOMParser()
  const document = domParser.parseFromString(stringContainingHTMLSource, "text/html")
  return document
}

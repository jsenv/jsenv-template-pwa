/*
 * TODO: explain this file and display the browser not supported message
 * explain that this file will be served as such (only minified)
 * so it must use very compatible js
 */

var userAgent = window.navigator.userAgent

function browserIsSupported() {
  var isIE = typeof document.documentMode !== "undefined"
  if (isIE) {
    return false
  }

  var chromeVersion = versionFromUserAgent(
    /(?:chrome|chromium|crios|crmo)\/(\d+)/i,
  )
  if (chromeVersion && chromeVersion < 55) {
    return false
  }

  var edgeVersion = versionFromUserAgent(
    /(?:edge|edgea|edgios)\/(\d+)/i,
    userAgent,
  )
  if (edgeVersion && edgeVersion < 14) {
    return false
  }

  var firefoxVersion = versionFromUserAgent(
    /(?:firefox|iceweasel|fxios)[\s/](\d+)/i,
  )
  if (firefoxVersion && firefoxVersion < 52) {
    return false
  }

  var safariVersion =
    !chromeVersion && /safari|applewebkit/i.test(userAgent)
      ? versionFromUserAgent(/version\/(\d+)/i)
      : undefined
  if (safariVersion && safariVersion < 11) {
    return false
  }

  return true
}

function versionFromUserAgent(regexp) {
  var match = userAgent.match(regexp)
  if (!match || match.length === 0) return undefined
  var firstMatch = match[1]
  var version = parseInt(firstMatch)
  return version
}

window.browserIsSupported = browserIsSupported()

if (!window.browserIsSupported) {
  document.getElementById("browser_not_supported").style.display = "block"
}

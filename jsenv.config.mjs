/*
 * This file exports configuration reused by jsenv scripts such as
 *
 * script/test/test.mjs
 * script/build/build.mjs
 *
 * See https://github.com/jsenv/jsenv-core#jsenvconfigjs
 */
import { jsenvPrivateKey, jsenvCertificate } from "@jsenv/server"

export const projectDirectoryUrl = String(new URL("./", import.meta.url))

/*
 * Certificate is valid for one year. After that,
 * browsers consider certificate as expired.
 *
 * When omitted "@jsenv/core" uses certificates from its
 * own version of "@jsenv/server". By passing explicitely
 * the certificate below we can be in advance on "@jsenv/core"
 * version of the certificate.
 * It allow us to update only "@jsenv/server" to get latest certificate
 * without being forced to also update "@jsenv/core".
 */
export const compileServerCertificate = jsenvCertificate
export const compileServerPrivateKey = jsenvPrivateKey

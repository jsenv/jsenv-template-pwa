import { assert } from "@jsenv/assert"
import { greet } from "@jsenv/template-node-package"

const actual = greet()
const expected = "Hello world"
assert({ actual, expected })

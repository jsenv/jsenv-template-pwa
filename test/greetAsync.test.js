import { assert } from "@jsenv/assert"
import { greetAsync } from "@jsenv/template-node-package"

const actual = await greetAsync()
const expected = "Hello world"
assert({ actual, expected })

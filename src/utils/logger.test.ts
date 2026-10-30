import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";

import { Logger } from "./logger.ts";

afterEach(() => mock.restoreAll());

test("error logs Error details as structured server context", () => {
  const consoleError = mock.method(console, "error", () => {});
  const logger = new Logger("payments");
  const error = new TypeError("card declined");

  logger.error("Payment failed", error);

  assert.equal(consoleError.mock.callCount(), 1);

  const [output] = consoleError.mock.calls[0].arguments;
  assert.match(
    output,
    /^\x1b\[31m\[\d{4}-\d{2}-\d{2}T[^\]]+\] \[SERVER\] \[payments\] Payment failed\x1b\[0m /,
  );

  const details = JSON.parse(output.slice(output.indexOf(" {") + 1));
  assert.deepEqual(
    { name: details.name, message: details.message },
    { name: "TypeError", message: "card declined" },
  );
  assert.match(details.stack, /^TypeError: card declined/);
});

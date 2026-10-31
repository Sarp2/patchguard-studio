import assert from "node:assert/strict";
import { mock, test } from "node:test";

import { Logger } from "./logger.ts";

test("Logger.info writes a server log with context and data", () => {
  const log = mock.method(console, "log", () => {});
  const logger = new Logger("orders");

  logger.info("Order created", { orderId: "123" });

  assert.equal(log.mock.calls.length, 1);
  assert.match(
    log.mock.calls[0].arguments[0] as string,
    /\x1b\[34m\[.+\] \[SERVER\] \[orders\] Order created\x1b\[0m {"orderId":"123"}/,
  );
});

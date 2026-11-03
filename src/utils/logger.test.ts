import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Logger } from "./logger";

describe("Logger", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-02T03:04:05.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it.each([
    ["info", "log", "\x1b[34m"],
    ["warn", "warn", "\x1b[33m"],
    ["debug", "debug", "\x1b[90m"],
    ["action", "log", "\x1b[35m"],
  ] as const)("writes %s messages to console.%s", (level, consoleMethod, color) => {
    const consoleSpy = vi.spyOn(console, consoleMethod).mockImplementation(() => undefined);
    const logger = new Logger("Worker");

    logger[level]("completed", { jobId: 42 });

    expect(consoleSpy).toHaveBeenCalledWith(
      `${color}[2025-01-02T03:04:05.000Z] [SERVER] [Worker] completed\x1b[0m {"jobId":42}`,
    );
  });

  it("serializes Error details before writing an error message", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const logger = new Logger("Worker");

    logger.error("job failed", new Error("network unavailable"));

    expect(consoleSpy).toHaveBeenCalledOnce();
    expect(consoleSpy.mock.calls[0][0]).toContain(
      '\x1b[31m[2025-01-02T03:04:05.000Z] [SERVER] [Worker] job failed\x1b[0m {"name":"Error","message":"network unavailable"',
    );
  });
});

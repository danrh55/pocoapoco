import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { run } from "./flow.ts";
import { tools } from "./registry.ts";
import type { IO } from "./types.ts";

const rl = readline.createInterface({ input, output });

let closed = false;
rl.on("close", () => {
  closed = true;
});

const io: IO = {
  print: (text) => console.log(text),
  read: async (prompt) => {
    if (closed) return null;
    try {
      const line = await rl.question(prompt);
      const trimmed = line.trim();
      if (trimmed === "" || trimmed === "/quit" || trimmed === "/exit") return null;
      return line;
    } catch {
      return null;
    }
  },
};

const url = await rl.question("YouTube URL: ");
if (!url.trim()) {
  console.log("No URL provided.");
  process.exit(0);
}

console.log(`tools: ${tools.list().join(", ") || "(none registered)"}`);

await run(url.trim(), io);

rl.close();

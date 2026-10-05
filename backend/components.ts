import type { Components } from "./types.ts";

import { decisions } from "./decisions/index.ts";
import { judge } from "./decisions/judge.ts";
import { speaker } from "./engine/index.ts";
import { analyzer } from "./analyzer/index.ts";
import { learnerModel } from "./learner-model/index.ts";
import { support } from "./tools/support/index.ts";
import { correction } from "./tools/correction/index.ts";

/**
 * The wiring.
 *
 * The flow takes its components as an argument so it reads top to bottom with
 * nothing hidden. This is where they are actually supplied — the one place the
 * loop's parts are named.
 *
 * Every component is a stub. Filling one in must not change the flow.
 */
export const components: Components = {
  decisions,
  speaker,
  analyzer,
  judge,
  support,
  correction,
  learnerModel,
};
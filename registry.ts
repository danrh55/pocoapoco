/**
 * The plug mechanism.
 *
 * A registry maps a name to a spec. Adding a capability — a tool, a verdict, a
 * question strategy — is registration. The flow and the component signatures never
 * change.
 */

export type Named = { name: string };

export function createRegistry<T extends Named>() {
  const items = new Map<string, T>();
  return {
    register(item: T): T {
      items.set(item.name, item);
      return item;
    },
    get(name: string): T | undefined {
      return items.get(name);
    },
    list(): string[] {
      return [...items.keys()];
    },
  };
}

export type Tool = Named & { run: (input: unknown) => Promise<unknown> };

/** Empty by design. Add a tool with `tools.register({ name, run })`. */
export const tools = createRegistry<Tool>();

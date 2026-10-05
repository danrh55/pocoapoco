/**
 * Analyzer references — a stub.
 *
 * Each entry names one way the learner can have gone wrong, written so the
 * analyzer can tell it from its neighbours: what it covers, what belongs to a
 * neighbouring issue instead, a few examples.
 *
 * Composed the same way as the tool registries. Adding a factor means adding a
 * file and exporting it from this one — the analyzer picks it up without change,
 * because the option set is built from what is registered.
 *
 * The list is open and empty. Propositional frame, aspect, recipient, and object
 * relatedness are the first candidates, and a factor earns a file once a
 * diagnosis keeps pointing at it.
 */
export function references(): Record<string, string> {
  return {};
}
/**
 * Analyzer factors — a stub.
 *
 * Each entry names one way the learner can have gone wrong, written so the
 * analyzer can tell it from its neighbours: what it covers, what belongs to a
 * neighbouring factor instead, a few examples. It is the content behind a
 * diagnosis's `factor`.
 *
 * Composed the same way as the tool registries. Adding a factor means adding a
 * file and exporting it from this one.
 *
 * The list is open and empty. Propositional frame, aspect, recipient, and object
 * relatedness are the first candidates, and a factor earns a file once a
 * diagnosis keeps pointing at it.
 */
export function references(): Record<string, string> {
  return {};
}
// Real-Life Patch Notes: The Comedy Changelog
//
// A tiny program that writes one funny one-line patch note for a bug in
// real life or human biology to /output/entry.txt (max 160 characters).
//
// How it works: a short list of candidate lines I wrote myself is scored
// against the judge's brief (real release-note register, a version number,
// a specific recognisable bug of the body or of daily life, terse wording,
// no padding), and the best-scoring line is written out. The choice is
// fully deterministic: same input, same output, every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 160;

// The example line from the competition brief. A candidate that matches
// it byte for byte would be the house's own text, not ours, so it is
// refused outright even if it scored well.
const BRIEF_EXAMPLE =
  "v2.4.1: fixed a bug where the left ear rendered audio 40ms late after a full night of sleep.";

// Every candidate is one line: version + "fixed a bug" + one specific,
// recognisable bug of the body or of daily life, stated as if it shipped.
const CANDIDATES: Array<{ text: string; punch: number }> = [
  {
    // The 3 a.m. cringe replay: universal, specific (a year, an hour),
    // and the reader winces first, then laughs. "Your most" makes the
    // embarrassment personal instead of abstract.
    text: "v3.1.4: fixed a bug where the brain replayed your most embarrassing moment from 2009 at 3 a.m. for no reason.",
    punch: 10,
  },
  {
    // Walking into a room and forgetting why: the task queue wiped.
    text: "v5.1.0: fixed a bug where entering a room wiped the task queue; users now remember why they stood up.",
    punch: 9,
  },
  {
    // A limb that falls asleep reads as a device uninstalled overnight.
    text: "v4.0.7: fixed a bug where sleeping on your arm uninstalled it until morning; limb now reconnects on wake.",
    punch: 8,
  },
  {
    // The phone that never rang: phantom vibration as a false push alert.
    text: "v2.7.3: fixed a bug where the leg reported an incoming call that never happened; phantom vibrations removed.",
    punch: 8,
  },
  {
    // Contagious yawning as an unauthorised sync between nearby users.
    text: "v3.0.4: fixed a bug where yawning replicated to nearby users without permission; sync now opt-in only.",
    punch: 6,
  },
  {
    // The stomach with the worst possible timing for its loudest moment.
    text: "v1.9.2: fixed a bug where the stomach growled loudest during silent moments; volume capped in meetings.",
    punch: 6,
  },
];

// Words that pin a line to the body or to daily life, so the bug is one
// the reader recognises in themselves instead of a generic complaint.
const BODY_WORDS = [
  "brain",
  "arm",
  "leg",
  "stomach",
  "ear",
  "eye",
  "knee",
  "yawning",
  "room",
];

function score(line: string, punch: number): number {
  let points = punch;
  // Reads like an actual release note: a version number up front.
  if (/^v\d+\.\d+\.\d+:/.test(line)) points += 30;
  // A fix stated as if it shipped, in the terse engineering register.
  if (/fixed a bug/i.test(line)) points += 25;
  // Uses its characters well: long enough to land the joke, never padded.
  if (line.length >= 80 && line.length <= MAX_CHARS) points += 20;
  // Names a specific, recognisable bug of the body or of daily life.
  const lower = line.toLowerCase();
  if (BODY_WORDS.some((word) => lower.includes(word))) points += 15;
  // One clean line, finished like a changelog entry.
  if (line.endsWith(".")) points += 10;
  return points;
}

function pickBest(): string {
  // Never ship the brief's own example line, or any line over the cap.
  const eligible = CANDIDATES.filter(
    (c) => c.text !== BRIEF_EXAMPLE && c.text.length <= MAX_CHARS,
  );
  if (eligible.length === 0) throw new Error("no eligible candidate line");
  let best = eligible[0];
  let bestScore = score(best.text, best.punch);
  for (const candidate of eligible.slice(1)) {
    const candidateScore = score(candidate.text, candidate.punch);
    if (candidateScore > bestScore) {
      best = candidate;
      bestScore = candidateScore;
    }
  }
  return best.text;
}

function main(): void {
  const entry = pickBest();

  // The gate: UTF-8 text of 1 to 160 characters, not only white space,
  // a single line. Anything else is refused rather than shipped.
  if (entry.length < 1 || entry.length > MAX_CHARS) {
    throw new Error(`entry is ${entry.length} characters, must be 1-${MAX_CHARS}`);
  }
  if (entry.trim().length === 0 || entry.includes("\n")) {
    throw new Error("entry must be one non-blank line");
  }

  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, entry, "utf8");
  console.log(`${entry.length} chars -> ${outPath}`);
  console.log(entry);
}

main();

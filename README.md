[![make.fun · u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d](https://make.fun/badge/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d.svg)](https://make.fun/bounty/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d?utm_source=github&utm_medium=readme&utm_campaign=u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d)
[![rank](https://make.fun/badge/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d/kunala23/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d/rank.svg)](https://make.fun/bounty/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d)
[![reward](https://make.fun/badge/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d/kunala23/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d/reward.svg)](https://make.fun/bounty/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d?utm_source=github&utm_medium=readme&utm_campaign=u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d)

# Real-Life Patch Notes: The Comedy Changelog

A tiny program for make.fun's "Real-Life Patch Notes: The Comedy Changelog"
bounty. It writes one funny one-line patch note for a bug in real life or
human biology — at most 160 characters — to `/output/entry.txt`.

## The entry

> v3.1.4: fixed a bug where the brain replayed your most embarrassing moment from 2009 at 3 a.m. for no reason.

109 characters, one line, version number up front, terse engineering register,
and a bug every reader recognises in themselves: the brain replaying an old
embarrassment at 3 a.m.

## Run it

```sh
node main.ts
# writes /output/entry.txt (override with OUTPUT_PATH=/tmp/entry.txt)
```

Node 22 or later, nothing to install. No network, no secrets, no input data:
the program is fully deterministic — the same line every run.

## How it picks the line

`main.ts` holds six candidate lines, each written for this bounty, and scores
them against the judge's brief: a real version number, the words "fixed a
bug", a specific recognisable bug of the body or of daily life, terse wording
with no padding, and one clean finished line. The best-scoring line wins; the
brief's own example line is refused outright so it can never be shipped. The
output is validated before it is written: 1–160 characters, a single
non-blank line, or the program exits with an error instead of writing.

## License

MIT — see [LICENSE](LICENSE).

import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { prepare as prepareChangelog } from "@semantic-release/changelog";
import { analyzeCommits } from "@semantic-release/commit-analyzer";
import { generateNotes } from "@semantic-release/release-notes-generator";

import releaseConfig from "../release.config.mjs";

function getPluginOptions(pluginName) {
  const pluginConfig = releaseConfig.plugins.find(
    (entry) => Array.isArray(entry) && entry[0] === pluginName,
  );

  return pluginConfig?.[1] ?? {};
}

const analyzerOptions = getPluginOptions("@semantic-release/commit-analyzer");
const notesOptions = getPluginOptions(
  "@semantic-release/release-notes-generator",
);
const changelogOptions = getPluginOptions("@semantic-release/changelog");
const gitOptions = getPluginOptions("@semantic-release/git");
const logger = { log() {} };

function createCommits(messages) {
  return messages.map((message, index) => ({
    hash: String(index).padStart(40, "0"),
    message,
  }));
}

async function getReleaseType(...messages) {
  return analyzeCommits(analyzerOptions, {
    commits: createCommits(messages),
    cwd: process.cwd(),
    logger,
  });
}

async function getReleaseNotes(messages, version = "1.2.1") {
  return generateNotes(notesOptions, {
    commits: createCommits(messages),
    cwd: process.cwd(),
    lastRelease: { gitTag: "v1.2.0" },
    nextRelease: { gitTag: `v${version}`, version },
    options: {
      repositoryUrl: "https://github.com/teopartesi/portfolio.git",
    },
  });
}

test("maps official Gitmoji SemVer levels", async (t) => {
  const cases = [
    ["💥 Remove a public API", "major"],
    ["✨ Add a new section", "minor"],
    ["🐛 Fix the navigation", "patch"],
    ["💄 Update the layout", "patch"],
    ["➕ Add a dependency", "patch"],
    ["⚡ Improve rendering", "patch"],
    ["⚡️ Improve rendering", "patch"],
    [":lipstick: Update the layout", "patch"],
  ];

  for (const [message, expectedRelease] of cases) {
    await t.test(message, async () => {
      assert.equal(await getReleaseType(message), expectedRelease);
    });
  }
});

test("keeps Conventional Commits and breaking change support", async (t) => {
  const cases = [
    ["feat: add a new section", "minor"],
    ["fix(nav): repair the mobile menu", "patch"],
    ["perf: reduce image loading time", "patch"],
    ["feat!: remove the legacy page", "major"],
    [
      "📝 (docs): Update the API guide\n\nBREAKING CHANGES: The old URL is removed.",
      "major",
    ],
  ];

  for (const [message, expectedRelease] of cases) {
    await t.test(message.split("\n", 1)[0], async () => {
      assert.equal(await getReleaseType(message), expectedRelease);
    });
  }
});

test("does not release for informational Gitmojis or merge commits", async () => {
  assert.equal(
    await getReleaseType(
      "📝 Update deployment documentation",
      "♻️ Refactor the navigation",
      "Merge pull request #51 from teopartesi/example\n\nfeat: hidden merge title",
    ),
    null,
  );
});

test("produces patch release notes for Gitmoji patch commits", async () => {
  const messages = [
    "Merge pull request #51 from teopartesi/10-feat-add-lucide-react-for-icons\n\nfeat: ➕ Add lucide-react icons",
    "💄 Add a lots of emojis😛",
    "💄 Add lot icons in page",
    "➕ Add lucide-react 😀icons 📦package",
  ];

  assert.equal(await getReleaseType(...messages), "patch");

  const notes = await getReleaseNotes(messages);

  assert.match(notes, /## \[1\.2\.1\]/u);
  assert.match(notes, /### ➕ Add a dependency/u);
  assert.match(notes, /### 💄 Add or update the UI and style files/u);
  assert.match(notes, /Add a lots of emojis😛/u);
  assert.match(notes, /Add lot icons in page/u);
  assert.match(notes, /Add lucide-react 😀icons 📦package/u);
  assert.doesNotMatch(notes, /Merge pull request/u);
  assert.doesNotMatch(notes, /hidden merge title/u);
});

test("includes scoped and non-releasing Gitmojis in generated notes", async () => {
  const notes = await getReleaseNotes(
    [
      "🐛 (link): Change direction links🌐",
      "📝 Update deployment documentation",
      "♻️ Refactor the navigation",
      ":lipstick: Polish the footer",
    ],
    "1.2.2",
  );

  assert.match(notes, /\* \*\*link:\*\* Change direction links🌐/u);
  assert.match(notes, /### 📝 Add or update documentation/u);
  assert.match(notes, /### ♻️ Refactor code/u);
  assert.match(notes, /Polish the footer/u);
});

test("generates CHANGELOG.md and configures it as a release asset", async (t) => {
  const cwd = await mkdtemp(join(tmpdir(), "portfolio-changelog-"));
  t.after(() => rm(cwd, { force: true, recursive: true }));

  await prepareChangelog(changelogOptions, {
    cwd,
    logger,
    nextRelease: {
      notes: "## 1.3.0\n\n### ✨ Introduce new features\n\n* Add Gitmoji releases",
    },
  });

  const changelog = await readFile(join(cwd, "CHANGELOG.md"), "utf8");
  const pluginNames = releaseConfig.plugins.map((entry) =>
    Array.isArray(entry) ? entry[0] : entry,
  );

  assert.match(changelog, /^# Changelog/u);
  assert.match(changelog, /## 1\.3\.0/u);
  assert.match(changelog, /Add Gitmoji releases/u);
  assert.deepEqual(gitOptions.assets, ["CHANGELOG.md"]);
  assert.match(gitOptions.message, /\[skip ci\]/u);
  assert.ok(
    pluginNames.indexOf("@semantic-release/changelog") <
      pluginNames.indexOf("@semantic-release/git"),
  );
});

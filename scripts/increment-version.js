/* eslint-disable @typescript-eslint/no-require-imports, no-console */
const fs = require("fs");
const path = require("path");

const versionFile = path.join(__dirname, "..", "version.json");

try {
  // Read current version
  const versionData = JSON.parse(fs.readFileSync(versionFile, "utf8"));
  const [major, minor, patch] = versionData.version.split(".").map(Number);

  // Increment patch version
  const newVersion = `${major}.${minor}.${patch + 1}`;

  // Write back to file
  const updatedData = { version: newVersion };
  fs.writeFileSync(versionFile, JSON.stringify(updatedData, null, 2) + "\n");

  console.log(`Version incremented: ${versionData.version} → ${newVersion}`);

  // Stage and commit the version file
  const { execSync } = require("child_process");
  try {
    // Check if we're in a git repository
    execSync("git rev-parse --git-dir > /dev/null 2>&1", { stdio: "ignore" });

    // Stage only the version file
    execSync(`git add ${versionFile}`, { stdio: "inherit" });

    // Check if version.json has staged changes
    const diff = execSync("git diff --cached --name-only version.json", {
      encoding: "utf8",
    });
    if (diff.trim()) {
      // Commit only the version file change
      execSync(`git commit -m "chore: bump version to ${newVersion}"`, {
        stdio: "inherit",
      });
      console.log(`Version ${newVersion} committed successfully`);
    } else {
      console.log("No version changes to commit");
    }
  } catch {
    // If git operations fail (e.g., not in a git repo), just log it
    console.warn(
      "Warning: Could not commit version file. This is normal in CI/CD environments.",
    );
  }
} catch (error) {
  console.error("Error incrementing version:", error);
  process.exit(1);
}

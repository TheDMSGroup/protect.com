import path from "path";
import { execSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";

const WORKSPACE = "/workspace";
const UNALLOWED_PATHS = [
  ".nuxt/",
  "node_modules/",
  ".eslintrc.js",
  ".prettierrc",
  "mcp/",
  "package.json",
  "package-lock.json",
  "yarn.lock",
];
export async function previewPatch(diff: string): Promise<string> {
  // check format
  if (!diff.includes("diff --git")) {
    throw new Error("Invalid patch format.");
  }

  const filePaths = Array.from(
    diff.matchAll(/^diff --git a\/(.+?) b\/.+$/gm),
    (m) => m[1]
  );

  for (const filePath of filePaths) {
    if (UNALLOWED_PATHS.includes(filePath)) {
      return {
        status: "failed",
        message: `Modifications to the file or directory "${filePath}" are not allowed.`,
        files: [filePath],
      };
    }
  }

  // Validate patch without applying
  const patchFilePath = path.join(WORKSPACE, ".mcp.patch");
  writeFileSync(patchFilePath, diff, "utf-8");

  try {
    execSync(`git apply --check ${patchFilePath}`, {
      cwd: WORKSPACE,
      stdio: "pipe",
    });
  } catch (error) {
    throw new Error(
      "Patch validation failed. The patch may conflict with existing code.",
      error
    );
  } finally {
    unlinkSync(patchFilePath);
  }

  return {
    status: "success",
    message: "Patch is valid and ready to apply.",
    filesAffected: filePaths,
  };
}
export async function applyPatch(diff: string): Promise<string> {
  // check format
  if (!diff.includes("diff --git")) {
    throw new Error("Invalid patch format.");
  }

  const filePaths = Array.from(
    diff.matchAll(/^diff --git a\/(.+?) b\/.+$/gm),
    (m) => m[1]
  );

  for (const filePath of filePaths) {
    if (UNALLOWED_PATHS.includes(filePath)) {
      return {
        status: "failed",
        message: `Modifications to the file or directory "${filePath}" are not allowed.`,
        files: [filePath],
      };
    }
  }

  //write diff to temp file

  const patchFilePath = path.join(WORKSPACE, ".mcp.patch");
  writeFileSync(patchFilePath, diff, "utf-8");

  //try to apply patch to git

  try {
    execSync(`git apply ${patchFilePath}`, { cwd: WORKSPACE, stdio: "pipe" });
  } catch (error) {
    throw new Error(
      "Failed to apply patch. Please ensure the patch is valid and does not conflict with existing code.",
      error
    );
  } finally {
    //clean up
    unlinkSync(patchFilePath);
  }

  return {
    status: "success",
    message: "Patch applied successfully.",
    filesModified: filePaths,
  };
}

import { exec } from "node:child_process";
import path from "node:path";

export function runInference(): Promise<string> {
  return new Promise((resolve, reject) => {
    const projectRoot = process.cwd(); // point to oddish-water repo root

    // Path to your bash script
    const scriptPath = path.join(projectRoot, "scripts", "run_inference.sh");

    // Construct the command to run the bash script
    const command = `bash ${scriptPath}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
      } else if (stderr) {
        console.warn(`Stderr: ${stderr}`);
        resolve(stderr); // warn but still resolve
      } else {
        resolve(stdout);
      }
    });
  });
}

import { exec } from "child_process";
import path from "path";

export function runInference(): Promise<string> {
  return new Promise((resolve, reject) => {
    const projectRoot = path.resolve(__dirname, "..");
    const scriptPath = path.join(
      projectRoot,
      "lerobot",
      "lerobot",
      "scripts",
      "control_robot.py"
    );

    const command = `conda run -n lerobot python ${scriptPath} \
      --robot.type=so100 \
      --control.type=record \
      --control.fps=30 \
      --control.single_task="Grasp the black cup, lift it towards the plant pot, tilt the cup to pour out its contents, tilt it back, and return it to its original position." \
      --control.repo_id=local_test_repo \
      --control.tags='["web_triggered"]' \
      --control.warmup_time_s=5 \
      --control.episode_time_s=40 \
      --control.reset_time_s=30 \
      --control.num_episodes=1 \
      --control.push_to_hub=false \
      --control.policy.path=src/lerobot/outputs/train/plant_pour_data_again/checkpoints/last/pretrained_model`;

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

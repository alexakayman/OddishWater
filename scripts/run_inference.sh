#!/bin/bash

# Local instance for now...
source /Users/marcuslam/anaconda3/etc/profile.d/conda.sh
conda activate lerobot
cd lerobot

RAND_ID=$RANDOM
HF_USER="sucrammal"

python lerobot/scripts/control_robot.py \
  --robot.type=so100 \
  --control.type=record \
  --control.fps=30 \
  --control.single_task="Grasp the black cup..." \
  --control.repo_id=${HF_USER}/eval_act_${RAND_ID} \
  --control.tags='["tutorial"]' \
  --control.warmup_time_s=3 \
  --control.episode_time_s=30 \
  --control.reset_time_s=30 \
  --control.num_episodes=1 \
  --control.push_to_hub=false \
  --control.policy.path=outputs/train/plant_pour_data_again/checkpoints/last/pretrained_model

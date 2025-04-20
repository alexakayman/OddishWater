#!/bin/bash

source ~/miniconda3/etc/profile.d/conda.sh
conda activate lerobot
cd lerobot

python lerobot/scripts/control_robot.py \
  --robot.type=so100 \
  --control.type=record \
  --control.fps=30 \
  --control.single_task="Grasp the black cup..." \
  --control.repo_id=dummy_repo_id \
  --control.tags='["tutorial"]' \
  --control.warmup_time_s=5 \
  --control.episode_time_s=40 \
  --control.reset_time_s=30 \
  --control.num_episodes=2 \
  --control.push_to_hub=false \
  --control.policy.path=outputs/train/plant_pour_data_again/checkpoints/last/pretrained_model

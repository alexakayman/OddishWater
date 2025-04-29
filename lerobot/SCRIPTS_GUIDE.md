### HUGGING FACE
huggingface-cli login --token <HF-KEY> --add-to-git-credential

HF_USER=$(huggingface-cli whoami | head -n 1)
echo $HF_USER


###  COLLECT
python lerobot/scripts/control_robot.py \
  --robot.type=so100 \
  --control.type=record \
  --control.fps=30 \
  --control.single_task="Grasp the black cup, lift it towards the plant pot, tilt the cup to pour out its contents, tilt it back, and return it to its original position.." \
  --control.repo_id=${HF_USER}/plant_pour_data_2\
  --control.tags='["so100","tutorial"]' \
  --control.warmup_time_s=5 \
  --control.episode_time_s=30 \
  --control.reset_time_s=30 \
  --control.num_episodes=50 \
  --control.push_to_hub=true

### TELEOP:
python lerobot/scripts/control_robot.py \
  --robot.type=so100 \
  --robot.cameras='{}' \
  --control.type=teleoperate


### TRAIN
python lerobot/scripts/train.py \
  --dataset.repo_id=${HF_USER}/plant_pour_data_again \
  --policy.type=act \
  --output_dir=outputs/train/plant_pour_data_again \
  --job_name=plant_pour_data_again \
  --policy.device=cuda \
  --wandb.enable=true \
--dataset.video_backend=pyav


### RESUME TRAINING
python lerobot/scripts/train.py \
  --config_path=outputs/train/plant_pour_data_train/checkpoints/last/pretrained_model/train_config.json \
  --resume=true

### EXPORT MODEL
python lerobot/scripts/push_pretrained.py \
  --pretrained_path=outputs/train/plant_pour_data_again/checkpoints/last/pretrained_model \
  --repo_id=sucrammal/plant_pour_data_model_again_20k \
  --private=false \
  --exist_ok=true

cd outputs/train/plant_pour_data_train/checkpoints/last/
git init
git lfs install
git remote add origin https://huggingface.co/sucrammal/plant-pour-model
git add .
git commit -m "Initial checkpoint upload"
git push origin master


python lerobot/scripts/control_robot.py \
  --robot.type=so100 \
  --control.type=record \
  --control.fps=30 \
  --control.single_task="Grasp the black cup, lift it towards the plant pot, tilt the cup to pour out its contents, tilt it back, and return it to its original position." \
  --control.repo_id=${HF_USER}/eval_act_plant_pour_test_again \
  --control.tags='["tutorial"]' \
  --control.warmup_time_s=5 \
  --control.episode_time_s=40 \
  --control.reset_time_s=30 \
  --control.num_episodes=2\
  --control.push_to_hub=false \
  --control.policy.path=outputs/train/plant_pour_data_again/checkpoints/last/pretrained_model
  
  python lerobot/scripts/control_robot.py \
  --robot.type=so100 \
  --robot.cameras='{}' \
  --control.type=teleoperate



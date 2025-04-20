## Inspiration

Plant care can be surprisingly challenging, especially for busy individuals or those lacking a green thumb. Many plants die from inconsistent watering or improper nutrition. As technology enthusiasts with a passion for sustainable living, we wanted to create a solution that combines robotics and machine learning to automate plant care. Oddish Water was born from our desire to help people maintain healthy plants without requiring constant attention or expertise.

## What it does

Oddish Water is an intelligent robotic auto-farmer that monitors and cares for your plants. Using a combination of LIDAR, computer vision, and machine learning, our system:

- Automatically detects when plants are thirsty or nutrient-deficient
- Precisely delivers water and nutrients using LeRobot's robotic arm
- Provides a user-friendly web interface with live camera feed
- Accepts voice commands through "Fish Audio" API integration
- Logs all activities and plant health metrics
- Features adorable Oddish-themed UI elements for a delightful user experience

## How we built it

We took a methodical approach to building Oddish Water. Instead of rushing to build, we began with careful configuration planning.

- Worked extensively with LeRobot's documentation to optimize arm movement
- 3D printed custom planters designed specifically for LIDAR/camera detection
- Purchased a test plant from a local boutique for training and testing
- Trained our ML model overnight using the trainer and student arm configuration. LeRobot had a simple system to call the robot once trained.
- Recorded approximately 50 episodes to develop our watering policy
- Pivoted from water to nutrient delivery to protect electronic components

### Web application featuring:

- Live camera feed
- Voice command integration with Fish Audio
- Inference model execution
- Activity logging
- Playful Oddish-themed UI elements

## Challenges we ran into

- Integrating Python ML scripts with our Node.js backend. We solved this by creating a bridge API service that allowed seamless communication between our ML environment and web application.
- Meeting tight time constraints for building the robotic components. We overcame this by implementing parallel workflows where team members focused on separate aspects simultaneously.
- Initially, we planned to use water for irrigation but realized the risk to circuitry. We pivoted to a nutrient delivery system with isolated components to protect the electronics.
- Fine-tuning the ML model to accurately detect various plant conditions. This required extensive testing and parameter adjustments to achieve reliable results.
- Struggled to generalize the data for more flexible watering and detection. Training took time. We addressed this by expanding our dataset with diverse plant samples and implementing data augmentation techniques to improve model robustness.

## Accomplishments

- Accurately detects plant needs without human intervention
- Delivers precise amounts of nutrients based on plant-specific requirements
- Provides an intuitive and engaging user interface
- Combines hardware and software seamlessly

## What we learned

- Robotic arm programming and control systems
- Machine learning for computer vision applications
- Hardware/software integration
- Real-time monitoring and feedback loops
- The importance of proper testing and iteration

## What's next for Oddish Water

We're excited to expand Oddish Water with:

- Support for multiple plant types with customized care profiles
- Enhanced ML capabilities to detect plant diseases and pests
- Mobile app development for remote monitoring and control
- Integration with smart home systems
- Scaled manufacturing of our custom planters

import cv2

def list_available_cameras(max_cameras=10):
    available_cameras = []
    for index in range(max_cameras):
        cap = cv2.VideoCapture(index)
        if cap.isOpened():
            print(f"Camera found at index {index}")
            available_cameras.append(index)
            cap.release()
        else:
            print(f"No camera at index {index}")
    return available_cameras

if __name__ == "__main__":
    print("Scanning for available cameras...")
    cameras = list_available_cameras()
    print(f"\nAvailable camera indices: {cameras}")

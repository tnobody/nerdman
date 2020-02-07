import { useEffect, useState } from "react";

export function useMotion() {
  const [state, setState] = useState<DeviceMotionEventAcceleration>({
    x: 0,
    y: 0,
    z: 0
  });
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null;
    function applyOrientation({
      accelerationIncludingGravity,
    }: DeviceMotionEvent) {
      if(timerId){
        return;
      }
      timerId = setTimeout(() => {
        setState(prev => accelerationIncludingGravity ?? prev);
        timerId = null;
      }, 100)
    }
    window.addEventListener("devicemotion", applyOrientation);
    return () => window.removeEventListener("devicemotion", applyOrientation);
  }, []);

  return state;
}

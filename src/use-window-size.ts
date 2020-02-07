import { useState, useEffect } from "react";
export function useIsLandscape() {
  const { width, height } = useWindowSize();
  const [isLandscape, setIsLandscape] = useState(width > height);
  useEffect(() => {
      const newIsLandscape = width > height;
      if(isLandscape !== newIsLandscape) {
          setIsLandscape(newIsLandscape)
      }
  }, [width, height, isLandscape]);
  return isLandscape
}

export function useWindowSize() {
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

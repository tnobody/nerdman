import React, { FC, useRef, useState, useEffect } from "react";

export const Hint: FC<any> = ({ children }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [showElement, setShowElement] = useState(true);

  useEffect(() => {
    divRef.current?.addEventListener("animationend", () => {
      setShowElement(false);
    });
  }, []);

  return showElement ? (
    <div ref={divRef} className={"hint-text"}>
      {children}
    </div>
  ) : null;
};

import React, { FC, useEffect } from "react";
import NerdManSvgPath from "./nerd-man.svg";

export interface NerdManProps {
  onClick?: () => void;
  shadowFill?: string;
  onPointerUp?: () => void;
  onPointerDown?: () => void;
}

export const NerdMan: FC<NerdManProps> = ({
  onClick,
  shadowFill = "red",
  ...props
}) => {
  function noop() {}
  useEffect(() => {
    document.addEventListener("pointerup", props.onPointerUp ?? noop);
    return () => document.removeEventListener("pointerup", props.onPointerUp ?? noop);
  }, [props.onPointerUp]);
  return (
    <svg viewBox="0 0 812 375" style={{ margin: "2rem" }}>
      <defs>
        <filter id="Blur">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      <use
        filter="url(#Blur)"
        xlinkHref={NerdManSvgPath + "#Bat"}
        style={{
          fill: shadowFill,
          transition: "fill .35s ease-in"
        }}
      />
      <use
        xlinkHref={NerdManSvgPath + "#Bat"}
        style={{ cursor: "pointer" }}
        onClick={onClick}
        onPointerDown={props.onPointerDown}
        onPointerUp={props.onPointerUp}
      />
      <use
        xlinkHref={NerdManSvgPath + "#Glasses"}
        style={{
          fill: "red"
        }}
      ></use>
    </svg>
  );
};

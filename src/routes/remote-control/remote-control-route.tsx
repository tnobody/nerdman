import React, { useState } from "react";
import { NerdMan } from "../../components/nerdman/nerd-man";
import { Hint } from "./hint";
import { useBatMobile } from "../../use-batmobil";
import { useMotion } from "../../use-motion";
import { scaleLinear } from "d3-scale";
import { useInterval } from "../../use-interval";
import { promiseQueue } from "./promise-queue";

export const RemoteControl: React.FC = () => {
  const { connect, connected, setSpeedLeft, setSpeedRight } = useBatMobile();
  const [isPressed, setIsPressed] = useState(false);
  const { y } = useMotion();
  const queue = promiseQueue();

  const scaleLeft = scaleLinear()
    .domain([10, 0, -10])
    .range([-126, -126, 0])
    .clamp(true);
  const scaleRight = scaleLinear()
    .domain([10, 0, -10])
    .range([0, 126, 126])
    .clamp(true);

  async function handleNerdManClick() {
    if (!connected) {
      await connect();
    }
  }

  async function drive() {
    if (connected) {
      console.log("driving: " + y);
      queue(() => setSpeedLeft(scaleLeft(y ?? 0)));
      queue(() => setSpeedRight(scaleRight(y ?? 0)));
    }
  }

  async function handlePointerUp() {
    queue(() => setSpeedLeft(127));
    queue(() => setSpeedRight(127));
    setIsPressed(false);
  }

  useInterval(drive, isPressed ? 250 : null);
  return (
    <div className="App">
      <Hint>
        <strong>Tap to Connect</strong>
      </Hint>
      {/*
      <div style={{ color: "white", display: "flex", flexDirection: "row" }}>
        <span>{isPressed ? "pressed" : "not pressed"}</span>
        <span>{scaleLeft(y ?? 0).toFixed(0)} </span>
        <input readOnly type="range" min={-10} max={10} value={(y ?? 0) * -1} />
        <span>{scaleRight(y ?? 0).toFixed(0)}</span>
      </div>
       */}
      <NerdMan
        onPointerDown={() => setIsPressed(true)}
        onPointerUp={handlePointerUp}
        onClick={handleNerdManClick}
        shadowFill={connected ? "green" : "red"}
      />
    </div>
  );
};

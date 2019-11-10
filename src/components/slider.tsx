import React from "react";
import { useSpring, animated, interpolate } from "react-spring";
import { useGesture, useDrag } from "react-use-gesture";
import "./styles.css";
import * as d3scale from "d3-scale";

const easeOutQuad = (t: number): number => 1 + --t * t * t * t * t;

export default function Slider(props: any) {
  const targetDistance = 200;

  const progressCallback = (progress: number) => {
    console.log("Progress", progress);
  };

  const callback = () => {
      console.warn("Done");
  }

  const [{ y, bg, size, progress }, set] = useSpring(() => ({
    y: 0,
    bg: `linear-gradient(120deg, #f093fb 0%, #f5576c 100%)`,
    size: 1,
    progress: 0,
    config: {
      friction: 10
    },
    immediate: false //name => down && name === 'y'
  }));

  const bind = useDrag(
    ({
      down,
      movement: [mx, my],
      previous: [px, py],
      delta: [dx, dy], //delta between current and previous values (xy - previous)
      initial: [ix, iy],
      offset: [ox, oy],
      vxvy: [vx, vy],
      memo
    }) => {
      const prevPos = memo || 0;
      const dragged = dy;

      let progressScale = d3scale
        .scaleSequential(easeOutQuad)
        .domain([0, targetDistance * 2]);
      const visualProgress = progressScale(prevPos);
      const adjustment = dragged * (1 - visualProgress);

      const newY = Math.max(0, prevPos + adjustment);

      const actualProgress = my / targetDistance;

      console.log("p", actualProgress, visualProgress, "length", my);
      progressCallback(actualProgress);

      if(!down && actualProgress >= 1) {
          callback();
      }

      set({
        y: down ? newY : 0,
        progress: actualProgress
      });

      return newY;
    }
  );

  const avSize = y.interpolate({
    // @ts-ignore
    map: Math.abs,
    range: [50, 300],
    output: ["scale(0.5)", "scale(1)"],
    extrapolate: "clamp"
  });


  return (
    <animated.div {...bind()} className="item" style={{ background: bg }}>
      <animated.div
        className="av"
        style={{
          transform: avSize
          //   justifySelf: delta[0] < 0 ? "end" : "start"
        }}
      />
      <animated.div
        className="fg"
        style={{
          transform: interpolate(
            [y, size],
            (y, s) => `translate3d(0,${y}px,0) scale(${s})`
          )
        }}
      >
        {props.children}
      </animated.div>
    </animated.div>
  );
}

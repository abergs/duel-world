import React, { useState } from "react";
import { useSpring, animated, interpolate } from "react-spring";
import { useGesture, useDrag } from "react-use-gesture";
import "./styles.css";
import * as d3scale from "d3-scale";

const easeOutQuad = (t: number): number => 1 + --t * t * t * t * t;

async function sleeper(ms:number) {
    await new Promise(resolve => setTimeout(resolve, ms))
  }

export default function Slider(props: any) {
  const targetDistance = 200;

  const [waiting, setWatiting] = useState(false);

  const progressCallback = (progress: number) => {
    console.log("Progress", progress);
  };

  const callback = (): Promise<void> => {
      console.warn("Done");
      setWatiting(true);
      return sleeper(1000);
  }

  const [{ ready, y, size, progress }, set] = useSpring(() => ({
    ready: 0,
    y: waiting ? 50 : 0,
    size: 1,
    progress: 0,
    config: {
      friction: 10
    },
    immediate: false
    // ready:false //name => down && name === 'y'
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

      let newY = Math.max(0, prevPos + adjustment);

      const actualProgress = my / targetDistance;

      console.log("p", actualProgress, visualProgress, "length", my);
      progressCallback(actualProgress);

      
      // WE ARE DONE
      if(!down && actualProgress >= 1) {
        // let the app know  
        callback()
          .then(() => {
              // after app is ready, reset
              set({
                  y:0,
                  progress: 0,
                  ready:0
              })
          });
          // set waiting values
          newY = 50;
      } else if (!down) {
          newY = 0;
      }

      console.warn(actualProgress >= 1 ? 1 : 0);

      set({
        y: newY,
        progress: actualProgress,
        ready: actualProgress >= 1 ? 1 : 0
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

  console.warn("read", progress);

  return (
    <animated.div {...bind()} className="item" style={{
    background: interpolate([progress, ready], (p,r) =>`linear-gradient(${360 * (p / 4)}deg, ${(r === 0) ? '#f093fb 0%, #f5576c' : '#96fbc4 0%, #f9f586'} 100%)`)
        }}>
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

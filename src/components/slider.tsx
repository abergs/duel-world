import React, { useState } from "react";
import { useSpring, animated, interpolate } from "react-spring";
import { useGesture, useDrag } from "react-use-gesture";
import "./styles.css";
import * as d3scale from "d3-scale";

const easeOutQuad = (t: number): number => 1 + --t * t * t * t * t;

async function sleeper(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

const Oval = (props:any ) => {

  // var progress = props.progress.value * 360 || 360;

  console.log("HELLO", props.progress.value);

  return (<animated.svg width={38} height={38} stroke="#fff" viewBox="0 0 38 38" className="av-spinner"  {...props}>
    <g
      transform="translate(1 1)"
      strokeWidth={2}
      fill="none"
      fillRule="evenodd"
    >
      <circle strokeOpacity={0.5} cx={18} cy={18} r={18} />
      <animated.path d="M36 18c0-9.94-8.06-18-18-18" transform={interpolate([props.progress], (p) => `rotate(${p * 360 || 360} 18 18)`)}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 18 18"
          to="360 18 18"
          dur="1s"
          repeatCount={interpolate([props.progress], (p) => p > 1 ? "indefinite" : "0")}
        />
      </animated.path>
    </g>
  </animated.svg>
);
};

export default function Slider(props: any) {
  const targetDistance = 200;

  const [waiting, setWatiting] = useState(false);

  const progressCallback = (progress: number) => {
    console.log("Progress", progress);
  };

  const callback = (): Promise<void> => {
    console.warn("Done");
    setWatiting(true);
    return sleeper(6000);
  };

  const [{ ready, y, size, progress, down }, set] = useSpring(() => ({
    ready: 0,
    y: waiting ? 50 : 0,
    size: 1,
    progress: 0,
    down: 0,
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

      console.log("p", actualProgress, visualProgress, "length", my, "down", down);

      const up = !down;

      up && console.log("touch up");

      set({down: down ? 1 : 0});

      // WE ARE DONE
      var done = up && actualProgress >= 1;
      if (done) {
        // let the app know
        callback().then(() => {
          
          
          // after app is ready, reset
          set({
            y: 0,
            progress: 0,
            ready: 0
          });
          
          progressCallback(0);

          
        });
        // set waiting values
        set({
          y: 50,
          ready: 1
        })

      } else if (up) {
        // console.log("touch up");
        progressCallback(0);
        
        set({
          y: 0,
          progress: 0,
          ready: 0,
          down: 0
        });
      } else {
        console.log("touch down");
        progressCallback(actualProgress);

        set({
          y: newY,
          progress: actualProgress,
          ready: actualProgress >= 1 ? 1 : 0
        });
      }

      // console.warn(actualProgress >= 1 ? 1 : 0);

      return newY;
    }
  );

  const avSize = progress.interpolate({
    // @ts-ignore
    map: Math.abs,
    range: [0, 1],
    output: [0, 1],
    extrapolate: "clamp"
  });

  console.warn("read", progress);

  return (
    <animated.div
      {...bind()}
      className="item"
      style={
        {
          // background: interpolate([progress, ready], (p,r) =>`linear-gradient(${360 * (p / 4)}deg, ${(r === 0) ? '#f093fb 0%, #f5576c' : '#96fbc4 0%, #f9f586'} 100%)`)
        }
      }
    >
      <animated.div
        className="av"
        style={{
          // opacity: interpolate([down, avSize], (d,axs) => d ? axs : 0),
          // background: interpolate([progress, ready], (p,r) => r ? 'green' : 'red'),
          background: interpolate([progress, ready], (p,r) =>`linear-gradient(${360 * (p / 4)}deg, ${(r === 0) ? '#f093fb 0%, #f5576c' : '#96fbc4 0%, #f9f586'} 100%)`),
          transform: interpolate([y], (yy) => `translate3d(0,calc(-100% + ${yy}px),0)` )
          //   justifySelf: delta[0] < 0 ? "end" : "start"
        }}
      >
      <Oval progress={progress} />
      </animated.div>
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

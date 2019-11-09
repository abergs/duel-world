import React from "react";
import { usePull } from "components/usePull";

export function Screen(props: any) {
  
  const cb = () => {
    console.log("REFRESH!!!");
    return Promise.resolve();
  };
  
  const progress = (p: number, d: number) => {
    console.log("x", p,d);
    document.documentElement.style.setProperty("--pull-progress", Math.min(1,p).toString());
    document.documentElement.style.setProperty("--pull-distance", d.toString());
  };

  const { indicator, content, wrapper } = usePull({
    callback: cb,
    progressCallback: progress
  });

  return (
    <div className="screen" ref={wrapper}>
      <div ref={indicator} className="indicator"></div>
      <main ref={content} className="content">
        {props.children}
      </main>
    </div>
  );
}

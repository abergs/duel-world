import React, { useRef, useEffect, useState } from "react";

import WebPullToRefresh from "./wptr";

interface IPullProps {
    distanceToRefresh?: number,
    resistance?: number,
    callback?: () => void,
    children: React.ReactChild[];

}

export default function UsePull(props: IPullProps) {
  const ptr = useRef(null);
  const content = useRef(null);
  const refresher = useRef(null);
  const wrapper = useRef(null);

  const [progress, setProgress] = useState(0);

  const progressCallback = (percentage:number, distance:number) => {
      console.log("progress", percentage, distance);
      setProgress(percentage);
  }

  useEffect( () => {
    WebPullToRefresh().init({
        contentEl: content.current,
        ptrEl: ptr.current,
        bodyEl: wrapper.current,
        distanceToRefresh: props.distanceToRefresh || undefined,
        loadingFunction: props.callback,
        resistance: props.resistance || undefined,
        progress: progressCallback,
        // hammerOptions: this.props.hammerOptions || undefined
      });

      // todo: return cleanup

  }, []);

  return (
      <div className="wrapper" ref={wrapper}>
    <div className="ptr" ref={ptr} style={
        {color: "black", opacity: progress}
    }>
      <div className="refresher" ref={refresher}>Refresh icon</div>
      </div>
      <div className="content" ref={content}>
        {props.children}
      </div>
    
    </div>
  );
}

import React, { useRef, useEffect, useState } from "react";

import WebPullToRefresh from "./wptr";

export interface IUsePullProps {
  callback: () => Promise<void>;
  distanceToRefresh?: number;
  resistance?: number;
  progressCallback?: (percentage: number, distance:number) => void;
}

interface IPullWrapProps extends IUsePullProps {
  children?: React.ReactChild[];
}

export function usePull(props: IUsePullProps) {
  const wrapper = useRef(null);
  const indicator = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    var wpr = WebPullToRefresh();

    wpr.init({
      contentEl: content.current,
      ptrEl: indicator.current,
      bodyEl: wrapper.current,
      ...props
      // hammerOptions: this.props.hammerOptions || undefined
    });

    // todo: return cleanup
    return () => {
      wpr.unload();
    };
  }, []);

  return { indicator, content, wrapper };
}

export function PullWrap(props: IPullWrapProps) {
  const [progress, setProgress] = useState(0);

  const progressCallback = (percentage: number, distance: number) => {
    console.log("progress", percentage, distance);
    setProgress(percentage);
  };

  const { indicator, content, wrapper } = usePull(props);

  return (
    <div className="wrapper" ref={wrapper}>
      <div
        className="ptr"
        ref={indicator}
        style={{ color: "black", opacity: progress }}
      >
        <div className="refresher">Refresh icon</div>
      </div>
      <div className="content" ref={content}>
        {props.children}
      </div>
    </div>
  );
}

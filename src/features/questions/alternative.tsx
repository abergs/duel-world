import React, { useState } from "react";
import { IAlternative } from "./roundSlice";
import classnames from "classNames";
import posed from 'react-pose';


export interface IAlternativeProps {
  text: string;
  onClick?: (text: string) => void;
  isMine?: boolean;
  isCorrect?: boolean;
}


export default function Alternative(props: IAlternativeProps) {
  const text = props.text;
  
  const onC = (e: any) => {
    //props.setPath(e.target.innerText)
    if (props.onClick) {
      props.onClick(text);
    }
  };

  const Box = posed.div({
    pressable: true,
    init: { scale: 1 },
    press: { scale: 0.8 }
  });

  return (
    <Box className={classnames({"alternative":true, "isMine": props.isMine, "isCorrect": props.isCorrect})} onClick={onC}>
      {text}
    </Box>
  );
}

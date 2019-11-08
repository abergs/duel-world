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


const Box = posed.div({
  enter: { opacity: 1, y:0},
  exit: { opacity: 0, y:20},
});




export default function Alternative(props: IAlternativeProps) {
  const text = props.text;
  
  const onC = (e: any) => {
    //props.setPath(e.target.innerText)
    if (props.onClick) {
      props.onClick(text);
    }
  };


  return (
    <Box  {...props} className={classnames({"alternative":true, "isMine": props.isMine, "isCorrect": props.isCorrect})} onClick={onC} key={text} >
      {text}
    </Box>
  );
}

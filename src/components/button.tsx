import React from "react";
import {beep2} from "features/sound"

export interface IButtonProps {
    onClick: (e: React.MouseEvent) => void
    children: any;
}

export default function Button (props: IButtonProps) {

    const click = (e:React.MouseEvent) => {
        beep2.play();
        props.onClick(e);
    }

    return <button onClick={click}>{props.children}</button>
}
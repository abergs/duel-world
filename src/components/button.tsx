import React from "react";
import {beep2} from "features/sound"
import classnames from "classNames";

export interface IButtonProps {
    onClick: (e: React.MouseEvent) => void
    children: any;
    footer?:boolean;
}

export default function Button (props: IButtonProps) {

    const click = (e:React.MouseEvent) => {
        beep2.play();
        props.onClick(e);
    }

    return <button className={classnames({"footer":props.footer})} onClick={click}>{props.children}</button>
}
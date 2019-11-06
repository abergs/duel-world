import React, { useState } from "react";
import { connect } from 'react-redux'
import { setPath } from '../nav/navSlice';

const mapDispatch = { setPath }

function Alternative(props:any) {

  const text = props.text;
  const onC = (e:any) => {
    //props.setPath(e.target.innerText)
    props.onClick(text);
  }

  return <div className="alternative" onClick={onC}>{text}</div>
}

export default connect(
    null,
    mapDispatch
  )(Alternative)
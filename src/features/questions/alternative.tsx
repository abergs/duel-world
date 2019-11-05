import React, { useState } from "react";
import { connect } from 'react-redux'
import { setPath } from '../nav/navSlice';

const mapDispatch = { setPath }

function Alternative(props:any) {

  const onC = (e:any) => { props.setPath(e.target.value)}

  return <div className="alternative" onClick={onC}>{props.children}</div>
}

export default connect(
    null,
    mapDispatch
  )(Alternative)
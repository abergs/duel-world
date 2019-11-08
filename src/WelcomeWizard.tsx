import React, { useState } from "react";
import { Screen } from "./screen";
import { useDispatch } from 'react-redux';
import { setPath } from "features/nav/navSlice";
/**
 *
 * Logo, intro
 * Pick name
 * Pick avatar
 * Invite friend
 *
 */
export function WelcomeWizard() {
  var [name, setName] = useState("");
  var [isPlaying, setPlay] = useState(false);
  const dispatch = useDispatch();
  return (<Screen>
    <h1 className="logo">Duel World</h1>

    <label>What should we call you?</label><br />
    <input type="text" placeholder="AndyPandy" value={name} onChange={e => setName(e.target.value)} />
    <br />
    <button onClick={e => {
      setPlay(true);
      dispatch(setPath("round"));
    }}>
      Play
      </button>
  </Screen>);
}
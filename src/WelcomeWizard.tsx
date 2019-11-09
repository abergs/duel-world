import React, { useState } from "react";
import { Screen } from "./screen";
import { useDispatch } from 'react-redux';
import { setPath } from "features/nav/navSlice";
import {PullWrap} from "components/usePull";
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
  const cb = () => Promise.resolve();

  return (<Screen>
    <h1 className="logo">Duel World</h1>

    <label>What should we call you?</label><br />
    <input type="text" placeholder="AndyPandy" value={name} onChange={e => setName(e.target.value)} />
    <br />
    <button onClick={e => {
      setPlay(true);
      dispatch(setPath("duels"));
    }}>
      Play
      </button>
  </Screen>);
}

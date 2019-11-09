import React, { useState } from "react";
import { Screen } from "screen";
import { useDispatch } from 'react-redux';
import { setPath } from "features/nav/navSlice";
import Button from "components/button";
import { startRound } from "features/questions/roundSlice";


/**
 *
 * Shows a list of your ongoing and historic duels
 * Create new duel
 * Quick play
 * Invite friend
 *
 */
export default function DuelsScreen() {
  var [name, setName] = useState("");
  var [isPlaying, setPlay] = useState(false);
  const dispatch = useDispatch();
  return (<Screen>
    <h1 className="logo">Duels</h1>
    <div>
        <button onClick={() =>dispatch(setPath("newduel"))}>Start new</button>

        <h2>Current duels</h2>

        <h2>History</h2>
    </div>
    <Button footer onClick={() => dispatch(setPath("round"))}>Training mode</Button>
  </Screen>);
}

import React, { useState } from "react";
import logo from "./logo.svg";
import { Screen } from "./screen";
import "./App.css";
import { connect, useDispatch } from 'react-redux'
import { Game } from "./Game";
import {setPath} from "features/nav/navSlice";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game />
      </header>
    </div>
  );
}

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

  return (
    <Screen>
      <h1>Duel World</h1>

      <label>What should we call you?</label>
      <input
        type="text"
        placeholder="AndyPandy"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button
        onClick={e => {
          setPlay(true);
          dispatch(setPath("round"));
        }}
      >
        Play
      </button>
    </Screen>
  );
}

/**
 *
 * Shows a list of your ongoing and historic duels
 * Create new duel
 * Invite friend
 *
 */
function Duels() {}

/**
 *
 * Shows top players
 * Show top friends-of-friends(?)
 *
 */
function People() {}

/** Shows rounds history(?) starts next round? */
function Duel() {}

/**
 *
 * Displays questions, shows progress, display effects
 * Track scores and bonuses
 *
 */
function RoundPlay() {}

export default App;

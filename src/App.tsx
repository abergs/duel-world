import React, { useState } from "react";
import logo from "./logo.svg";
import { Screen } from "./screen";
import "./App.css";
import { connect } from 'react-redux'
import Alternative from "./features/questions/alternative";


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
 * Switches between all the screens
 */
function Game() {
  var [currentRound, setCurrentRound] = useState("1");

  if (!currentRound) {
    return <WelcomeWizard />;
  }

  return <QuestionScreen />;
}

/**
 *
 * Logo, intro
 * Pick name
 * Pick avatar
 * Invite friend
 *
 */
function WelcomeWizard() {
  var [name, setName] = useState("");
  var [isPlaying, setPlay] = useState(false);

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
 * Displays one question and alternatives
 * dumb
 */
function QuestionScreen() {
  return <Screen>
    <h1>In what country is Dublin the capital?</h1>

    <div className="alternatives">
        <Alternative pos={1}>France</Alternative>
        <Alternative pos={2}>Scotland</Alternative>
        <Alternative pos={3}>Serbia</Alternative>
        <Alternative pos={4}>Ireland</Alternative>
    </div>
  </Screen>;
}


/**
 *
 * Displays questions, shows progress, display effects
 * Track scores and bonuses
 *
 */
function RoundPlay() {}

export default App;

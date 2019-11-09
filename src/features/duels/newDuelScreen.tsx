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

 function webShare() {
   // @ts-ignore
   if (navigator.share) {
   // @ts-ignore
   navigator.share({
        title: 'Duel World',
        text: 'Join my quiz on Duel World',
        url: 'https://abergs.github.io/duel-world',
    })
      .then(() => console.log('Successful share'))
      .catch((error:any) => console.log('Error sharing', error));
  }  
 }

export default function NewDuelScreen() {
  var [name, setName] = useState("");
  var [isPlaying, setPlay] = useState(false);
  const dispatch = useDispatch();
  return (<Screen>
    
    <h1 className="logo">Start a Duel</h1>
    <div>
        <input type="text" placeholder="Search for player" />
        <h2>Friends</h2>
    </div>
    <Button footer onClick={() => dispatch(setPath("duels"))}>Back</Button>
  </Screen>);
}

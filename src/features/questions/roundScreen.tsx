import React, { useState, useRef, useEffect } from "react";
import { Screen } from "screen";
import Alternative from "features/questions/alternative";
import { useSelector } from "useSelector";
import { setPath } from "features/nav/navSlice";
import { useDispatch } from "react-redux";
import {
  IQuestion,
  IAlternative,
  answerQuestion,
  startRound
} from "features/questions/roundSlice";
import QuestionScreen from "QuestionScreen";
import Button from "components/button";
import Confetti from 'react-confetti';
import {chime, fart, bubbles} from "features/sound";


/**
 *
 * Display questsions
 * Run timer
 * Report progress to get new current question
 *
 */

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

export default function RoundScreen(props: any) {
  const round = useSelector(state => state.round);
  const dispatch = useDispatch();
  const [xy, setxy] = useState([window.innerWidth / 2,window.innerHeight / 2]);
  const [recycle, setrecycle] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       console.log('This will run after 1 second!')
//       setrecycle(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

  if (round.status == "not-started") {
    return (
      <Screen>
        <h1>Start the round!</h1>
        <button
          onClick={e => {
            dispatch(setPath("question"));
            dispatch(startRound());
          }}
        >
          Start!
        </button>
      </Screen>
    );
  }

  const onC = (e:React.MouseEvent) => {
      console.log(e.clientX, e.clientY);
      setxy([e.clientX, e.clientY]);
      setrecycle(true);
      setTimeout(() => {
          setrecycle(false)
      }, 500);
      
      if(getRandomInt(10) === 0) {
          fart.play();
      } else {
          bubbles.play();
      }

  }

  if (round.status == "finished") {
    return (
        <div className="fullscreen" onClick={onC}>
      <Screen>
           <Confetti
            recycle={recycle}
            confettiSource={{
                x: xy[0],
                y: xy[1],
                w: 0,
                h: 0
            }}
           />
        <h1>Your Score is {round.myScore}</h1>
        <Button onClick={e => dispatch(startRound())}>Restart</Button>
      </Screen>
      </div>
    );
  }

  return <QuestionScreen />;
}

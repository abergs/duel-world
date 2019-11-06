import React, { useState, useRef, useEffect } from "react";
import { Screen } from "./screen";
import Alternative from "./features/questions/alternative";
import { useSelector } from "useSelector";
import {setPath} from "features/nav/navSlice";
import { useDispatch } from "react-redux";
import { IQuestion, IAlternative, answerQuestion, startRound } from "features/questions/roundSlice";
import { beep1, beep2, tickHorror } from "features/sound";

function useInterval(callback:any, delay:number|null) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    // @ts-ignore
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

/**
 * 
 * Display questsions
 * Run timer
 * Report progress to get new current question
 * 
 */
export default function QuestionScreen(props:any) {

  const question: IQuestion = props.question;

  const round = useSelector(state => state.round);
  const dispatch = useDispatch()
  let [seconds, setSeconds] = useState(10);

  // if(seconds == -1 ) seconds = 10;

  console.warn("Q", question.text, seconds);

  useInterval(() => {
    // Your custom logic here
    if (seconds <= 3) {
      tickHorror.play();
    } else {
      beep1.play();
    }
    console.log("Interval", seconds, question.text);
    let thisQ = question.text;
    
    setSeconds(seconds - .1);
    
    
  }, seconds <= 0 ? null : 100);


  const alternatives = question.alternatives;

  

  
  // const [timer, setTimer] = useState(question.time);

  const answerHandler = (alternative: IAlternative) => {
    console.log("Answered", alternative);
    // dispatch(setPath(alternative));
    dispatch(answerQuestion(alternative));
    setSeconds(10);
    
  }

  return <Screen>
    <h1>{question.text}</h1>
    <p>{round.myScore}</p>

    <div className="alternatives">
      {alternatives.map(x => <Alternative text={x.text} onClick={(y:string) => answerHandler(x)} key={x.text} />)}
    </div>

    <div className="timerbar" key={question.text}>
      <div>{Math.ceil(seconds)}</div>
    </div>
  </Screen>;
}
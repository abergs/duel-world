import React, { useState, useRef, useEffect } from "react";
import { Screen } from "./screen";
import Alternative from "./features/questions/alternative";
import { useSelector } from "useSelector";
import {setPath} from "features/nav/navSlice";
import { useDispatch } from "react-redux";
import { IQuestion, IAlternative, answerQuestion, startRound } from "features/questions/roundSlice";



function useInterval(callback:any, delay:number) {
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

  const round = useSelector(state => state.round);
  const dispatch = useDispatch()
  let [seconds, setSeconds] = useState(-1);

  if(seconds == -1 ) seconds = 10;

  useInterval(() => {
    // Your custom logic here
    setSeconds(seconds - 1);
  }, 1000);

  if(round.status == "not-started") {
    return <Screen><h1>Start the round!</h1><button onClick={(e) => dispatch(startRound())}>Start!</button></Screen>
  }

  if(round.status == "finished") {
    return <Screen><h1>Your Score is {round.myScore}!</h1><button onClick={(e) => dispatch(startRound())}>Restart</button></Screen>
  }

  const question: IQuestion = round.questions[round.currentQuestion];
  const alternatives = question.alternatives;

  

  
  // const [timer, setTimer] = useState(question.time);

  const answerHandler = (alternative: IAlternative) => {
    console.log("Answered", alternative);
    dispatch(setPath(alternative));
    dispatch(answerQuestion(alternative));
    
  }

  return <Screen>
    <h1>{question.text}</h1>
    <p>{round.myScore}</p>

    <div className="alternatives">
      {alternatives.map(x => <Alternative text={x.text} onClick={(y:string) => answerHandler(x)} key={x.text} />)}
    </div>

    <div className="timerbar" key={question.text}>
      <div>{seconds}</div>
    </div>
  </Screen>;
}
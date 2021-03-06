import React, { useState, useRef, useEffect } from "react";
import { Screen } from "./screen";
import Alternative from "./features/questions/alternative";
import { useSelector } from "useSelector";
import {setPath} from "features/nav/navSlice";
import { useDispatch } from "react-redux";
import { IQuestion, IAlternative, answerQuestion, startRound } from "features/questions/roundSlice";
import { beep1, beep2, tickHorror, popNegative, errorbuzz, chime } from "features/sound";

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

const NO_ALTERNATIVE ={
  text: "",
  points:0
};

// const throttle = (func:any, limit:any) => {
//   let lastFunc:any;
//   let lastRan:any;
//   return function() {
//     // @ts-ignore
//     const context:any = this;
//     const args = arguments
//     if (!lastRan) {
//       func.apply(context, args)
//       lastRan = Date.now()
//     } else {
//       clearTimeout(lastFunc)
//       lastFunc = setTimeout(function() {
//         if ((Date.now() - lastRan) >= limit) {
//           func.apply(context, args)
//           lastRan = Date.now()
//         }
//       }, limit - (Date.now() - lastRan))
//     }
//   }
// }

// @ts-ignore
const throttle = (func, limit) => {
  // @ts-ignore
  let inThrottle
  return function() {
    const args = arguments
    // @ts-ignore
    const context = this
    // @ts-ignore
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

var beep = throttle(() => beep1.play(), 1000);
var horror = throttle(() => tickHorror.play(), 1000);


/**
 * 
 * Display questsions
 * Run timer
 * Report progress to get new current question
 * 
 */
export default function QuestionScreen(props:any) {

  const round = useSelector(state => state.round);
  const question: IQuestion = round.questions[round.currentQuestion]

  const dispatch = useDispatch()
  let [seconds, setSeconds] = useState(10);
  let delay = seconds < -1 ? null : 100;
  

  useInterval(() => {
    // Your custom logic here
    if(seconds <= 0) {
      errorbuzz.play();
      // if zero, play loose
      dispatch(answerQuestion(NO_ALTERNATIVE));
      // setSeconds(-1);
      return;
    }
    else if (seconds <= 3) {
      horror();
    } else if(seconds) {
      beep();
    }
    
    let thisQ = question.text;
    
    setSeconds(seconds - .1);
    
    
  }, delay);

  const alternatives = question.alternatives;

  const answerHandler = (alternative: IAlternative) => {
    console.log("Answered", alternative);
    if(alternative.points < 1) {
      popNegative.play();
    } else {
      chime.play();
    }
    dispatch(answerQuestion(alternative));
    setSeconds(10);    
  }

  const ceilSeconds = Math.ceil(seconds);

  return <Screen>
    <h1>{question.text}</h1>
    <p>&nbsp;</p>

    <div className="alternatives">
      {alternatives.map(x => <Alternative text={x.text} onClick={(y:string) => answerHandler(x)} key={x.text} />)}
    </div>

    <div className="timerbar" key={question.text}>
      <div className="value"><span className={ceilSeconds % 2 == 0 ? "anim0": ""}>{ceilSeconds}</span></div>
    </div>
  </Screen>;
}
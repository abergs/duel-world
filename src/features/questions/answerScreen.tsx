import React, { useState, useRef, useEffect } from "react";
import { Screen } from "screen";
import Alternative from "features/questions/alternative";
import { useSelector } from "useSelector";
import {setPath} from "features/nav/navSlice";
import { useDispatch } from "react-redux";
import { IQuestion, IAlternative, answerQuestion, startRound, nextQuestion } from "features/questions/roundSlice";
import { beep1, beep2, tickHorror, popNegative, errorbuzz } from "features/sound";
import Button from "components/button";


/**
 * 
 * Display questsions
 * Run timer
 * Report progress to get new current question
 * 
 */
export default function AnswerScreen(props:any) {

  const round = useSelector(state => state.round);

  const question: IQuestion = round.questions[round.currentQuestion]

  const dispatch = useDispatch()

  const alternatives = question.alternatives;

  const player = "p1";
  const myAnswer = round.answers[question.text] && round.answers[question.text][player]; // alt1
  console.log("myanswer", myAnswer, round.answers);
  

  const answerHandler = (alternative: IAlternative) => {
    console.log("Answered", alternative);
    dispatch(answerQuestion(alternative));
  }

  return <Screen>
    <h1>{question.text}</h1>
    <p>Your points: {round.myScore}</p>

    <div className="alternatives">
      {alternatives.map(x => {
        const isCorrect = x.points > 0;
        const mine = x.text == myAnswer;
        
        // const players = round.answers[question.id].where(x => ); // answers { q1: a}


        return <Alternative text={x.text} isCorrect={isCorrect} isMine={mine} key={x.text} />}
        )}
      
    </div>
    <Button onClick={() => dispatch(nextQuestion())}>Continue</Button>
  </Screen>;
}
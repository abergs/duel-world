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

/**
 *
 * Display questsions
 * Run timer
 * Report progress to get new current question
 *
 */
export default function RoundScreen(props: any) {
  const round = useSelector(state => state.round);
  const dispatch = useDispatch();

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

  if (round.status == "finished") {
    return (
      <Screen>
        <h1>Your Score is {round.myScore}!</h1>
        <Button onClick={e => dispatch(startRound())}>Restart</Button>
      </Screen>
    );
  }

  return <QuestionScreen />;
}

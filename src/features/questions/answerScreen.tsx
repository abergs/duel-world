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
  startRound,
  nextQuestion
} from "features/questions/roundSlice";
import {
  beep1,
  beep2,
  tickHorror,
  popNegative,
  errorbuzz
} from "features/sound";
import Button from "components/button";
import posed, { PoseGroup } from "react-pose";

/**
 *
 * Display questsions
 * Run timer
 * Report progress to get new current question
 *
 */

const Box = posed.div({
  enter: { opacity: 1, y: 0, delay: 0, duration: 600, staggerChildren: 100 },
  exit: { opacity: 0, y: 0 }
});

export default function AnswerScreen(props: any) {
  const round = useSelector(state => state.round);

  const question: IQuestion = round.questions[round.currentQuestion];

  const dispatch = useDispatch();

  const alternatives = question.alternatives;

  const player = "p1";
  const myAnswer =
    round.answers[question.text] && round.answers[question.text][player]; // alt1
  console.log("myanswer", myAnswer, round.answers);

  const answerHandler = (alternative: IAlternative) => {
    console.log("Answered", alternative);
    dispatch(answerQuestion(alternative));
  };

  return (
    <Screen>
      <h1>{question.text}</h1>
      <p>Your points: {round.myScore}</p>

      <PoseGroup animateOnMount>
        <Box className="alternatives" key="container">
          {alternatives.map(x => {
            const isCorrect = x.points > 0;
            const mine = x.text == myAnswer;

            // const players = round.answers[question.id].where(x => ); // answers { q1: a}
            // return <Box key={"x"+x.text} > asdads </Box>}

            return (
              <Alternative
                text={x.text}
                isCorrect={isCorrect}
                isMine={mine}
                key={"x" + x.text}
              />
            );
          })}
        </Box>
      </PoseGroup>
      <Button onClick={() => dispatch(nextQuestion())}>Continue</Button>
    </Screen>
  );
}

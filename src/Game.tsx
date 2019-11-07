import React, { useState } from "react";
import { WelcomeWizard } from "./App";
import QuestionScreen from "./QuestionScreen";
import AnswerScreen from "./features/questions/answerScreen";
import RoundScreen from "features/questions/roundScreen";

import { useSelector } from "useSelector";
import {setPath} from "features/nav/navSlice";
/**
 * Switches between all the screens
 */
export function Game() {
  const nav = useSelector(state => state.nav);

  switch (nav.path) {
    case "root": // return <WelcomeWizard />;
    case "round":
    case "question":
    return <RoundScreen />;
    case "answer": return <AnswerScreen />;
    // case "question": return <QuestionScreen />;
  }
    
  return <WelcomeWizard />
}



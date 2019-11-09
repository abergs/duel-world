import React, { useState } from "react";
import { WelcomeWizard } from "./WelcomeWizard";
import QuestionScreen from "./QuestionScreen";
import AnswerScreen from "./features/questions/answerScreen";
import RoundScreen from "features/questions/roundScreen";
import DuelsScreen from "features/duels/duelsScreen";

import { useSelector } from "useSelector";
import {setPath} from "features/nav/navSlice";
import NewDuelScreen from "features/duels/newDuelScreen";
/**
 * Switches between all the screens
 */
export function Game() {
  const nav = useSelector(state => state.nav);

  switch (nav.path) {
    case "init": return <WelcomeWizard />;
    case "duels": return <DuelsScreen />;
    case "newduel": return <NewDuelScreen />
    case "round":
    case "question":
    return <RoundScreen />;
    case "answer": return <AnswerScreen />;
    // case "question": return <QuestionScreen />;
  }
    
  return <WelcomeWizard />
}



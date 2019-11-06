import React, { useState } from "react";
import { WelcomeWizard } from "./App";
import QuestionScreen from "./QuestionScreen";
/**
 * Switches between all the screens
 */
export function Game() {
  var [currentRound, setCurrentRound] = useState("1");
  if (!currentRound) {
    return <WelcomeWizard />;
  }
  return <QuestionScreen />;
}



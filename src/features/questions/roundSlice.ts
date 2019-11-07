import { createSlice, PayloadAction, createSelector } from "redux-starter-kit";
import { string } from "prop-types";
import QuestionScreen from "QuestionScreen";
import { useSelector } from "react-redux";

const alternatives = [
  {
    text: "France",
    points: 0
  },
  {
    text: "Serbia",
    points: 0
  },
  {
    text: "Scotland",
    points: 0
  },
  {
    text: "Ireland",
    points: 5
  }
];

export interface IAlternative {
  text: string;
  points: number;
}

export interface IAnswer {
  correct: boolean;
  alternative: IAlternative;
}

export interface IQuestion {
  id: string;
  type: "capitalof" | "countryof";
  text: string;
  alternatives: IAlternative[];
  time: number;
}

const QUESTION: IQuestion = {
  id: "",
  type: "countryof",
  text: "In what country is Paris the capital?",
  alternatives: alternatives,
  time: 10
};

export interface IRoundState {
  roundId: string;
  questions: IQuestion[];
  currentQuestion: number;
  status: "not-started" | "started" | "finished" | "answered";
  myScore: number;
  answers: { [question: string]: { [player: string]: string } };
}

function cq(city: string): IQuestion {
  return {
    id: "",
    type: "countryof",
    text: "In what country is " + city + " the capital?",
    alternatives: alternatives,
    time: 10
  };
}

const initState: IRoundState = {
  roundId: "1",
  questions: [cq("Paris"), cq("Beirut"), cq("Tel Aviv")],
  answers: {},
  currentQuestion: 0,
  myScore: 0,
  status: "not-started"
};

const roundSlice = createSlice({
  name: "round",
  initialState: initState,
  reducers: {
    startRound: state => {
      state.status = "started";
      state.currentQuestion = 0;
      state.myScore = 0;
    },
    answerQuestion: (state, action) => {
      const finalQ = state.questions.length - 1;
      var alternative = action.payload as IAlternative;
      var q = state.questions[state.currentQuestion];
      const player = "p1";

      if (!state.answers[q.text]) state.answers[q.text] = {};
      state.answers[q.text][player] = alternative.text || "";

      if (state.currentQuestion <= finalQ) {
        state.myScore += alternative.points;
      }

      state.status = "answered";
    },
    nextQuestion: (state, action) => {
      const finalQ = state.questions.length - 1;
      if (state.currentQuestion == finalQ) {
        state.status = "finished";
      } else if (state.currentQuestion < finalQ) {
        // next question
        state.currentQuestion++;
      }
    }
  }
});

export const { startRound, answerQuestion, nextQuestion } = roundSlice.actions;

export default roundSlice.reducer;

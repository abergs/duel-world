import { createSlice, PayloadAction, createSelector } from "redux-starter-kit";
import { string } from "prop-types";
import QuestionScreen from "QuestionScreen";
import { useSelector } from "react-redux";
import capitals from "assets/capitals.json";

const cities = capitals.map(x => x.City);
const countries = capitals.map(x => x.Country);

// const cap2 = capitals.filter(x => x.City && x.Country).map(x => {return { City: x.City, Country: x.Country  }});
// console.log(JSON.stringify(cap2));


function shuffleArray(array:any[]) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// create questions 
function createCapitalOfQuestion() {

  const q = getRandomly(capitals);

  const template = "In what country is " + q.City + " the capital?"

  // const correctAlt = q;
  let alternatives = [
    createAlt(getRandomly(countries)),
    createAlt(getRandomly(countries)),
    createAlt(getRandomly(countries)),
    createAlt(q.Country, 5)
  ];

  shuffleArray(alternatives);

  var output: IQuestion = {
    id: template,
    text: template,
    time: 10,
    type: "capitalof",
    alternatives: alternatives
  }

  return output;
}

function createAlt(text: string, points?: number): IAlternative {
  return {
    text: text,
    points: points || 0
  }
}

function getRandomly(myArray:any[]) {
  var rand = myArray[Math.floor(Math.random() * myArray.length)];
  return rand;
}


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
  questions: [],
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

      state.questions = [];
      state.questions.push(createCapitalOfQuestion());
      state.questions.push(createCapitalOfQuestion());
      state.questions.push(createCapitalOfQuestion());

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

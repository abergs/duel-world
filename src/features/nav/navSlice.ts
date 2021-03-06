import { createSlice, PayloadAction } from 'redux-starter-kit'

import { answerQuestion,nextQuestion } from "features/questions/roundSlice";
import store from 'store';



const navSlice = createSlice({
    name: 'nav',
    initialState: { path: 'init' },    
    reducers: {
        setPath: (state, action) => {
                const path = action.payload;
                state.path = path;
                console.log("state", path);
                window.history.pushState(path, "","#" + path)
        }
    },
    extraReducers: {
        [answerQuestion.type]: (state, action) => {
            state.path = "answer";
        },
        [nextQuestion.type]: (state, action) => {
            state.path = "question";
        }
    }
})

export const { setPath } = navSlice.actions

export default navSlice.reducer;



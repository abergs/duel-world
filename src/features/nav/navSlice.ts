import { createSlice, PayloadAction } from 'redux-starter-kit'

const navSlice = createSlice({
    name: 'nav',
    initialState: { path: 'root' },    
    reducers: {
        setPath: (state, action) => {
                const path = action.payload;
                state.path = path;
                console.log("state", path);
        }
    }
})

export const { setPath } = navSlice.actions

export default navSlice.reducer;


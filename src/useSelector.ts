import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
  } from 'react-redux'
  import { RootState } from './rootReducer'
  
  export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
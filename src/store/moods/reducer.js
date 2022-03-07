import { Mood_Fetched } from "./actions";
const initialState = {
  allMoods: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Mood_Fetched: {
      return {
        ...state,
        allMoods: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

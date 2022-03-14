import { Avatar_FETCHED } from "./actions";
const initialState = {
  allAvatar: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Avatar_FETCHED: {
      return {
        ...state,
        allAvatar: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

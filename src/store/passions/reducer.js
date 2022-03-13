import { PASSIONS_FETCHED } from "./actions";
const initailState = {
  allPassions: null,
};

const reducer = (state = initailState, action) => {
  switch (action.type) {
    case PASSIONS_FETCHED: {
      return {
        ...state,
        allPassions: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

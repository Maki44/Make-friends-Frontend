import { PLACES_FETCHED, LOCATION_ADDED } from "./actions";
const initialState = {
  recommendedPlaces: null,
  selectedLocation: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACES_FETCHED: {
      return {
        ...state,
        recommendedPlaces: action.payload,
      };
    }
    case LOCATION_ADDED: {
      return {
        ...state,
        recommendedPlaces: null,
        selectedLocation: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;

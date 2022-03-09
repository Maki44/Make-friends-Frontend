import { PLACES_FETCHED, LOCATION_ADDED } from "./actions";
const initialState = {
  recommendedPlaces: null,
  selectedLocation: null,
  placeName: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACES_FETCHED: {
      return {
        ...state,
        recommendedPlaces: action.payload,
        selectedLocation: null,
        placeName: null,
      };
    }
    case LOCATION_ADDED: {
      return {
        ...state,
        recommendedPlaces: null,
        selectedLocation: action.payload.location,
        placeName: action.payload.name,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;

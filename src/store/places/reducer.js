import { PLACES_FETCHED, LOCATION_ADDED } from "./actions";
const initialState = {
  recommendedPlaces: null,
  selectedLocation: null,
  placeName: null,
  placePhoto: null,
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
      const { location, name, photo } = action.payload;
      return {
        ...state,
        recommendedPlaces: null,
        selectedLocation: location,
        placeName: name,
        placePhoto: photo,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;

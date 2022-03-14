export const selectPlaces = (state) => {
  if (!state.places.recommendedPlaces) {
    return null;
  } else {
    return state.places.recommendedPlaces;
  }
};
export const selectLocation = (state) => state.places.selectedLocation;

export const selectPlaceName = (state) => state.places.placeName;

export const selectPlacePhoto = (state) => state.places.placePhoto;

export const selectPlaces = (state) => {
  if (!state.places.recommendedPlaces) {
    return null;
  } else {
    const placesWithNeedInformation = state.places.recommendedPlaces.map(
      (place) => {
        return {
          location: place.geometry.location,
          name: place.name,
          rating: place.rating,
          types: place.types,
        };
      }
    );
    return placesWithNeedInformation;
  }
};
export const selectLocation = (state) => state.places.selectedLocation;

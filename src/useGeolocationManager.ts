import { ref } from "vue";
import { getDistanceInMeters } from "./utils";
import type { GeolocationOptions, TLocation, TLocationHistory } from "./types";

export function useGeolocationManager({
  distanceThreshold = 100,
  loadHistory,
  saveHistory,
}: GeolocationOptions) {
  const history = ref<TLocationHistory>({ locations: [] });

  const init = async () => {
    const existing = await loadHistory();
    if (existing) {
      history.value = existing;
    }
  };

  const addLocation = async (newLocation: TLocation) => {
    const updatedHistory: TLocationHistory = {
      locations: [...history.value.locations],
    };

    const lastLocation = updatedHistory.locations.at(-1);

    let isSameCoords = false;

    if (lastLocation) {
      const distance = getDistanceInMeters(
        lastLocation.coords.latitude,
        lastLocation.coords.longitude,
        newLocation.coords.latitude,
        newLocation.coords.longitude
      );

      isSameCoords = distance < distanceThreshold;
    }

    if (isSameCoords && lastLocation) {
      lastLocation.timestamp = newLocation.timestamp;
    } else {
      updatedHistory.locations.push(newLocation);
    }

    history.value = updatedHistory;
    await saveHistory(updatedHistory);
  };

  return {
    history,
    init,
    addLocation,
  };
}

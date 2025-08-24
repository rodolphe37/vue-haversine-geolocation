import { describe, it, expect } from "vitest";
import { useGeolocationManager } from "../src/useGeolocationManager";

const sample = (lat: number, lon: number, t = Date.now()) => ({
  timestamp: t,
  mocked: false,
  coords: {
    accuracy: 5,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    latitude: lat,
    longitude: lon,
    speed: 0,
  },
});

describe("useGeolocationManager", () => {
  it("ajoute la première localisation", async () => {
    const gm = useGeolocationManager({
      loadHistory: async () => null,
      saveHistory: async () => {},
      distanceThreshold: 100,
    });

    await gm.init();
    await gm.addLocation(sample(48.8566, 2.3522));

    expect(gm.history.value.locations.length).toBe(1);
  });
});

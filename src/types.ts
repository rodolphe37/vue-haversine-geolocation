export type TLocation = {
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  mocked: boolean;
  timestamp: number;
};

export type TLocationHistory = {
  locations: TLocation[];
};

export type GeolocationOptions = {
  distanceThreshold?: number;
  loadHistory: () => Promise<TLocationHistory | null>;
  saveHistory: (history: TLocationHistory) => Promise<void>;
};

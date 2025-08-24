import * as vue from 'vue';

type TLocation = {
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
type TLocationHistory = {
    locations: TLocation[];
};
type GeolocationOptions = {
    distanceThreshold?: number;
    loadHistory: () => Promise<TLocationHistory | null>;
    saveHistory: (history: TLocationHistory) => Promise<void>;
};

declare function useGeolocationManager({ distanceThreshold, loadHistory, saveHistory, }: GeolocationOptions): {
    history: vue.Ref<{
        locations: {
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
        }[];
    }, TLocationHistory | {
        locations: {
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
        }[];
    }>;
    init: () => Promise<void>;
    addLocation: (newLocation: TLocation) => Promise<void>;
};

declare const loadFromLocalStorage: () => Promise<TLocationHistory | null>;
declare const saveToLocalStorage: (h: TLocationHistory) => Promise<void>;

export { type GeolocationOptions, type TLocation, type TLocationHistory, loadFromLocalStorage, saveToLocalStorage, useGeolocationManager };

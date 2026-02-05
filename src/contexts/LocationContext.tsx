import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export interface UserLocation {
    lat: number;
    lng: number;
    address: string;
}

interface LocationContextType {
    location: UserLocation | null;
    setLocation: (location: UserLocation | null) => void;
    isLoading: boolean;
    error: string | null;
    requestLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
    const [location, setLocationState] = useState<UserLocation | null>(() => {
        const saved = localStorage.getItem("userLocation");
        return saved ? JSON.parse(saved) : null;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setLocation = (loc: UserLocation | null) => {
        setLocationState(loc);
        if (loc) {
            localStorage.setItem("userLocation", JSON.stringify(loc));
            setError(null);
        } else {
            localStorage.removeItem("userLocation");
        }
    };

    const requestLocation = async () => {
        setIsLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            setIsLoading(false);
            return;
        }

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                });
            });

            const { latitude, longitude } = position.coords;

            // Try to reverse geocode to a human‑readable location (city / town, etc.)
            let readableAddress = "Current Location";
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
                    {
                        headers: {
                            Accept: "application/json",
                        },
                    }
                );

                if (response.ok) {
                    const data: {
                        display_name?: string;
                        address?: {
                            city?: string;
                            town?: string;
                            village?: string;
                            suburb?: string;
                            state?: string;
                            country?: string;
                        };
                    } = await response.json();

                    const addr = data.address;
                    if (addr) {
                        const mainPlace =
                            addr.city ||
                            addr.town ||
                            addr.village ||
                            addr.suburb;
                        const parts = [
                            mainPlace,
                            addr.state,
                            addr.country,
                        ].filter(Boolean);
                        if (parts.length > 0) {
                            readableAddress = parts.join(", ");
                        } else if (data.display_name) {
                            readableAddress = data.display_name;
                        }
                    } else if (data.display_name) {
                        readableAddress = data.display_name;
                    }
                }
            } catch (geoError) {
                console.warn("Reverse geocoding failed, using generic address.", geoError);
            }

            const newLocation = {
                lat: latitude,
                lng: longitude,
                address: readableAddress
            };

            setLocation(newLocation);
        } catch (err: any) {
            console.error("Location error:", err);
            if (err.code === 1) {
                setError("Location permission denied. Please enable location services.");
            } else if (err.code === 2) {
                setError("Location unavailable. Please check your signal.");
            } else if (err.code === 3) {
                setError("Location request timed out.");
            } else {
                setError("Failed to get location.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Automatically try to detect the user's location once when the app loads,
    // but only if we don't already have a saved/manual location.
    const hasRequestedLocation = useRef(false);

    useEffect(() => {
        if (!hasRequestedLocation.current && !location) {
            hasRequestedLocation.current = true;
            void requestLocation();
        }
    }, [location, requestLocation]);

    return (
        <LocationContext.Provider value={{ location, setLocation, isLoading, error, requestLocation }}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
}

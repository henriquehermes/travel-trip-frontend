import { type IGeoLocation } from "@/interfaces/user.interfaces";
import { useState, useEffect } from "react";

export const useLocation = () => {
    const [userLocation, setUserLocation] = useState<IGeoLocation>({
        lat: 0,
        lng: 0,
    });

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;

                setUserLocation({ lat: latitude, lng: longitude });
            });
        }
    }, []);

    return {
        userLocation,
    };
};

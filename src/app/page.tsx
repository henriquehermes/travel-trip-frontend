"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import HeaderComponent from "@/components/Header";
import mainStyle from "@/utils/map/main.json";
import millieStyle from "@/utils/map/millie.json";
import { FaPlus, FaTrash } from "react-icons/fa";
import ModalAddMarker from "@/components/Map/ModalAddMarker";
import { type IGeoLocation } from "@/interfaces/user.interfaces";

function HomePage() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [userLocation, setUserLocation] = useState<IGeoLocation>();
    const [newMarker, setNewMarker] = useState(false);
    const [mapStyle] = useState(true);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "",
    });

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setUserLocation({ lat: latitude, lng: longitude });
            });
        }
    }, []);

    return (
        <Flex flexDir={"column"} minH="100vh" minW="100vw">
            <HeaderComponent />

            {isLoaded && userLocation && (
                <Flex flex={1} minH="full" minW="full">
                    <GoogleMap
                        options={{
                            disableDefaultUI: true,
                            styles: mapStyle ? mainStyle : millieStyle,
                            gestureHandling: "greedy",
                        }}
                        mapContainerStyle={{
                            flex: 1,
                        }}
                        center={userLocation}
                        zoom={10}
                    >
                        {newMarker && (
                            <Marker
                                onDragEnd={(event) => {
                                    console.log(event.latLng?.toJSON());
                                }}
                                options={{
                                    draggable: true,
                                    clickable: true,
                                }}
                                position={userLocation}
                                onClick={() => {
                                    onOpen();
                                }}
                            >
                                <Text>Add me</Text>
                            </Marker>
                        )}

                        <Button
                            onClick={() => {
                                setNewMarker(!newMarker);
                            }}
                            p={0}
                            h="50px"
                            w="50px"
                            pos="absolute"
                            right="20px"
                            bottom="20px"
                        >
                            {newMarker ? (
                                <FaTrash size="25px" />
                            ) : (
                                <FaPlus size="25px" />
                            )}
                        </Button>
                    </GoogleMap>
                </Flex>
            )}

            <ModalAddMarker
                isOpen={isOpen}
                onClose={onClose}
                latitude={userLocation?.lat ?? 0}
                longitude={userLocation?.lng ?? 0}
            />
        </Flex>
    );
}

export default React.memo(HomePage);

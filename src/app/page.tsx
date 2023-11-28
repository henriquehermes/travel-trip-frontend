"use client";

import { memo, useCallback, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import HeaderComponent from "@/components/Header";
import mainStyle from "@/utils/map/main.json";
import millieStyle from "@/utils/map/millie.json";
import { FaPlus, FaTrash } from "react-icons/fa";
import ModalAddMarker from "@/components/Map/ModalAddMarker";
import { useGetMarkersQuery } from "@/services/marker.service";
import { useLocation } from "@/hooks/useLocation";

function HomePage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { userLocation } = useLocation();

    const mapCords = useRef({
        lat: userLocation?.lat,
        lng: userLocation?.lng,
    });

    const [newMarker, setNewMarker] = useState(false);
    const [mapStyle] = useState(true);
    const [map, setMap] = useState<any>(null);

    const { data } = useGetMarkersQuery();

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "",
    });

    const onLoad = useCallback(function callback(map: any) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

    const handleCenterChanged = () => {
        if (map && mapCords.current) {
            const newCenter = map.getCenter();
            mapCords.current = {
                lat: newCenter.lat(),
                lng: newCenter.lng(),
            };
        }
    };

    return (
        <Flex flexDir={"column"} minH="100vh" minW="100vw">
            <HeaderComponent />

            {isLoaded && userLocation && (
                <Flex flex={1} minH="full" minW="full">
                    <GoogleMap
                        onCenterChanged={handleCenterChanged}
                        options={{
                            disableDefaultUI: true,
                            styles: mapStyle ? mainStyle : millieStyle,
                            gestureHandling: "greedy",
                        }}
                        mapContainerStyle={{
                            flex: 1,
                        }}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
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
                                position={mapCords.current}
                                onClick={() => {
                                    onOpen();
                                }}
                            >
                                <Text>Add me</Text>
                            </Marker>
                        )}

                        {data?.map((marker) => {
                            return (
                                <Marker
                                    key={marker.id}
                                    options={{
                                        draggable: false,
                                        clickable: true,
                                    }}
                                    position={{
                                        lat: +marker.latitude,
                                        lng: +marker.longitude,
                                    }}
                                ></Marker>
                            );
                        })}

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
                onClose={() => {
                    setNewMarker(false);
                    onClose();
                }}
                latitude={mapCords.current.lat}
                longitude={mapCords.current.lng}
            />
        </Flex>
    );
}

export default memo(HomePage);

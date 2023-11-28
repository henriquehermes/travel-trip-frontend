import { useGetListOfAmenitiesQuery } from "@/services/amenity.service";
import { Spinner, Checkbox, Flex, Text } from "@chakra-ui/react";
import { memo, type Dispatch, type SetStateAction } from "react";

interface Props {
    amenities: string[];
    setAmenities: Dispatch<SetStateAction<never[] | string[]>>;
}

const Amenities = ({ amenities, setAmenities }: Props) => {
    const { data, isLoading } = useGetListOfAmenitiesQuery();

    const handleSelectAmenities = (amenityId: string) => {
        // Check if amenityId is already in the list
        const isAlreadySelected = amenities.includes(amenityId);

        // If it's already selected, remove it; otherwise, add it
        const newList = isAlreadySelected
            ? amenities.filter((id) => id !== amenityId)
            : [...amenities, amenityId];

        setAmenities(newList);
    };

    return (
        <Flex flexWrap={"wrap"} gap={5}>
            {isLoading ? (
                <Spinner />
            ) : (
                data?.map((item) => (
                    <Checkbox
                        id={item.id}
                        onChange={(e) => handleSelectAmenities(e.target.id)}
                        key={item.id}
                    >
                        <Text>{item.name}</Text>
                    </Checkbox>
                ))
            )}
        </Flex>
    );
};

export default memo(Amenities);

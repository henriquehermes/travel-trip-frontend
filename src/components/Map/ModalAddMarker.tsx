import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    ModalOverlay,
    Input,
    Textarea,
    FormControl,
    FormErrorMessage,
} from "@chakra-ui/react";
import ColorPicker from "./ColorPicker";
import Amenities from "./Amenities";
import { memo, useState } from "react";
import { IColors } from "@/interfaces/color.interfaces";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useCreateNewMarkerMutation } from "@/services/marker.service";
import {
    type IAddMarkerLocation,
    type IMarkerRequest,
} from "@/interfaces/marker.interfaces";
import { handleApiError } from "@/utils/apiError";
import { type IErrorApi } from "@/services/api";
import { TOAST_TYPE, showToast } from "@/utils/toast";
import { useUser } from "@/hooks/useUser";

const ModalAddMarker = ({
    isOpen,
    onClose,
    latitude,
    longitude,
}: IAddMarkerLocation) => {
    const [createNewMarkerTrigger] = useCreateNewMarkerMutation();

    const { user } = useUser();
    const [amenities, setAmenities] = useState<string[]>([]);
    const [color, setColor] = useState<IColors | undefined>(IColors.Red);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            type: "",
            notes: "",
        },
    });

    const handleAddMarker: SubmitHandler<
        Pick<IMarkerRequest, "type" | "notes">
    > = async (data, event) => {
        if (event) event.preventDefault();
        try {
            await createNewMarkerTrigger({
                ...data,
                pin_color: color ?? IColors.Red,
                latitude,
                longitude,
                amenities,
                favorite: false,
                user_id: user?.id ?? "",
            }).unwrap();

            showToast("Marker has been created! 🚀", TOAST_TYPE.SUCCESS);
            onClose();
            reset();
        } catch (error) {
            handleApiError(error as IErrorApi);
        }
    };

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
            <ModalContent bgColor="#fff" borderRadius="15px">
                <ModalHeader>Create new marker</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(handleAddMarker)}>
                    <ModalBody>
                        <Text fontSize={"14px"} fontWeight={600} mb="5px">
                            Type
                        </Text>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <FormControl
                                    marginBottom={5}
                                    isInvalid={!!errors.type}
                                >
                                    <Input
                                        {...field}
                                        {...register("type", {
                                            required: "Type is required.",
                                        })}
                                        placeholder="Enter the type"
                                    />
                                    <FormErrorMessage>
                                        {errors.type?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />

                        <Text
                            fontSize={"14px"}
                            fontWeight={600}
                            mt="20px"
                            mb="5px"
                        >
                            Marker color
                        </Text>
                        <ColorPicker selected={color} setSelected={setColor} />

                        <Text
                            fontSize={"14px"}
                            fontWeight={600}
                            mt="20px"
                            mb="5px"
                        >
                            Amenities
                        </Text>
                        <Amenities
                            setAmenities={setAmenities}
                            amenities={amenities}
                        />

                        <Text
                            fontSize={"14px"}
                            fontWeight={600}
                            mt="20px"
                            mb="5px"
                        >
                            Notes (Optional)
                        </Text>
                        <Controller
                            name="notes"
                            control={control}
                            render={({ field }) => (
                                <FormControl
                                    marginBottom={5}
                                    isInvalid={!!errors.notes}
                                >
                                    <Textarea
                                        {...field}
                                        {...register("notes")}
                                    />
                                    <FormErrorMessage>
                                        {errors.notes?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                    </ModalBody>
                    <ModalFooter gap={5}>
                        <Button variant="secondary" type="submit">
                            Add
                        </Button>

                        <Button
                            onClick={() => {
                                onClose();
                                reset();
                            }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default memo(ModalAddMarker);

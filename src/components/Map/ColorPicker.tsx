import { IColors } from "@/interfaces/color.interfaces";
import { Button, Flex } from "@chakra-ui/react";
import { memo, type Dispatch, type SetStateAction } from "react";

interface Props {
    selected?: IColors;
    setSelected: Dispatch<SetStateAction<IColors | undefined>>;
}

const getBackgroundColor = (color: IColors) => {
    switch (color) {
        case IColors.Green:
            return "#4CAF50";
        case IColors.Red:
            return "#F44336";
        case IColors.Blue:
            return "#2196F3";
        case IColors.Orange:
            return "#FF9800";
        case IColors.Yellow:
            return "#FFEB3B";
        default:
            return "";
    }
};

const getBorderColor = (color: IColors) => {
    switch (color) {
        case IColors.Green:
            return "#43A047";
        case IColors.Red:
            return "#E53935";
        case IColors.Blue:
            return "#1E88E5";
        case IColors.Orange:
            return "#FB8C00";
        case IColors.Yellow:
            return "#FDD835";
        default:
            return "";
    }
};

const ColorButton = ({
    color,
    selected,
    onClick,
}: {
    color: IColors;
    selected?: IColors;
    onClick: () => void;
}) => (
    <Button
        onClick={onClick}
        variant="radio"
        borderColor={selected === color ? getBorderColor(color) : "#D8D8DF"}
        backgroundColor={getBackgroundColor(color)}
    />
);

const ColorPicker = ({ selected, setSelected }: Props) => {
    const handleColorSelection = (color: IColors) => {
        setSelected(color === selected ? undefined : color);
    };

    return (
        <Flex gap={3}>
            {Object.values(IColors).map((color) => (
                <ColorButton
                    key={color}
                    color={color}
                    selected={selected}
                    onClick={() => handleColorSelection(color)}
                />
            ))}
        </Flex>
    );
};

export default memo(ColorPicker);

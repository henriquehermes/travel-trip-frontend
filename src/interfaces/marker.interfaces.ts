import { type IColors } from "./color.interfaces";

export interface IMarkerRequest {
    type: string;
    amenities: string[];
    pin_color: IColors;
    notes: string;
    favorite: boolean;
    latitude: number;
    longitude: number;
    user_id: string;
}

export interface IMarkerResponse extends IMarkerRequest {
    id: string;
    created_at: string;
}

export interface IAddMarkerLocation {
    latitude: number;
    longitude: number;
    isOpen: boolean;
    onClose: () => void;
}

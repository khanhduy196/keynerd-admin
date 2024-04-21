import { KeycapProfile } from "enums/keycap";
import { OrderStatus } from "enums/order-enum";

export type OrderItem = {
    id: number;
    note: string;
    orderStatus: OrderStatus;
    details: OrderDetailItem[]
}

export type OrderDetailItem = {
    id: number;
    name: string;
    keycapId: number;
    photos: string[];
    profile: KeycapProfile;
    size: number;
    quantity: number;
    fileUrl: string;
}
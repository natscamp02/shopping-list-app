export interface PartialItem {
    name: string;
    category: string;
    quantity: number;
    cost: number;
}

export interface Item extends PartialItem {
    _id: string;
}

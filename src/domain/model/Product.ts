import IProduct from "./IProduct";
import IOrder from "./IOrder";

export default class Product implements IProduct {
    id: number;
    name: string;
    description: string;

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    evaluateDiscount(orderLastSixMonths: IOrder[], orderLastYear: IOrder[]): IProduct {
        return this;
    }
}
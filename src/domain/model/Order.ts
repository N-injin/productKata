import IOrder from "./IOrder";

export default class Order implements IOrder {
    userId: number;
    productId: number;
    date: Date;

    constructor(userId: number, productId: number, date: Date) {
        this.userId = userId;
        this.productId = productId;
        this.date = date;
    }
}

import Detail from "./Detail";
import IOrder from "./IOrder";

export default interface IProduct {
    id: number;
    name: string;
    description: string;
    price:number;
    categoryId:number;
    detail:Detail[];
    evaluateDiscount(orderLastSixMonths:IOrder[], orderLastYear:IOrder[]) : IProduct;
}

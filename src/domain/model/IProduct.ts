import IOrder from "./IOrder";

export default interface IProduct {
    id: number;
    name: string;
    description: string;
    // TODO : catégorie
    // TODO : Details
    evaluateDiscount(orderLastSixMonths:IOrder[], orderLastYear:IOrder[]) : IProduct;
}

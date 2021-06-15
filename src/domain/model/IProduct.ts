import Detail from "./Detail";
import IOrder from "./IOrder";
import {Money} from "../types/Money";
import DiscountRule from "../types/DiscountRule";

export default interface IProduct {
    id: number;
    name: string;
    description: string;
    price: Money;
    categoryId: number;
    detail: Detail[];

    evaluateDiscount(
        ordersLastSixMonths: IOrder[],
        ordersLastYear: IOrder[],
        discount: DiscountRule,
        rise: DiscountRule,
    ): IProduct;
}

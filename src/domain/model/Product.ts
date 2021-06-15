import IProduct from "./IProduct";
import IOrder from "./IOrder";
import Detail from "./Detail";
import {Money} from "../types/Money";
import DiscountRule from "../types/DiscountRule";

export default class Product implements IProduct {
    id: number;
    name: string;
    description: string;
    price: Money;
    categoryId: number;
    detail: Detail[];

    constructor(id: number, name: string, description: string, price: Money, categoryId: number, detail: Detail[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.detail = detail;
    }

    evaluateDiscount(
        ordersLastSixMonths: IOrder[],
        ordersLastYear: IOrder[],
        discount: DiscountRule,
        rise: DiscountRule,
    ): IProduct {
        let discountValue = 0;
        if (ordersLastSixMonths.length >= discount.limitToTriggerDiscount) {
            discountValue -= discount.value * this.price.getValue();
        }
        if (ordersLastYear.length >= rise.limitToTriggerDiscount) {
            discountValue += rise.value * this.price.getValue();
        }

        return new Product(
            this.id,
            this.name,
            this.description,
            this.price.add(new Money(discountValue, this.price.getCurrency())),
            this.categoryId,
            this.detail
        );
    }
}
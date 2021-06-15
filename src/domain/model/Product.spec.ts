import IProduct from "./IProduct";
import Product from "./Product";
import {Money} from "../types/Money";
import Order from "./Order";
import DiscountRule from "../types/DiscountRule";

describe("Product", () => {
    let product: IProduct;

    beforeEach(() => {
        product = new Product(1, "Test product", "Description", new Money(100.0, "EUR"), 1, [])
    });

    describe("evaluateDiscount", () => {
        it("should leave the price if no amount of orders meet the requirements for a discount", () => {
            const discountedProduct = product.evaluateDiscount(
                [],
                [],
                new DiscountRule(0.10, 3),
                new DiscountRule(0.05, 5)
            );

            expect(product.price.getValue()).toStrictEqual(100.0);
            expect(product.price.getCurrency()).toStrictEqual("EUR");
            expect(discountedProduct.price.getValue()).toStrictEqual(100.0);
            expect(discountedProduct.price.getCurrency()).toStrictEqual("EUR");
            expect(product !== discountedProduct).toBeTruthy();
        });

        it("should discount the price by 10% if 3 or more orders are in the first array", () => {
            const ordersLastSixMonth = [
                new Order(1, 1, null),
                new Order(1, 4, null),
                new Order(1, 8, null),
            ]

            const discountedProduct = product.evaluateDiscount(
                ordersLastSixMonth,
                [],
                new DiscountRule(0.10, 3),
                new DiscountRule(0.05, 5)
            );

            expect(product.price.getValue()).toStrictEqual(100.0);
            expect(product.price.getCurrency()).toStrictEqual("EUR");
            expect(discountedProduct.price.getValue()).toStrictEqual(90.0);
            expect(discountedProduct.price.getCurrency()).toStrictEqual("EUR");
        });

        it("should rise the price by 5% if 5 or more identical orders are in the second array", () => {
            const ordersLastYear = [
                new Order(1, 1, null),
                new Order(1, 1, null),
                new Order(1, 1, null),
                new Order(1, 1, null),
                new Order(1, 1, null),
                new Order(1, 1, null),
            ]

            const discountedProduct = product.evaluateDiscount(
                [],
                ordersLastYear,
                new DiscountRule(0.10, 3),
                new DiscountRule(0.05, 5)
            );

            expect(product.price.getValue()).toStrictEqual(100.0);
            expect(product.price.getCurrency()).toStrictEqual("EUR");
            expect(discountedProduct.price.getValue()).toStrictEqual(105.0);
            expect(discountedProduct.price.getCurrency()).toStrictEqual("EUR");
        });

        it('should combine both the discount and the rise when both arrays of orders meet the requirements', () => {
            const ordersLastSixMonth = [
                new Order(1, 1, null),
                new Order(1, 4, null),
                new Order(1, 8, null),
            ]

            const ordersLastYear = [
                new Order(1, 1, null),
                new Order(1, 1, null),
                new Order(1, 1, null),
                new Order(1, 1, null),
                new Order(1, 1, null),
                new Order(1, 1, null),
            ]

            const discountedProduct = product.evaluateDiscount(
                ordersLastSixMonth,
                ordersLastYear,
                new DiscountRule(0.10, 3),
                new DiscountRule(0.05, 5)
            );

            expect(product.price.getValue()).toStrictEqual(100.0);
            expect(product.price.getCurrency()).toStrictEqual("EUR");
            expect(discountedProduct.price.getValue()).toStrictEqual(95.0);
            expect(discountedProduct.price.getCurrency()).toStrictEqual("EUR");
        });
    });
});

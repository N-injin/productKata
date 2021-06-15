import OrderMemoryRepository from "./OrderMemoryRepository";
import OrderMemory from "../model/OrderMemory";
import Order from "../../../domain/model/Order";

describe("OrderMemoryRepository", () => {
    let orderMemoryRepository: OrderMemoryRepository;
    let order1: OrderMemory;
    let order2: OrderMemory;
    let order3: OrderMemory;
    let order4: OrderMemory;

    beforeEach(() => {
        orderMemoryRepository = new OrderMemoryRepository();

        order1 = new OrderMemory(1, 1, new Date(2021, 11, 5));
        order2 = new OrderMemory(1, 2, new Date(2021, 7, 12));
        order3 = new OrderMemory(1, 2, new Date(2020, 12, 24));
        order4 = new OrderMemory(2, 8, new Date(2021, 11, 5));

        orderMemoryRepository.orders = [
            order1,
            order2,
            order3,
            order4
        ]
    });

    describe("findByUserAndDate", () => {
        it("should return the products bought by a given user above a given date", () => {
            const filteredProducts = orderMemoryRepository.findByUserAndDate(1, new Date(2021, 5, 5));

            expect(filteredProducts).toHaveLength(2);

            expect(filteredProducts[0].productId).toStrictEqual(order1.productId);
            expect(filteredProducts[0].userId).toStrictEqual(order1.userId);
            expect(filteredProducts[0].date).toStrictEqual(order1.date);
            expect(filteredProducts[0]).toBeInstanceOf(Order);

            expect(filteredProducts[1].productId).toStrictEqual(order2.productId);
            expect(filteredProducts[1].userId).toStrictEqual(order2.userId);
            expect(filteredProducts[1].date).toStrictEqual(order2.date);
            expect(filteredProducts[1]).toBeInstanceOf(Order);
        });
    });

    describe("findByUserAndProductAndDate", () => {
        it("should return the list of a given product bought by a given user above a given date", () => {
            const filteredProducts = orderMemoryRepository.findByUserAndProductAndDate(1, 2, new Date(2020, 11, 5));

            expect(filteredProducts).toHaveLength(2);

            expect(filteredProducts[0].productId).toStrictEqual(order2.productId);
            expect(filteredProducts[0].userId).toStrictEqual(order2.userId);
            expect(filteredProducts[0].date).toStrictEqual(order2.date);
            expect(filteredProducts[0]).toBeInstanceOf(Order);

            expect(filteredProducts[1].productId).toStrictEqual(order3.productId);
            expect(filteredProducts[1].userId).toStrictEqual(order3.userId);
            expect(filteredProducts[1].date).toStrictEqual(order3.date);
            expect(filteredProducts[1]).toBeInstanceOf(Order);
        });
    });
});

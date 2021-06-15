import IOrderRepository from "../../../domain/repository/IOrderRepository";
import OrderMemory from "../model/OrderMemory";
import IOrder from "../../../domain/model/IOrder";
import OrderMemoryAdapter from "../adapter/OrderMemoryAdapter";

export default class OrderMemoryRepository implements IOrderRepository {
    orders: OrderMemory[];

    constructor() {
        this.orders = [
            new OrderMemory(
                1,
                1,
                new Date(2021, 6, 15)
            ),
            new OrderMemory(
                1,
                1,
                new Date(2021, 6, 14)
            ),
            new OrderMemory(
                1,
                1,
                new Date(2021, 5, 10)
            ),
            new OrderMemory(
                1,
                1,
                new Date(2021, 5, 9)
            ),
            new OrderMemory(
                1,
                1,
                new Date(2021, 5, 8)
            ),
            new OrderMemory(
                1,
                2,
                new Date(2021, 4, 5)
            )
        ];
    }

    findByUserAndDate(userId: number, date: Date): IOrder[] {
        return this
            .orders
            .filter(
                order =>
                    order.userId === userId &&
                    order.date > date
            )
            .map(OrderMemoryAdapter.orderMemoryToOrder);
    }

    findByUserAndProductAndDate(userId: number, productId: number, date: Date): IOrder[] {
        return this
            .orders
            .filter(
                order =>
                    order.userId === userId &&
                    order.productId === productId &&
                    order.date > date
            )
            .map(OrderMemoryAdapter.orderMemoryToOrder);
    }
}
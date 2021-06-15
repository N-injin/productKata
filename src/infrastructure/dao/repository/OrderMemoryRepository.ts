import IOrderRepository from "../../../domain/repository/IOrderRepository";
import OrderMemory from "../model/OrderMemory";
import IOrder from "../../../domain/model/IOrder";
import OrderMemoryAdapter from "../adapter/OrderMemoryAdapter";

export default class OrderMemoryRepository implements IOrderRepository {
    orders: OrderMemory[];

    constructor() {
        this.orders = [];
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
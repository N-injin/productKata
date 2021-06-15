import OrderMemory from "../model/OrderMemory";
import IOrder from "../../../domain/model/IOrder";
import Order from "../../../domain/model/Order";

export default class OrderMemoryAdapter {
    static orderMemoryToOrder(orderMemory: OrderMemory): IOrder {
        return new Order(orderMemory.userId, orderMemory.productId, orderMemory.date);
    }
}

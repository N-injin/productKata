import IOrder from "../models/IOrder";

export default interface IOrderRepository {
    findByUserAndProductAndDate(userId: number, productId: number, date: Date): IOrder[];

    findByUserAndDate(userId: number, date: Date): IOrder[];
}

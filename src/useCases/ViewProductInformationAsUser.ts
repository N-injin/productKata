import IProductRepository from "../domain/repository/IProductRepository";
import IUserRepository from "../domain/repository/IUserRepository";
import IOrderRepository from "../domain/repository/IOrderRepository";
import IProduct from "../domain/models/IProduct";

export default class ViewProductInformationAsUser {
    constructor(
        private productRepository: IProductRepository,
        private userRepository: IUserRepository,
        private orderRepository: IOrderRepository
    ) {
    }

    public execute(productId: number, userId: number): IProduct {

    }
}

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
        try {      
            const user = this.userRepository.findOne(userId);
            const product = this.productRepository.findOne(productId);

            let currentDate = new Date();
            currentDate.setMonth(currentDate.getMonth()-6);
            const orderLastSixMonths = this.orderRepository.findByUserAndDate(userId,currentDate);

            currentDate = new Date();
            currentDate.setFullYear(currentDate.getFullYear()-1);
            const orderLastYear = this.orderRepository.findByUserAndProductAndDate(userId,productId,currentDate);

            return product.evaluateDiscount(orderLastSixMonths, orderLastYear);
        } catch (e) {
            console.log(e);
        }
    }
}

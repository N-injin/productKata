import IProductRepository from "../domain/repository/IProductRepository";
import IOrderRepository from "../domain/repository/IOrderRepository";
import IProduct from "../domain/model/IProduct";
import IDateService from "../infrastructure/services/IDateService";

export default class ViewProductInformationAsUser {
    constructor(
        private productRepository: IProductRepository,
        private orderRepository: IOrderRepository,
        private dateService: IDateService,
    ) {
    }

    public execute(productId: number, userId: number): IProduct {
        const product = this.productRepository.findOne(productId);
        const orderLastSixMonths = this.orderRepository.findByUserAndDate(
            userId,
            this.dateService.dateMinusMonths(6)
        );
        const orderLastYear = this.orderRepository.findByUserAndProductAndDate(
            userId,
            productId,
            this.dateService.dateMinusYears(1)
        );

        return product.evaluateDiscount(orderLastSixMonths, orderLastYear);
    }
}

import IProductRepository from "../domain/repository/IProductRepository";
import IOrderRepository from "../domain/repository/IOrderRepository";
import IProduct from "../domain/model/IProduct";
import IDateService from "../domain/service/IDateService";
import DiscountRule from "../domain/types/DiscountRule";
import IConfigurationService from "../domain/service/IConfigurationService";

export default class ViewProductInformationAsUser {
    constructor(
        private productRepository: IProductRepository,
        private orderRepository: IOrderRepository,
        private dateService: IDateService,
        private configurationService: IConfigurationService,
    ) {
    }

    public execute(productId: number, userId: number): IProduct {
        const product = this.productRepository.findOne(productId);

        const ordersLastSixMonths = this.orderRepository.findByUserAndDate(
            userId,
            this.dateService.dateMinusMonths(
                this.configurationService.getConfiguration().firstDiscountMonthsToSubtract
            )
        );

        const ordersLastYear = this.orderRepository.findByUserAndProductAndDate(
            userId,
            productId,
            this.dateService.dateMinusYears(
                this.configurationService.getConfiguration().secondDiscountYearsToSubtract
            )
        );

        return product.evaluateDiscount(
            ordersLastSixMonths,
            ordersLastYear,
            new DiscountRule(
                this.configurationService.getConfiguration().firstDiscountValue,
                this.configurationService.getConfiguration().firstDiscountLimit
            ),
            new DiscountRule(
                this.configurationService.getConfiguration().secondDiscountValue,
                this.configurationService.getConfiguration().secondDiscountLimit
            ),
        );
    }
}

import IProductRepository from "../domain/repository/IProductRepository";
import IProduct from "../domain/model/IProduct";

export default class ViewProductInformation {
    constructor(private productRepository: IProductRepository) {
    }

    public execute(productId: number): IProduct {
        return this.productRepository.findOne(productId);
    }
}

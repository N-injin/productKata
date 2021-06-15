import IProductRepository from "../../../domain/repository/IProductRepository";
import IProduct from "../../../domain/model/IProduct";
import ProductMemory from "../model/ProductMemory";
import {ProductDoesNotExistError} from "../../error/ProductDoesNotExistError";
import ProductMemoryAdapter from "../adapter/ProductMemoryAdapter";

export default class ProductMemoryRepository implements IProductRepository {
    products: ProductMemory[];

    constructor() {
        this.products = [];
    }

    findOne(productId: number): IProduct {
        const index = this.products.findIndex(product => product.id === productId);

        if (index === -1) {
            throw new ProductDoesNotExistError();
        }

        return ProductMemoryAdapter.productMemoryToProduct(this.products[index]);
    }

}
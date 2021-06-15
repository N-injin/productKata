import IProductRepository from "../../../domain/repository/IProductRepository";
import IProduct from "../../../domain/model/IProduct";
import ProductMemory from "../model/ProductMemory";
import {ProductDoesNotExistError} from "../../error/ProductDoesNotExistError";
import ProductMemoryAdapter from "../adapter/ProductMemoryAdapter";
import Detail from "../../../domain/model/Detail";

export default class ProductMemoryRepository implements IProductRepository {
    products: ProductMemory[];

    constructor() {
        this.products = [
            new ProductMemory(
                1,
                'Boule de pétanque (unité)',
                'Une boule de pétanque seule',
                30.0,
                1,
                [
                    new Detail('poids', '10 kilos')
                ]
            )
        ];
    }

    findOne(productId: number): IProduct {
        const index = this.products.findIndex(product => product.id === productId);

        if (index === -1) {
            throw new ProductDoesNotExistError();
        }

        return ProductMemoryAdapter.productMemoryToProduct(this.products[index]);
    }

}
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
                "Boule de pétanque (unité)",
                "Une boule de pétanque seule",
                30.0,
                "EUR",
                1,
                [
                    new Detail("poids", "10 kilos")
                ]
            ),
            new ProductMemory(
                2,
                "Boule de pétanque (pack de 6)",
                "La collection complète pour les accros de la pétanque",
                98.0,
                "EUR",
                1,
                [
                    new Detail("poids total", "60 kilos"),
                    new Detail("poids par boule", "10 kilos"),
                ]
            )
        ];
    }

    findOne(productId: number): IProduct {
        const index = this.products.findIndex(product => product.id === productId);

        if (index === -1) {
            throw new ProductDoesNotExistError(`Product of id ${productId} does not exist`);
        }

        return ProductMemoryAdapter.productMemoryToProduct(this.products[index]);
    }

}
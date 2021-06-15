import ProductMemory from "../model/ProductMemory";
import IProduct from "../../../domain/model/IProduct";
import Product from "../../../domain/model/Product";
import {Money} from "../../../domain/types/Money";

export default class ProductMemoryAdapter {
    static productMemoryToProduct(productMemory: ProductMemory): IProduct {
        return new Product(
            productMemory.id,
            productMemory.name,
            productMemory.description,
            new Money(productMemory.price, productMemory.currency),
            productMemory.categoryId,
            productMemory.detail
        );
    }
}

import ProductMemory from "../model/ProductMemory";
import IProduct from "../../../domain/model/IProduct";
import Product from "../../../domain/model/Product";

export default class ProductMemoryAdapter {
    static productMemoryToProduct(productMemory: ProductMemory): IProduct {
        return new Product(productMemory.id, productMemory.name, productMemory.description, productMemory.price, productMemory.categoryId, productMemory.detail);
    }
}

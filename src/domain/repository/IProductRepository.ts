import IProduct from "../models/IProduct";

export default interface IProductRepository {
    findOne(productId: number): IProduct;
}

import IProduct from "../model/IProduct";

export default interface IProductRepository {
    findOne(productId: number): IProduct;
}

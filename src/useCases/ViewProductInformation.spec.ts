import ViewProductInformation from "./ViewProductInformation";
import ProductMemoryRepository from "../infrastructure/dao/repository/ProductMemoryRepository";
import ProductMemory from "../infrastructure/dao/model/ProductMemory";
import {ProductDoesNotExistError} from "../infrastructure/error/ProductDoesNotExistError";

describe("ViewProductInformation", () => {
    let viewProductInformation: ViewProductInformation;
    let productRepository: ProductMemoryRepository;

    beforeEach(() => {
        productRepository = new ProductMemoryRepository();
        viewProductInformation = new ViewProductInformation(productRepository);
    });

    describe("execute", () => {
        it("should return the product when it exists", () => {
            productRepository.products = [
                new ProductMemory(1, "test product", "description", 100.0, "EUR", 1, []),
            ];

            const product = viewProductInformation.execute(1);

            expect(product.id).toStrictEqual(1);
            expect(product.name).toStrictEqual("test product");
            expect(product.description).toStrictEqual("description");
            expect(product.price.getValue()).toStrictEqual(100.0);
            expect(product.price.getCurrency()).toStrictEqual("EUR");
            expect(product.categoryId).toStrictEqual(1);
            expect(product.detail).toHaveLength(0);
        });

        it("should throw an error when the product does not exist", () => {
            productRepository.products = [];

            expect(() => viewProductInformation.execute(1)).toThrow(ProductDoesNotExistError);
        });
    });
});

import ViewProductInformationAsUser from "./ViewProductInformationAsUser";
import ProductMemoryRepository from "../infrastructure/dao/repository/ProductMemoryRepository";
import OrderMemoryRepository from "../infrastructure/dao/repository/OrderMemoryRepository";
import DateService from "../infrastructure/service/DateService";
import ConfigurationService from "../infrastructure/service/ConfigurationService";
import {ApplicationConfigurationInterface} from "../domain/configuration/ApplicationConfigurationInterface";
import ProductMemory from "../infrastructure/dao/model/ProductMemory";
import OrderMemory from "../infrastructure/dao/model/OrderMemory";
import {ProductDoesNotExistError} from "../infrastructure/error/ProductDoesNotExistError";

describe("ViewProductInformationAsUser", () => {
    let viewProductInformationAsUser: ViewProductInformationAsUser;

    let productRepository: ProductMemoryRepository;
    let orderRepository: OrderMemoryRepository;
    let dateService: DateService;
    let configurationService: ConfigurationService;

    let testConfiguration: ApplicationConfigurationInterface;

    let dateMinusMonthsMock: jest.SpyInstance;
    let dateMinusYearsMock: jest.SpyInstance;

    beforeEach(() => {
        testConfiguration = {
            firstDiscountValue: 0.10,
            firstDiscountLimit: 3,
            firstDiscountMonthsToSubtract: 6,
            secondDiscountValue: 0.05,
            secondDiscountLimit: 2,
            secondDiscountYearsToSubtract: 1,
        }

        productRepository = new ProductMemoryRepository();
        orderRepository = new OrderMemoryRepository();
        dateService = new DateService();
        configurationService = new ConfigurationService(testConfiguration);

        productRepository.products = [
            new ProductMemory(1, "test product", "description", 100.0, "EUR", 1, []),
            new ProductMemory(2, "test product 2", "description", 80.0, "EUR", 1, []),
        ]

        viewProductInformationAsUser = new ViewProductInformationAsUser(
            productRepository,
            orderRepository,
            dateService,
            configurationService,
        );

        dateMinusMonthsMock = jest
            .spyOn(dateService, "dateMinusMonths")
            .mockImplementation(() => new Date(2021, 5, 5));
        dateMinusYearsMock = jest
            .spyOn(dateService, "dateMinusYears")
            .mockImplementation(() => new Date(2020, 11, 5));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    })

    describe("execute", () => {
        it("should return a Product with no discount when no orders match the criterias", () => {
            orderRepository.orders = [
                new OrderMemory(1, 1, new Date(2021, 11, 5))
            ];

            const discountedProduct = viewProductInformationAsUser.execute(1, 1);

            expect(discountedProduct.price.getValue()).toStrictEqual(100.0);
            expect(discountedProduct.price.getCurrency()).toStrictEqual("EUR");
            expect(discountedProduct.id).toStrictEqual(1);
            expect(discountedProduct.name).toStrictEqual("test product");
            expect(discountedProduct.description).toStrictEqual("description");
            expect(discountedProduct.categoryId).toStrictEqual(1);

            expect(dateMinusMonthsMock).toHaveBeenCalledTimes(1);
            expect(dateMinusMonthsMock).toHaveBeenCalledWith(6);
            expect(dateMinusYearsMock).toHaveBeenCalledTimes(1)
            expect(dateMinusYearsMock).toHaveBeenCalledWith(1)
        });

        it("should return a Product with a 10% discount when the amount of orders match the criteria", () => {
            orderRepository.orders = [
                new OrderMemory(1, 1, new Date(2021, 11, 5)),
                new OrderMemory(1, 2, new Date(2021, 9, 14)),
                new OrderMemory(1, 3, new Date(2021, 7, 27)),
            ];

            const discountedProduct = viewProductInformationAsUser.execute(1, 1);

            expect(discountedProduct.price.getValue()).toStrictEqual(90.0);
            expect(discountedProduct.price.getCurrency()).toStrictEqual("EUR");
            expect(discountedProduct.id).toStrictEqual(1);
            expect(discountedProduct.name).toStrictEqual("test product");
            expect(discountedProduct.description).toStrictEqual("description");
            expect(discountedProduct.categoryId).toStrictEqual(1);

            expect(dateMinusMonthsMock).toHaveBeenCalledTimes(1);
            expect(dateMinusMonthsMock).toHaveBeenCalledWith(6);
            expect(dateMinusYearsMock).toHaveBeenCalledTimes(1)
            expect(dateMinusYearsMock).toHaveBeenCalledWith(1)
        });

        it("should return a Product with a 5% rise when the amount of orders match the criteria", () => {
            orderRepository.orders = [
                new OrderMemory(1, 1, new Date(2021, 9, 14)),
                new OrderMemory(1, 1, new Date(2021, 7, 27)),
            ];

            const discountedProduct = viewProductInformationAsUser.execute(1, 1);

            expect(discountedProduct.price.getValue()).toStrictEqual(105.0);
            expect(discountedProduct.price.getCurrency()).toStrictEqual("EUR");
            expect(discountedProduct.id).toStrictEqual(1);
            expect(discountedProduct.name).toStrictEqual("test product");
            expect(discountedProduct.description).toStrictEqual("description");
            expect(discountedProduct.categoryId).toStrictEqual(1);

            expect(dateMinusMonthsMock).toHaveBeenCalledTimes(1);
            expect(dateMinusMonthsMock).toHaveBeenCalledWith(6);
            expect(dateMinusYearsMock).toHaveBeenCalledTimes(1)
            expect(dateMinusYearsMock).toHaveBeenCalledWith(1)
        });

        it("should return a Product with a 5% overall discount when both criterias are met", () => {
            orderRepository.orders = [
                new OrderMemory(1, 2, new Date(2021, 11, 5)),
                new OrderMemory(1, 1, new Date(2021, 9, 14)),
                new OrderMemory(1, 1, new Date(2021, 7, 27)),
            ];

            const discountedProduct = viewProductInformationAsUser.execute(1, 1);

            expect(discountedProduct.price.getValue()).toStrictEqual(95.0);
            expect(discountedProduct.price.getCurrency()).toStrictEqual("EUR");
            expect(discountedProduct.id).toStrictEqual(1);
            expect(discountedProduct.name).toStrictEqual("test product");
            expect(discountedProduct.description).toStrictEqual("description");
            expect(discountedProduct.categoryId).toStrictEqual(1);

            expect(dateMinusMonthsMock).toHaveBeenCalledTimes(1);
            expect(dateMinusMonthsMock).toHaveBeenCalledWith(6);
            expect(dateMinusYearsMock).toHaveBeenCalledTimes(1)
            expect(dateMinusYearsMock).toHaveBeenCalledWith(1)
        });

        it("should return an exception when the product does not exist", () => {
            orderRepository.orders = [];

            expect(() => viewProductInformationAsUser.execute(10, 1))
                .toThrow(ProductDoesNotExistError);
        });
    });
});

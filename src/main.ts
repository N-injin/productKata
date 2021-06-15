import ViewProductInformation from "./useCases/ViewProductInformation";
import ViewProductInformationAsUser from "./useCases/ViewProductInformationAsUser";
import GetUserById from "./useCases/GetUserById";
import ProductController from "./infrastructure/controller/controller";
import UserMemoryRepository from "./infrastructure/dao/repository/UserMemoryRepository";
import OrderMemoryRepository from "./infrastructure/dao/repository/OrderMemoryRepository";
import ProductMemoryRepository from "./infrastructure/dao/repository/ProductMemoryRepository";
import DateService from "./infrastructure/service/DateService";
import ConfigurationService from "./infrastructure/service/ConfigurationService";
import CONFIGURATION from "./domain/configuration/Configuration";

const userRepository = new UserMemoryRepository();
const orderRepository = new OrderMemoryRepository();
const productRepository = new ProductMemoryRepository();

const dateService = new DateService();
const configurationService = new ConfigurationService(CONFIGURATION);


const viewProductInformation = new ViewProductInformation(productRepository);
const viewProductInformationAsUser = new ViewProductInformationAsUser(
    productRepository,
    orderRepository,
    dateService,
    configurationService
);
const getUserById = new GetUserById(userRepository);

const controller = new ProductController(viewProductInformation, viewProductInformationAsUser, getUserById);

controller.productDetail(1);
controller.productDetail(1, 1);

controller.productDetail(2);
controller.productDetail(2, 1);

controller.productDetail(5);
controller.productDetail(1, 65);
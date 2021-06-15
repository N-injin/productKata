import ViewProductInformation from "./src/useCases/ViewProductInformation";
import ViewProductInformationAsUser from "./src/useCases/ViewProductInformationAsUser";
import GetUserById from "./src/useCases/GetUserById";
import ProductController from "./src/infrastructure/controller/controller";
import UserMemoryRepository from "./src/infrastructure/dao/repository/UserMemoryRepository";
import OrderMemoryRepository from "./src/infrastructure/dao/repository/OrderMemoryRepository";
import ProductMemoryRepository from "./src/infrastructure/dao/repository/ProductMemoryRepository";
import DateService from "./src/infrastructure/services/DateService";

const userRepository = new UserMemoryRepository();
const orderRepository = new OrderMemoryRepository();
const productRepository = new ProductMemoryRepository();
const dateService = new DateService();

const viewProductInformation = new ViewProductInformation(productRepository);
const viewProductInformationAsUser = new ViewProductInformationAsUser(productRepository, orderRepository, dateService);
const getUserById = new GetUserById(userRepository);

const controller = new ProductController(viewProductInformation, viewProductInformationAsUser, getUserById);

controller.productDetail(1, 1);

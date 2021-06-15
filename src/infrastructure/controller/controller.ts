import ViewProductInformation from "../../useCases/ViewProductInformation";
import ViewProductInformationAsUser from "../../useCases/ViewProductInformationAsUser";
import IProduct from "../../domain/model/IProduct";
import GetUserById from "../../useCases/GetUserById";
import IUser from "../../domain/model/IUser";

export default class ProductController {
    constructor(
        private viewProductInformation: ViewProductInformation,
        private viewProductInformationAsUser: ViewProductInformationAsUser,
        private getUserById: GetUserById,
    ) {
    }

    private displayProduct(product: IProduct): void {
        console.log(`${product.name}`);
        console.log(`${product.description}`);
        console.log(`${product.categoryId}`);
        console.log(`Price : ${product.price}`);
        console.log(`Name | value`);
        product.detail.forEach(detail => {
            console.log(`${detail.name} | ${detail.value}`);
        });
    }

    private displayProductWithUser(product: IProduct, user: IUser): void {
        console.log(`${user.name}`);
        console.log(`${product.name}`);
        console.log(`${product.description}`);
        console.log(`${product.categoryId}`);
        console.log(`Price : ${product.price}`);
        console.log(`Name | value`);
        product.detail.forEach(detail => {
            console.log(`${detail.name} | ${detail.value}`);
        });
    }

    public productDetail(productId: number, userId?: number): void {
        try {
            let productToDisplay: IProduct;
            let userToDisplay: IUser;

            if (userId !== undefined) {
                productToDisplay = this.viewProductInformationAsUser.execute(productId, userId);
                userToDisplay = this.getUserById.execute(userId);

                this.displayProductWithUser(productToDisplay, userToDisplay);
            } else {
                productToDisplay = this.viewProductInformation.execute(productId);

                this.displayProduct(productToDisplay);
            }
        } catch (e) {
            console.log('Erreur lors de la requête : ', e.message);
        }
    }
}

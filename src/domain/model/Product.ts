import IProduct from "./IProduct";
import IOrder from "./IOrder";
import Detail from "./Detail";

export default class Product implements IProduct {
    id: number;
    name: string;
    description: string;
    price:number;
    categoryId:number;
    detail:Detail[];

    constructor(id: number, name: string, description: string, price:number, categoryId:number, detail:Detail[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.detail = detail;
    }

    evaluateDiscount(orderLastSixMonths: IOrder[], orderLastYear: IOrder[]): IProduct {
        let discount = 0;
        if (orderLastSixMonths.length >= 3 ) {
            discount -= 0.10*this.price;
        } 
        if (orderLastYear.length >= 5) {
            discount += 0.05*this.price;
        }
        
        return new Product(this.id, this.name, this.description, this.price+discount, this.categoryId, this.detail);
    }
}
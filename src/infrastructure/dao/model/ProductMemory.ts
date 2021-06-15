import Detail from "src/domain/model/Detail";

export default class ProductMemory {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    categoryId: number;
    detail: Detail[];

    constructor(
        id: number,
        name: string,
        description: string,
        price: number,
        currency: string,
        categoryId: number,
        detail: Detail[]
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.currency = currency;
        this.categoryId = categoryId;
        this.detail = detail;
    }
}

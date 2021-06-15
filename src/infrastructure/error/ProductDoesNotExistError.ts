export class ProductDoesNotExistError extends Error {
    name: string;

    constructor(message?: string) {
        super(message);
        this.name = ProductDoesNotExistError.name;
    }
}

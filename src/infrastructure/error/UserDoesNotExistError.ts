export class UserDoesNotExistError extends Error {
    name: string;

    constructor(message?: string) {
        super(message);
        this.name = UserDoesNotExistError.name;
    }
}

export default class UserMemory {
    id: number;

    name: string;

    login: string;

    constructor(id: number, name: string, login: string) {
        this.id = id;
        this.name = name;
        this.login = login;
    }
}
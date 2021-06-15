import IUserRepository from "../../../domain/repository/IUserRepository";
import IUser from "../../../domain/model/IUser";
import UserMemory from "../model/UserMemory";
import {UserDoesNotExistError} from "../../error/UserDoesNotExistError";
import UserMemoryAdapter from "../adapter/UserMemoryAdapter";

export default class UserMemoryRepository implements IUserRepository {
    users: UserMemory[];

    constructor() {
        this.users = [
            new UserMemory(1, "Jean paul", "jp2002"),
        ];
    }

    findOne(userId: number): IUser {
        const index = this.users.findIndex(user => user.id === userId);

        if (index === -1) {
            throw new UserDoesNotExistError(`User of id ${userId} does not exist`);
        }

        return UserMemoryAdapter.userMemoryToUser(this.users[index]);
    }
}

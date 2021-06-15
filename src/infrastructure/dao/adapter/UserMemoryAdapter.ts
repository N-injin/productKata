import UserMemory from "../model/UserMemory";
import IUser from "../../../domain/model/IUser";
import User from "../../../domain/model/User";

export default class UserMemoryAdapter {
    static userMemoryToUser(userMemory: UserMemory): IUser {
        return new User(userMemory.id, userMemory.name, userMemory.login);
    }
}
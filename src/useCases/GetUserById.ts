import IUserRepository from "../domain/repository/IUserRepository";
import IUser from "../domain/model/IUser";

export default class GetUserById {
    constructor(private userRepository: IUserRepository) {
    }

    execute(userId: number): IUser {
        return this.userRepository.findOne(userId);
    }
}
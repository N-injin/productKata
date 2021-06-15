import IUser from "../models/IUser";

export default interface IUserRepository {
    findOne(userId: number): IUser;
}

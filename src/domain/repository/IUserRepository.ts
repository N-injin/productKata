import IUser from "../model/IUser";

export default interface IUserRepository {
    findOne(userId: number): IUser;
}

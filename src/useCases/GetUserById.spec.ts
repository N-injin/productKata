import GetUserById from "./GetUserById";
import UserMemoryRepository from "../infrastructure/dao/repository/UserMemoryRepository";
import UserMemory from "../infrastructure/dao/model/UserMemory";
import {UserDoesNotExistError} from "../infrastructure/error/UserDoesNotExistError";

describe("GetUserByid", () => {
    let getUserById: GetUserById;
    let userRepository: UserMemoryRepository;

    beforeEach(() => {
        userRepository = new UserMemoryRepository();
        getUserById = new GetUserById(userRepository);
    });

    describe("execute", () => {
        it("should return the user when it exists", () => {
            userRepository.users = [
                new UserMemory(1, "test user", "epicLogin42"),
            ];

            const user = getUserById.execute(1);

            expect(user.id).toStrictEqual(1);
            expect(user.name).toStrictEqual("test user");
            expect(user.login).toStrictEqual("epicLogin42");
        });

        it("should throw an error when the user does not exist", () => {
            userRepository.users = [];

            expect(() => getUserById.execute(5)).toThrow(UserDoesNotExistError);
        });
    });
});

import User from "../entities/User";

export default class AuthService {
    async login(email: string, password: string): Promise<User> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (email !== "gmail.com" || password !== "123456") {
            throw new Error("Credenciais inválidas");
        }
        return { uID: "123", userName: "user123" };
    }
}
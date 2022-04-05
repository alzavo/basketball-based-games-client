import { API_BASE_URL } from "@/configuration";
import { IFetchResponse } from "@/domain/IFetchResponse";
import { IJwtResponse } from "@/domain/IJwtResponse";
import { ILogin } from "@/domain/ILogin";
import axios from "axios";

export class AccountService {
    private urlEndpoints = {
        LOGIN: "Login",
        REGISTER: "Register",
    };

    async logIn(login: ILogin): Promise<IFetchResponse<IJwtResponse>> {
        return await this.createQuery(this.urlEndpoints.LOGIN, login);
    }

    async register(register: ILogin): Promise<IFetchResponse<IJwtResponse>> {
        return await this.createQuery(this.urlEndpoints.REGISTER, register);
    }

    private async createQuery(
        urlEndpoint: string,
        dto: ILogin
    ): Promise<IFetchResponse<IJwtResponse>> {
        const dataStr = JSON.stringify(dto);
        try {
            const response = await axios.post(
                API_BASE_URL + "Account/" + urlEndpoint,
                dataStr,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data as IJwtResponse,
                };
            } else {
                return {
                    statusCode: response.status,
                };
            }
        } catch (error) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(error),
            };
        }
    }
}

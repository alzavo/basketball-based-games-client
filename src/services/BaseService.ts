import { API_BASE_URL } from "@/configuration";
import { IFetchResponse } from "@/domain/IFetchResponse";
import { STORE } from "@/store";
import axios from "axios";

export class BaseService {
    private apiEndpointUrl: string;
    private authorizationHeader =
        STORE.state.user.token.length !== 0
            ? "Bearer " + STORE.state.user.token
            : "";

    constructor(apiEndpointUrl: string) {
        this.apiEndpointUrl = API_BASE_URL + apiEndpointUrl;
    }

    async getAll<TEntity>(
        urlAction?: string,
        urlParameter?: string
    ): Promise<IFetchResponse<TEntity[]>> {
        let url = this.apiEndpointUrl;
        if (urlAction) {
            url += "/" + urlAction;
        }
        if (urlParameter) {
            url += "/" + urlParameter;
        }

        try {
            const response = await axios({
                method: "GET",
                url: url,
                headers: {
                    "Content-type": "application/json",
                    Authorization: this.authorizationHeader,
                },
            });

            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity[],
                };
            } else {
                return {
                    statusCode: response.status,
                };
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async getOne<TEntity>(id: string): Promise<IFetchResponse<TEntity>> {
        try {
            const response = await axios({
                method: "GET",
                url: this.apiEndpointUrl + "/" + id,
                headers: {
                    "Content-type": "application/json",
                    Authorization: this.authorizationHeader,
                },
            });

            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
                };
            } else {
                return {
                    statusCode: response.status,
                    errorMessage:
                        "An Error occures during the CREATE action. See the response status code.",
                };
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async update<TEntity>(
        id: string,
        dto: TEntity
    ): Promise<IFetchResponse<TEntity>> {
        try {
            const response = await axios({
                method: "PUT",
                url: this.apiEndpointUrl + "/" + id,
                headers: {
                    "Content-type": "application/json",
                    Authorization: this.authorizationHeader,
                },
                data: dto,
            });

            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
                };
            } else {
                return {
                    statusCode: response.status,
                    errorMessage:
                        "An Error occures during the CREATE action. See the response status code.",
                };
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async create<TEntity>(
        dto: TEntity,
        urlAction = "Post",
        urlParameter?: string
    ): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        if (urlAction) {
            url += "/" + urlAction;
        }
        if (urlParameter) {
            url += "/" + urlParameter;
        }

        try {
            const response = await axios({
                method: "POST",
                url: url,
                headers: {
                    "Content-type": "application/json",
                    Authorization: this.authorizationHeader,
                },
                data: dto,
            });

            if (response.status === 200) {
                return {
                    statusCode: response.status,
                };
            } else {
                return {
                    statusCode: response.status,
                    errorMessage:
                        "An Error occures during the CREATE action. See the response status code.",
                };
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async delete(
        id: string,
        urlAction = "Delete",
        urlParameter?: string
    ): Promise<IFetchResponse<unknown>> {
        let url = this.apiEndpointUrl;
        if (urlAction) {
            url += "/" + urlAction;
        }
        if (urlParameter) {
            url += "/" + urlParameter;
        }

        try {
            const response = await axios.delete(url + "/" + id, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: this.authorizationHeader,
                },
            });

            if (response.status === 204) {
                return {
                    statusCode: response.status,
                };
            } else {
                return {
                    statusCode: response.status,
                    errorMessage:
                        "An Error occures during the DELETE action. See the response status code.",
                };
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }
}

import { APIRequestContext, expect } from "@playwright/test";
import { ApiRequestPayloads } from "../test-data/apiPayloads/ApiRequestPayloads";

export class ApiUtils {

    request: APIRequestContext;
    registerUserURL: string;
    loginURL: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.registerUserURL = "https://api.practicesoftwaretesting.com/users/register";
        this.loginURL = 'https://api.practicesoftwaretesting.com/users/login';
    }


    async registerUser(email: string, password: string) {
        const registerRequestPayload = ApiRequestPayloads.returnRegisterRequestPayload(email, password)
        const response = await this.request.post(this.registerUserURL, {
            data: registerRequestPayload
        });
        return response;
    }


    async loginUser(email: string, password: string) {
        const loginPayloadRequest = ApiRequestPayloads.returnLoginRequestPayload(email, password);
        let loginResponse = await this.request.post(this.loginURL, {
            data: loginPayloadRequest
        })
        if (!loginResponse.ok()) {
            const registerResponse=await this.registerUser(email, password);
            expect( registerResponse.ok()).toBeTruthy();
            loginResponse = await this.request.post(this.loginURL, {data: loginPayloadRequest})
        }
        expect(loginResponse.ok()).toBeTruthy();
        const loginJson = await loginResponse.json();
        const token = loginJson.access_token;
        //console.log(token);
        return token;
    }




}






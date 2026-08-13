import { APIRequestContext } from "@playwright/test";

export class ApiUtils {

    request: APIRequestContext;
    registerUserURL:string;
    constructor(request: APIRequestContext){
        this.request=request;
        this.registerUserURL= "https://api.practicesoftwaretesting.com/users/register";
    }
    

    async registerUser( registerRequestBody: Object) {

        const response = await this.request.post(this.registerUserURL, {
            data: registerRequestBody
        });

        return response;
    }

}






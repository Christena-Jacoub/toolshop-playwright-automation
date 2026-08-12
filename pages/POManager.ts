import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
export class POMAnager{

    page:Page;
    loginPage:LoginPage;
    constructor(page:Page){
        this.page=page;
        this.loginPage= new LoginPage(this.page);

    }
    getLoginPage(){
        return this.loginPage;
    }


}
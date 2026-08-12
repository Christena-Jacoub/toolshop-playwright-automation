import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { MainMenu } from "./MainMenu";
export class POMAnager{

    page:Page;
    loginPage:LoginPage;
    mainMenu:MainMenu;
    constructor(page:Page){
        this.page=page;
        this.loginPage= new LoginPage(this.page);
        this.mainMenu=new MainMenu(this.page);

    }
    getLoginPage(){
        return this.loginPage;
    }

    getMainMenu(){
        return this.mainMenu;
    }


}
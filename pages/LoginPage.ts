import {Locator, Page} from "@playwright/test"

export class LoginPage{

    page:Page;
    emailTB:Locator;
    passwordTB: Locator;
    loginBtn: Locator;
    pageTitleTxt: Locator;
    constructor (page:Page){
        this.page=page;
        this.emailTB= page.getByLabel( "Email address *");
        this.passwordTB=page.getByLabel("Password *");
        this.loginBtn=page.getByRole("button", {name: "Login"});
        this.pageTitleTxt =page.getByText("My account").last();
        
    }


    async userLogin(username:string, password:string){
        await this.emailTB.fill(username);
        await this.passwordTB.fill(password);
        await this.loginBtn.click();
    }

    errorMsgLocator(msg:string):Locator{
        return this.page.getByText(msg);
    }

}
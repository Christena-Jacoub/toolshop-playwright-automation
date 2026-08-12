import { Locator, Page } from "@playwright/test";

export class MainMenu{
    page:Page;
    menuLocator:Locator;
    signoutLocator:Locator;
    constructor(page: Page){
        this.page=page;
        this.menuLocator= this.page.locator("#menu");
        this.signoutLocator=this.page.getByText("Sign out");

    }

    async Logout(){
        await this.menuLocator.click();
        await this.signoutLocator.click();
    }
}
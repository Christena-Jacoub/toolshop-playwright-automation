import { Locator, Page } from "@playwright/test";

export class MainMenu{
    page:Page;
    menuLocator:Locator;
    signoutLocator:Locator;
    cartIcon:Locator;
    homeIcon:Locator;
    constructor(page: Page){
        this.page=page;
        this.menuLocator= this.page.locator("#menu");
        this.signoutLocator=this.page.getByText("Sign out");
        this.cartIcon=this.page.getByRole('link', {name: 'cart'});
        this.homeIcon=this.page.getByRole("link", {name:"Home"});

    }

    async Logout(){
        await this.menuLocator.click();
        await this.signoutLocator.click();
    }

    async clickCartIcon(){
        await this.cartIcon.click({ force: true });
    }

    async clickHomeIcon(){
        await this.homeIcon.click();
    }
}
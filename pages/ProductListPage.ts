import { Locator, Page } from "@playwright/test";

export class ProductListPage{

    page:Page;
    products:Locator;
    constructor(page:Page){
        this.page=page;
        this.products=this.page.locator("a.card");
    }

    async clickSpecificProduct(productName:string){
        await this.products.filter({has: this.page.getByText(productName, {exact:true})}).click();
    }
    


}
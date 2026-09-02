import { Locator, Page } from "@playwright/test";
import { MainMenu } from "./MainMenu";
import { ProductListPage } from "./ProductListPage";
import { ProductDetailsPage } from "./ProductDetailsPage";

export class CartPage{

    page:Page
    updateItemQuantitySuccessfullMsg: Locator
    totalPriceAmount:Locator
    proceedToCheckoutBtn:Locator
    signInTab:Locator
    noItemsInCartMsg:Locator
    mainMenu:MainMenu;
    productListPage:ProductListPage;
    productDetailsPage:ProductDetailsPage;
    constructor(page:Page){
        this.page=page;
        this.mainMenu=new MainMenu(this.page);
        this.productListPage=new ProductListPage(this.page);
        this.productDetailsPage=new ProductDetailsPage(this.page);
        this.updateItemQuantitySuccessfullMsg=this.page.getByRole("alert", {name: "Product quantity updated"})
        this.totalPriceAmount=this.page.locator('[data-test="cart-total"]');
        this.proceedToCheckoutBtn=this.page.getByRole("button",{name:"Proceed to checkout"});
        this.signInTab=this.page.locator("div#signin-tab");
        this.noItemsInCartMsg=this.page.getByText("The cart is empty. Nothing to display.")
    }

    getProductNameLocator(productName:string):Locator{
        return this.page.getByText(productName, {exact:true})
    }

    getProductQuantityLocator(productName:string):Locator{
        // const row=  this.page.locator("tr").filter({hasText:productName});
        //return row.locator("td").nth(1)
        return this.page.getByLabel(`Quantity for ${productName}`);
    }
    getProductPriceLocator(productName:string):Locator{
        const row=  this.page.locator("tr").filter({hasText:productName});
        return row.locator("td").nth(2)
    }

    getProductTotalPriceLocator(productName:string):Locator{
        const row=  this.page.locator("tr").filter({hasText:productName});
        return row.locator("td").nth(3)
    }

    getRemoveBtnForProduct(productName:string):Locator{
        const row=  this.page.locator("tr").filter({hasText:productName});
        return row.locator("td").nth(4).locator("a");
    }

    async updateProductQuantity(productName:string, quantity:number){
       await this.getProductQuantityLocator(productName).fill(quantity.toString());
    }

    async addProductToCart(productName:string, productQuantity:number){
         await this.mainMenu.clickHomeIcon();
        await this.productListPage.clickSpecificProduct(productName);
        await this.productDetailsPage.addProductToCart(productQuantity);
    }


}
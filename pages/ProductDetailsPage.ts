import { Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
    page: Page;
    productNameTxt: Locator;
    increaseQuantityBtn: Locator;
    addToCartBtn: Locator;
    productPriceTxt: Locator;
    addProductToCartSuccessfulMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productNameTxt = this.page.locator("[data-test='product-name']");
        this.increaseQuantityBtn = this.page.locator("#btn-increase-quantity");
        this.addToCartBtn = this.page.getByRole("button", { name: "Add to cart" });
        this.productPriceTxt = this.page.locator("[data-test='unit-price']");
        this.addProductToCartSuccessfulMsg = this.page.getByText("Product added to shopping cart.", { exact: true });
    }


    async addProductToCart(quantity: number){
         for (let index = 1; index < quantity; index++) {
            await this.increaseQuantityBtn.click();
        }
        await this.addToCartBtn.click();
    }


}
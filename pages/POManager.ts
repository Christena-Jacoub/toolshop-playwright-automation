import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { MainMenu } from "./MainMenu";
import { ProductListPage } from "./ProductListPage";
import { ProductDetailsPage } from "./ProductDetailsPage";
import { CartPage } from "./CartPage";
export class POMAnager{

    page:Page;
    loginPage:LoginPage;
    mainMenu:MainMenu;
    productListPage:ProductListPage
    productDetailsPage:ProductDetailsPage
    cartPage:CartPage
    constructor(page:Page){
        this.page=page;
        this.loginPage= new LoginPage(this.page);
        this.mainMenu=new MainMenu(this.page);
        this.productListPage=new ProductListPage(this.page);
        this.productDetailsPage=new ProductDetailsPage(this.page);
        this.cartPage=new CartPage(this.page);
    }
    getLoginPage():LoginPage{
        return this.loginPage;
    }

    getMainMenu():MainMenu{
        return this.mainMenu;
    }

    getProductListPage():ProductListPage{
        return this.productListPage;
    }

    getProductDetailsPage():ProductDetailsPage{
        return this.productDetailsPage;
    }

    getCartPage():CartPage{
        return this.cartPage;
    }

}
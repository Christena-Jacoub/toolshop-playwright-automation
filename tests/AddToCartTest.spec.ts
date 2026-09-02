import { test, expect } from "../Fixtures/testBase";
import 'dotenv/config';
import productList from "../test-data/addToCartTestData.json";
import { ProductListPage } from "../pages/ProductListPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
import { MainMenu } from "../pages/MainMenu";
import { CartPage } from "../pages/CartPage";
import { ApiUtils } from "../utils/ApiUtils";

let token = "";
let productListPage: ProductListPage;
let productDetailsPage: ProductDetailsPage;
let mainMenu: MainMenu;
let cartPage: CartPage;

const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });


test.beforeAll(async ({ request }) => {
    const apiUtils = new ApiUtils(request);

    token = await apiUtils.loginUser(process.env.EMAIL!, process.env.PASSWORD!);
});

test.beforeEach(async ({ poManager }) => {
    productListPage = poManager.getProductListPage();
    productDetailsPage = poManager.getProductDetailsPage();
    mainMenu = poManager.getMainMenu();
    cartPage = poManager.getCartPage();
});

for (const product of productList) {
    test(`SSQA-169, 171, 182 Verify guest user can add product ${product.productName} to cart from PDP but can't proceed to checkout without login`, async ({ page }) => {

        await page.goto('');
        await productListPage.clickSpecificProduct(product.productName);

        // Validate product name and price in the product details page
        await expect(productDetailsPage.productNameTxt).toHaveText(product.productName);
        await expect(productDetailsPage.productPriceTxt).toHaveText(product.price.toString());

        // add the product to cart and validate the successful message
        await productDetailsPage.addProductToCart(product.quantity);
        await expect(productDetailsPage.addProductToCartSuccessfulMsg).toBeVisible();

        //Check items and details in the cart
        await mainMenu.clickCartIcon();
        await expect(page).toHaveURL("/checkout");
        await expect(cartPage.getProductNameLocator(product.productName)).toHaveText(product.productName);
        await expect(cartPage.getProductQuantityLocator(product.productName)).toHaveValue(product.quantity.toString());
        await expect(cartPage.getProductPriceLocator(product.productName)).toHaveText(`$${product.price.toString()}`);
        await expect(cartPage.getProductTotalPriceLocator(product.productName)).toHaveText(formatCurrency(product.price * product.quantity));

        // Click proceed to checkout, and verify login form is displayed
        await cartPage.proceedToCheckoutBtn.click();
        await expect(cartPage.signInTab).toBeVisible();


    })
}


test('SSQA-177, 170, 181, 179 Authorized user can add multiple products to cart, update quantity from cart and validate the total price', async ({ page }) => {
    await page.addInitScript(accessToken => {
            window.localStorage.setItem("auth-token", accessToken)
        }, token)
    await page.goto('');
    let totalPrice = 0
    for (const product of productList) {
        // Add items to cart 
        // await mainMenu.clickHomeIcon();
        // await productListPage.clickSpecificProduct(product.productName);
        // await productDetailsPage.addProductToCart(product.quantity);
        await cartPage.addProductToCart(product.productName, product.quantity);
        await expect(productDetailsPage.addProductToCartSuccessfulMsg).toBeVisible();
        await mainMenu.clickCartIcon();

        await expect(page).toHaveURL("/checkout");
        await page.reload();

        // update product quantity and check all product details in the cart
        await cartPage.updateProductQuantity(product.productName, product.newQuantity);
        await cartPage.getProductNameLocator(product.productName).click();
        await expect(cartPage.updateItemQuantitySuccessfullMsg).toBeVisible();
        await expect(cartPage.getProductQuantityLocator(product.productName)).toHaveValue(product.newQuantity.toString());
        await expect(cartPage.getProductPriceLocator(product.productName)).toHaveText(formatCurrency(product.price));
  
        await expect(cartPage.getProductTotalPriceLocator(product.productName)).toHaveText(formatCurrency(product.price * product.newQuantity));
        totalPrice += product.price * product.newQuantity;
        

    }

    await expect(cartPage.totalPriceAmount).toHaveText(formatCurrency(totalPrice));
});


test('Delete all items from cart', async({page})=>{
     await page.goto('');
    let expectedTotalPrice = 0
    // add items to cart and validate the total price
    for (const product of productList) {
        await cartPage.addProductToCart(product.productName, product.quantity);
         await expect(productDetailsPage.addProductToCartSuccessfulMsg).toBeVisible();
       
        expectedTotalPrice += product.price * product.quantity;
    }
    await mainMenu.clickCartIcon();
    await expect(cartPage.totalPriceAmount).toHaveText(formatCurrency(expectedTotalPrice));

    // remove all product and validate the total price update and no item in cart if no available products in cart
    for(const product of productList){
        const totalPriceOfProduct= product.price*product.quantity
        
        await cartPage.getRemoveBtnForProduct(product.productName).click();
        expectedTotalPrice -= totalPriceOfProduct;
        console.log(`expectedTotalPrice: ${formatCurrency(expectedTotalPrice)}`);
        if(expectedTotalPrice>0)
            await expect(cartPage.totalPriceAmount).toHaveText(formatCurrency(expectedTotalPrice));
        else
            await expect(cartPage.noItemsInCartMsg).toBeVisible();

    }



})



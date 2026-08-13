import { test, expect } from "../Fixtures/testBase";
import 'dotenv/config'
import { LoginPage } from "../pages/LoginPage";
import loginTestDataSet from "../test-data/loginTestData.json";
import { MainMenu } from "../pages/MainMenu";
import { ApiUtils } from "../utils/ApiUtils";



let loginPage: LoginPage;
let mainMenu: MainMenu;
let email: string;
let password: string;

test.beforeAll(async ({ request }) => {
    email = `qa_${Date.now()}@test.com`;
    password = process.env.PASSWORD!;

    const registerRequestPayload = { "first_name": "Chris", "last_name": "Jac", "dob": "1990-12-12", "phone": "1222121", "email": email, "password": password, "address": { "street": "Schmidt Pine", "city": "West Elinor", "state": "Pennsylvania", "country": "US", "postal_code": "11122" } };
    const apiUtils = new ApiUtils(request);
    let response = await apiUtils.registerUser(registerRequestPayload);
    expect(response.ok()).toBeTruthy();

})


test.beforeEach(async ({ poManager }) => {
    loginPage = poManager.getLoginPage();
    mainMenu = poManager.getMainMenu();

})


test('Login with Valid credentials', async ({ page }) => {
    await page.goto("auth/login");
    await loginPage.userLogin(email, password);

    await expect(loginPage.pageTitleTxt).toBeVisible();
})

for (const loginTestData of loginTestDataSet) {
    test(`Login with ${loginTestData.testName}`, async ({ page }) => {
        await page.goto("auth/login");
        await loginPage.userLogin(loginTestData.email, loginTestData.password);
        await expect(loginPage.errorMsgLocator(loginTestData.errorMsg!)).toBeVisible();
    })
}

test.describe('Authentication session tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("auth/login");
        await loginPage.userLogin(email, password);
        await expect(loginPage.pageTitleTxt).toBeVisible();
    });


    test('SSQA- 131 Session persist after reload', async ({ page }) => {

        await page.reload();
        expect(page.url()).toContain("account");
    });

    test('SSQA-183 Unauthorized Protected Page', async ({ page }) => {

        //sign out
        await mainMenu.Logout();
        // navigate to the account and check the site should be navigated to login
        await page.goto("account/profile");
        await expect(page).toHaveURL(/auth\/login/);
    });
})







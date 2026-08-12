import { test, expect } from "../Fixtures/testBase";
import 'dotenv/config'
import { LoginPage } from "../pages/LoginPage";
import loginTestDataSet from "../test-data/loginTestData.json";
import { MainMenu } from "../pages/MainMenu";



let loginPage: LoginPage;
let mainMenu: MainMenu;

test.beforeEach(async ({ poManager }) => {
    loginPage = poManager.getLoginPage();
    mainMenu = poManager.getMainMenu();

})


for (const loginTestData of loginTestDataSet) {
    test(`Login with ${loginTestData.testName}`, async ({ page }) => {
        console.log(process.env.BASE_URL! + "auth/login");
        await page.goto(process.env.BASE_URL! + "auth/login");
        await loginPage.userLogin(loginTestData.email, loginTestData.password);
        if (loginTestData.expectedResult === "success")
            await expect(loginPage.pageTitleTxt).toBeVisible();
        else {
            await expect(loginPage.errorMsgLocator(loginTestData.errorMsg!)).toBeVisible();
        }
    })
}

test.describe('Authentication session tests', () => {
    test.beforeEach(async ({page}) => {
        const validUser = loginTestDataSet.find(data => data.testName === "Valid Credentials");

        if (!validUser) throw new Error("Valid user test data not found");

        await page.goto(process.env.BASE_URL! + "auth/login");
        await loginPage.userLogin(validUser.email, validUser.password);
        await expect(loginPage.pageTitleTxt).toBeVisible();
    });


    test.only('SSQA- 131 Session persist after reload', async ({ page }) => {

        await page.reload();
        expect(page.url()).toContain("account");
    });

    test.only('SSQA-183 Unauthorized Protected Page', async ({ page }) => {

        //sign out
        await mainMenu.Logout();
        // navigate to the account and check the site should be navigated to login
        await page.goto(process.env.BASE_URL! + "account/profile");
        await expect(page).toHaveURL(/auth\/login/);
    });
})







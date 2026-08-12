import {test, expect} from "../Fixtures/testBase";
import 'dotenv/config'
import { LoginPage} from "../pages/LoginPage";
import loginTestData from "../test-data/loginTestData.json";



let loginPage:LoginPage;

test.beforeEach(async({poManager})=>{
    loginPage=poManager.getLoginPage();
    
})


test(`Login with ${loginTestData.testName}`, async({page})=>{
    console.log(process.env.BASE_URL!+"/auth/login");
    await page.goto(process.env.BASE_URL!+"/auth/login");
    await loginPage.userLogin(loginTestData.email, loginTestData.password);
    if(loginTestData.expectedResult==="success")
        await expect(loginPage.pageTitleTxt).toBeVisible();
})


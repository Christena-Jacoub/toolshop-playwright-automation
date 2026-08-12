import{test as base, expect, request} from "@playwright/test";
import { POMAnager} from "../pages/POManager";

type MyFixture={
    poManager:POMAnager;
};

export const test=base.extend<MyFixture>({
    poManager: async({page}, use)=>{
        const poManager= new POMAnager(page);
        await use(poManager)
    }
});

export{expect, request};

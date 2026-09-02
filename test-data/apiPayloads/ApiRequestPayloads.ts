export class ApiRequestPayloads {
    
   static returnRegisterRequestPayload(email: string, password: string) {
        return { "first_name": 
            "Chris", "last_name": 
            "Jac", "dob": "1990-12-12", 
            "phone": "1222121", 
            "email": email, 
            "password": password, 
            "address": { 
                "street": "Schmidt Pine", 
                "city": "West Elinor", 
                "state": "Pennsylvania", 
                "country": "US", 
                "postal_code": "11122" 
            } };
    }


    static returnLoginRequestPayload(email:string, password:string){
        return {"email": email,"password":password}
    }

}
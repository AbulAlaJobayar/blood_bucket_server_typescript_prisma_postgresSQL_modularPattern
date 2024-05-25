import {z} from 'zod'
const loginSchema=z.object({
        email:z.string({
                required_error: "Email is required",
                invalid_type_error: "Email must be a string",
               
        }).email(),
        password:z.string({
                required_error: "password is required",
                invalid_type_error: "password must be a string", 
        })
})

export const authValidation={
        loginSchema  
}
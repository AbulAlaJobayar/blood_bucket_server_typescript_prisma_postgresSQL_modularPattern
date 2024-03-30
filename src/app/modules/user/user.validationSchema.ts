import {z} from 'zod'

const createUserSchemaValidation=z.object({
        name: z.string({
                required_error: "Name field is required",
                invalid_type_error: "That's not a string !",
        }),
        email: z.string({
                required_error: "Email must be a valid email address.",
                invalid_type_error: "That's not a Email!",
                
        }).email(),
        password: z.string({
                required_error: "password field is required",
                invalid_type_error: "That's not a Email!",
                
        }),
        bloodType: z.string({
                required_error: "bloodType field is required",
                invalid_type_error: "That's not a Email!",
                
        }),
        location: z.string({
                required_error: "location field is required",
                invalid_type_error: "That's not a Email!",
                
        }),
        age: z.number({
                required_error: "age field is required",
                invalid_type_error: "That's not a Email!",
                
        }),
        bio: z.string({
                required_error: "bio field is required",
                invalid_type_error: "That's not a Email!",
                
        }),
        lastDonationDate: z.string({
                required_error: "last Donation Date field is required",
                invalid_type_error: "That's not a Email!",
                
        }),
})

export  const userValidateSchema={
        createUserSchemaValidation
}



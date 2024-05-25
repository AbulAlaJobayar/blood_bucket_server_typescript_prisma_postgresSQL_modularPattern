import { z } from "zod";

const createUserSchemaValidation = z.object({
  name: z.string({
    required_error: "Name field is required",
    invalid_type_error: "That's not a string !",
  }),
  email: z
    .string({
      required_error: "Email must be a valid email address.",
      invalid_type_error: "That's not a Email!",
    })
    .email(),
  password: z.string({
    required_error: "password field is required",
    invalid_type_error: "That's not a password!",
  }),
  bloodType: z.string({
    required_error: "bloodType field is required",
    invalid_type_error: "That's not a blood type!",
  }),
  location: z.string({
    required_error: "location field is required",
    invalid_type_error: "That's not a location!",
  }),
  age: z.number({
    required_error: "age field is required",
    invalid_type_error: "That's not a age!",
  }),
  bio: z.string({
    required_error: "bio field is required",
    invalid_type_error: "That's not a bio!",
  }),
  donateblood: z.string({
    required_error: "donatebloo field is required",
    invalid_type_error: "That's not a donateblood!",
  }),
  lastDonationDate: z.string({
    required_error: "last Donation Date field is required",
    invalid_type_error: "That's not a lastDonationDate!",
  }),
});

export const userValidateSchema = {
  createUserSchemaValidation,
};

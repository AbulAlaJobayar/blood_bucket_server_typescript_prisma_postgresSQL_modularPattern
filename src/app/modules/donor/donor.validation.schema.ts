import { z } from "zod";
const requestDonorForBlood = z.object({
  donorId: z
    .string({
      required_error: "DonorId field is required",
      invalid_type_error: "That's not a string and uuid!",
    }),
  phoneNumber: z.string({
    required_error: "Phone Number field is required",
    invalid_type_error: "That's not a string !",
  }),
  dateOfDonation: z.string({
    required_error: " Donation date field is required",
    invalid_type_error: "That's not a string !",
  }),
  hospitalName: z.string({
    required_error: "Hospital Name field is required",
    invalid_type_error: "That's not a string !",
  }),
  hospitalAddress: z.string({
    required_error: "Hospital Address field is required",
    invalid_type_error: "That's not a string !",
  }),
  reason: z.string({
    required_error: "Reason field is required",
    invalid_type_error: "That's not a string !",
  }),
});
 export const donarValidationSchema={
        requestDonorForBlood   
 }
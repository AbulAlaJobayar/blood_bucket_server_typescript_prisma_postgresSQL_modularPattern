export type TRequestDonor= {
        donorId: string
        phoneNumber: string
        dateOfDonation: string
        hospitalName: string
        hospitalAddress: string
        reason: string
      }

export type TJwtAuth={
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
import jwt, { Secret } from "jsonwebtoken";
const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
  return  jwt.sign( payload , secret, { expiresIn: expiresIn });
};

const verifyToken=(token:string,secret:Secret)=>{
return jwt.verify(token,secret)
}
export const jwtHelper = {
  generateToken,
  verifyToken
};

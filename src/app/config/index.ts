import dotenv from "dotenv"
import path from "path"


dotenv.config({path:path.join(process.cwd(),'.env')});
export default{
  node_env:process.env.NODE_ENV,
  port:process.env.PORT,
  bcrypt_salt_round:process.env.BCRYPT_SALT_ROUND,
  jwt:{
    jwt_access_secret:process.env.JWT_ACCESS_TOKEN_SECRET,
    jwt_access_expire_in:process.env.JWT_ACCESS_EXPIRE_IN,
    jwt_refresh_secret:process.env.JWT_REFRESH_TOKEN_SECRET,
    jwt_refresh_expire_in:process.env.JWT_REFRESH_EXPIRE_IN

  },
}
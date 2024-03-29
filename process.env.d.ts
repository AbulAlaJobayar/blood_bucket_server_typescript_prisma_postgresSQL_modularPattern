declare namespace NodeJS {
  export type ProcessEnv = {
    NODE_ENV: string;
    PORT: number;
    BCRYPT_SALT_ROUND: number;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_ACCESS_EXPIRE_IN: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_REFRESH_EXPIRE_IN: string;
  };
}

// declare namespace NodeJS{
//   export type ProcessEnv={
//       NODE_ENV:string;
//       PORT:number;
//       DB_URL:string;
//       BCRYPT_SLAT_ROUND:number;
//       JWT_ACCESS_SECRET:string;
//       JWT_ACCESS_EXPIRES_IN:string;
//       JWT_REFRESH_SECRET:string;
//       JWT_REFRESH_EXPIRES_IN:string;

//   }
// }

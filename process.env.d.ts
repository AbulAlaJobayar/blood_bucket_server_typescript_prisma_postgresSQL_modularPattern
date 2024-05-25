declare namespace NodeJS {
  export type ProcessEnv = {
    NODE_ENV: string;
    PORT: number;
    BCRYPT_SALT_ROUND: number;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_ACCESS_EXPIRE_IN: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_REFRESH_EXPIRE_IN: string;
    FORGOT_PASS_SECRET: string;
    FORGOT_PASS_EXPIRE_IN: string;
    RESET_PASS_LINK:string
  };
}

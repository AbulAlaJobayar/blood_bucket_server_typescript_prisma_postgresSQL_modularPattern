# Project Name:  
**Blood Bucket Server**



# Technology Stack:
-  ### Programming Language: TypeScript
- ### Web Framework: Express.js
- ### Object Relational Mapping (ORM): Prisma for PostgreSQL
- ### Authentication: JWT (JSON Web Tokens)

## Project Overview

 Blood Bucket is a sophisticated authentication system built using Express, Prisma for PostgreSQL, TypeScript, and stateart technologies. It focuses on schema validation using Zod, secure password encryption with bcrypt, and user validation through JWT tokens. This project provides a robust foundation for implementing authentication in our applications with ease.

## Live URL
[Blood bucket](https://blood-bucket-five.vercel.app/)


## Features
- **User Registration:** Enables seamless registration of blood donors and requesters, capturing essential details such as name, email, blood type, and location.
- **Secure Password Storage:** Utilizes bcrypt for securely hashing and storing user passwords, ensuring data privacy and protection.
- **JWT Authentication:** Implements JSON Web Tokens for secure user authentication, enabling secure communication between the client and server.
- **Express.js Framework:** Leverages Express.js, a robust and flexible web framework for Node.js, to build a scalable and efficient backend.
- **Prisma ORM:** Integrates Prisma to interact with the PostgreSQL database, allowing for efficient management of data operations and ensuring data consistency.
Blood Bucket aims to streamline the blood donation process by providing a secure and user-friendly platform for both donors and requesters, contributing to the efficient management of blood donation activities.





## Installation

### 1. Clone the GitHub repository:
Use the `git clone` command to clone the project repository from GitHub to your local machine.

### 2. Open the project in Visual Studio Code:
Use the `code` command to open the project in Visual Studio Code.

### 3. Run `yarn init` in the VS Code terminal:
This initializes a new Node.js project. It will prompt you to provide information about your project.

### 4. Install dependencies using Yarn:
Use `yarn` to install the project dependencies listed in the package.json file.

### 5. Create an .env file:
Create a new file named `.env` in the root folder of your project.

### 6. Set environment variables in .env file:
Open the `.env` file in a text editor and set the following variables:

```plaintext
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://postgres:password@monorail.proxy.rlwy.net:20888/railway
BCRYPT_SALT_ROUND=12
JWT_ACCESS_TOKEN_SECRET=b66e2d3838abdf2aa40348211171ab9bf3f30b7acdbbdbafd32ea2a14fa30392
JWT_ACCESS_EXPIRE_IN=1d
JWT_REFRESH_TOKEN_SECRET=db001fd3e572a55930e88086a2ee97b385d93d31b604be83fc2f8c4cee3b4e28e617600524f1423300873d72e91833f0ba617d6f6f14ede7e37d5ef95e009007
JWT_REFRESH_EXPIRE_IN=30d
```


#### Domain: https://blood-bucket-five.vercel.app

#### User Registration

```http
  POST /api/register
```

####  User Login

```http
  POST /api/login
```

#### Get Paginated and Filtered Users (Donors) **

```http
 GET /api/donor-list
```



#### Request A Donor (user) For Blood 


```http
  POST /api/donation-request

```
- Request Headers
```http
 Authorization: Token
```
- Request Body:
```http
{
    "donorId": "b9964127-2924-42bb-9970-60f93c016bvj",
    "phoneNumber": "012345678591",
    "dateOfDonation": "2024-03-26",
    "hospitalName": "Chevron",
    "hospitalAddress": "Panchlaish",
    "reason": "Anemia",
}
```



#### Get My Donation Request as Donor (user) 

```http
 GET /api/donation-request
```
- Request Headers
```http
 Authorization: Token
``` 

#### Update Request Application Status

```http
PUT /api/donation-request/:requestId

```
- Request Headers
```http
 Authorization: Token
``` 
- Request Body:
```http
{
    "status": "APPROVED"
}
``` 

#### Get My Profile 


```http
 GET /api/my-profile

```
- Request Headers
```http
 Authorization: Token
``` 

#### Update My Profile


```http
 PUT /api/my-profile

```
- Request Headers
```http
 Authorization: Token
``` 
- Request Body:
```http
{
    "bio": "Updated bio text. I have donated 5 times.",
    "age": 35,
}
``` 

## if need any information
contact me

- abulalajobayar@gmail.com
- jobayar.dev@gmail.com


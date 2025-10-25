# JWT Auth using Node.js + Express.js

A Node.js and Express.js API implementing JSON Web Token (JWT) authentication to securely authorize users.

## Features

- User sign-up and login with secure password hashing
- Implements Refresh token and Access token mechanism
- Protected routes accessible only with valid JWT access tokens
- Implements Forgot password & Reset password features
- Modular route and middleware architecture for scalability
- Error handling and response consistency

## Getting Started

### Prerequisites

- Node.js (current LTS recommended)
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**
    ```
    git clone https://github.com/Vijay-CPP/jwt-auth-node-express.git
    cd jwt-auth-node-express
    ```

2. **Install dependencies:**
    ```
    npm install
    ```

3. **Set up environment variables:**
    - Update `.env` file in the root directory with your desired values

### Usage

1. **Start the server:**
    ```
    npm start
    ```

2. **API Endpoints:**
    - `POST /api/auth/signup` – Register a new user
    - `POST /api/auth/login` – Log in a user (returns JWT)
    - `POST /api/auth/logout` – Log out user (invalidates session or token as per logic)
    - `POST /api/auth/refresh-token` – Renew JWT using refresh token
	- `POST /api/auth/forgot-password` - Sends a password reset email.
	- `POST /api/auth/reset-password` - Resets new password using password reset email.
    - `GET /api/protected` – Example protected route; requires Authorization header with your JWT

    All endpoints can be quickly tested using the provided Postman collection in the root dir.    
   `jwt-auth-node-express\JWT-Auth.postman_collection.json`

3. **Import the Postman collection: (Optional)**
    - Use the `JWT-Auth.postman_collection.json` file present in the root directory to test all API endpoints directly with Postman.

## Project Structure
```sh
└── jwt-auth-node-express/
    ├── JWT-Auth.postman_collection.json
    ├── package-lock.json
    ├── package.json
    └── src
        ├─ app.js # 
        ├── config
        ├── controllers
        ├── middlewares
        ├── routes
        ├── server.js
        ├── services
        └── utils
```

## Technologies Used

- **Node.js** – Backend runtime
- **Express.js** – Web framework
- **jsonwebtoken** – JWT authentication
- **bcrypt** – Password hashing
- **dotenv** – Environment variable management

## Contributing

Pull requests and suggestions are welcome! Open an issue or submit directly.

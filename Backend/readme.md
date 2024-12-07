# Backend API

This is a backend API built with Node.js, Express, and MongoDB. It provides user registration functionality with validation and password hashing.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables (see below).

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. The server will run on `http://localhost:3000`.

## Project Structure

## API Endpoints

### User Registration

- **POST** `/users/register`
  - Request Body:
    ```json
    {
      "fullname": {
        "fname": "John",
        "lname": "Doe"
      },
      "email": "john.doe@example.com",
      "password": "yourpassword"
    }
    ```
  - Response:
    - On success: Returns user data and authentication token.
    - On error: Returns validation errors.

## Environment Variables

- `DB_CONNECTION`: MongoDB connection string.
- `TOKEN_SECRET`: Secret key for JWT signing.


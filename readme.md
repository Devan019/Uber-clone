# Backend API

This is a backend API built with Node.js, Express, and MongoDB. It provides user registration functionality with validation and password hashing.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Conclusion](#conclusion)

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

### User Login
- **POST** `/users/login`
  - Request Body:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "yourpassword"
    }
    ```
  - Response:
    - On success: Returns authentication token and user data.
    - On error: Returns validation errors or invalid credentials message.

### User Logout
- **GET** `/users/logout`
  - Response:
    - On success: Returns a message indicating the user has logged out.
    - On error: Returns unauthorized status if the user is not authenticated.

### User Profile

- **GET**  `/users/profile`

This endpoint retrieves the authenticated user's profile information.

#### Request Headers
- **Authorization**: Bearer token (required)

#### Response
- **200 OK**: Returns the user's profile information.
  ```json
  {
      "_id": "user_id",
      "email": "user@example.com",
      "fullname": {
          "fname": "First Name",
          "lname": "Last Name"
      },
      
  }
  ```

- **401 Unauthorized**: If the user is not authenticated.
- **500 Internal Server Error**: If there is an error retrieving the user information.

### Captain Registration
- **POST** `/captains/register`
  - Request Body:
    ```json
    {
      "fullname": {
        "fname": "John",
        "lname": "Doe"
      },
      "email": "john.doe@example.com",
      "password": "yourpassword",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "type": "car"
      },
      "status": "active",
      "location": {
        "ltd": 12.34,
        "lang": 56.78
      }
    }
    ```
  - Response:
    - On success: Returns the newly created captain data.
    - On error: Returns validation errors or existing captain message.

### Captain Login
- **POST** `/captains/login`
  - Request Body:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "yourpassword"
    }
    ```
  - Response:
    - On success: Returns authentication token and captain data.
    - On error: Returns validation errors or invalid credentials message.

### Captain Profile
- **GET** `/captains/profile`
  - Response:
    - **200 OK**: Returns the captain's profile information.
    - **401 Unauthorized**: If the captain is not authenticated.

### Captain Logout
- **GET** `/captains/logout`
  - Response:
    - On success: Returns a message indicating the captain has logged out.
    - On error: Returns unauthorized status if the captain is not authenticated.

## Environment Variables

- `DB_CONNECTION`: MongoDB connection string.
- `TOKEN_SECRET`: Secret key for JWT signing.

## Conclusion

This project demonstrates a full-stack application with a React frontend and a Node.js backend. The backend API provides endpoints for user and captain registration, login, profile management, and logout. The frontend, built with React and Vite, interacts with these endpoints to provide a seamless user experience. By following the installation and usage instructions, you can set up and run this project locally to explore its features and functionality.


# Frontend

This is the frontend application built with React and Vite. It provides the user interface for the Uber clone application.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>/Frontend
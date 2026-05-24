# Development Platforms CA - Option 1

## Description

This project is a REST API for a simple news platform. Users can register, log in, view news articles, and submit articles when authenticated.

The API is built with Express.js, TypeScript, MySQL, JWT authentication, bcrypt password hashing, and basic validation.

## Table of Contents

- [Description](#description)
- [Built With](#built-with)
- [Setup and Installation](#setup-and-installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Motivation](#motivation)
- [Contributing](#contributing)
- [License](#license)

## Built With

- Express.js
- TypeScript
- MySQL
- mysql2
- bcrypt
- JSON Web Token
- Zod
- dotenv
- CORS

## Setup and Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Sigrid-Okt22PT/development-platforms-ca.git
    ```

2. **Navigate to the project directory:**
    ```sh
    cd development-platforms-ca
    ```

3. **Install dependencies:**
    ```sh
    npm install
    ```

4. **Create a local MySQL database:**

    Open MySQL Workbench and run the SQL from `database.sql`.

5. **Create a `.env` file:**

    Use `.env.example` as a guide.

6. **Start the development server:**
    ```sh
    npm run dev
    ```

The API should now run at:

```sh
http://localhost:3000
```

## Database Setup

Create the database in MySQL Workbench:

```sql
CREATE DATABASE news_platform;
USE news_platform;
```

Then run the contents of:

```sh
database.sql
```

The database contains two tables:

- `users`
- `articles`

## Environment Variables

Create a `.env` file in the root of the project:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=news_platform
PORT=3000
JWT_SECRET=your_secret_key
```

Do not commit the `.env` file to GitHub.

## Usage

Start the API locally:

```sh
npm run dev
```

Build the project:

```sh
npm run build
```

Run the built project:

```sh
npm start
```

You can test the API using Postman or Thunder Client.

## API Endpoints

### Register user

```http
POST /auth/register
```

Body:

```json
{
  "email": "test@test.com",
  "password": "password123"
}
```

### Login user

```http
POST /auth/login
```

Body:

```json
{
  "email": "test@test.com",
  "password": "password123"
}
```

Returns a JWT token.

### Get all articles

```http
GET /articles
```

Public endpoint. Does not require authentication.

### Create article

```http
POST /articles
```

Protected endpoint. Requires a Bearer token.

Headers:

```http
Authorization: Bearer your_token_here
```

Body:

```json
{
  "title": "First article",
  "body": "This is the article body.",
  "category": "Technology"
}
```

## Motivation

I chose Option 1 because I wanted to practise building the server-side part of a web application. I have worked a lot with APIs from the frontend before, but I wanted to understand more about how the backend and API logic are built.

I followed the lessons closely throughout the project, and there were many different steps involved in setting up the API, database, authentication, and middleware. The hardest part was keeping track of all the steps and understanding how everything connected together. I often had to go back into the modules and lessons to look up the setup process and compare my code with the examples.

Through the project I got practical experience with Express Router, middleware, JWT authentication, bcrypt password hashing, MySQL databases, and parameterised SQL queries. I also learned more about how frontend applications connect to backend services and how APIs handle authentication and data securely.

A benefit of building the API with Express instead of using a SaaS solution like Supabase is that I got more hands-on experience with backend development. I had to set up the routes, authentication, middleware, and database connection myself, which helped me understand better how APIs and full-stack solutions work behind the scenes.

## AI Usage

AI tools were used during development for:
- explaining backend concepts and middleware
- brainstorming/discussing project structure
- troubleshooting errors
- improving and editing README documentation

All code was reviewed, edited, and tested manually before submission.

## Contributing

This is a course assignment project and is not currently open for contributions.

## License

This project is for educational use.

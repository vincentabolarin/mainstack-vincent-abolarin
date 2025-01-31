# Product Management API with Node.js MongoDB and Docker

## Overview

This project is a Node.js-based API that uses MongoDB as its database. It supports user authentication and product management features. The API is containerized using Docker for easy deployment.

## Features

- **User Authentication**: Register and login with token-based authentication.
- **Product Management**: CRUD operations on products.
- **MongoDB Integration**: Stores user and product data.
- **Docker Support**: Runs in a containerized environment.
- **Testing with Jest and Supertest**: Includes test coverage for authentication and product endpoints.

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Testing**: Jest, Supertest
- **Containerization**: Docker, Docker Compose

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)

### Clone the Repository

```sh
git clone https://github.com/vincentabolarin/mainstack-vincent-abolarin.git
cd your-repo
```

### Install Dependencies

```sh
npm install
```

### Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=8080
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
```

### Start the Server

```sh
npm start
```

The API will be available at `http://localhost:8080`.

## Running Tests

```sh
npm test
```

## Running with Docker

### Build and Run the Container

```sh
docker build -t node-api .
docker run -p 8080:8080 --env-file .env node-api
```

### Using Docker Compose

```sh
docker-compose up --build
```

## API Endpoints

### Authentication

- **POST /auth/register** → Register a new user
- **POST /auth/login** → Login and receive a token

### Products

- **POST /products** → Create a new product
- **GET /products** → Get all products
- **GET /products/\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*****:id** → Get a specific product
- **PUT /products/\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*****:id** → Update a product
- **DELETE /products/\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*****:id** → Delete a product

## Deployment

To deploy your application to a cloud provider, push your Docker image to Docker Hub:

```sh
docker tag node-api your-dockerhub-username/node-api

docker push your-dockerhub-username/node-api
```

Then, pull and run the image on your cloud server.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

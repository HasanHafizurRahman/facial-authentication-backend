## Facial Recognition Authentication API

This repository contains the backend code for a facial recognition authentication API built with Node.js and MongoDB.

### Features

* Register new faces with usernames and face descriptors.
* Retrieve a list of all registered faces.

### Technologies

* **Backend:** Node.js (Express)
* **Database:** MongoDB
* **Dependencies:**
    * express
    * mongoose
    * cors
    * body-parser

### Codebase Structure

* **index.js:** Entry point for the application. Establishes connection to MongoDB, defines models, and starts the server.
* **models/face.js:** Defines the Mongoose schema for a "Face" object, containing username and face descriptor data.
* **routes/api.js:** Defines API endpoints for registering faces (`/api/register`) and retrieving all faces (`/api/faces`).

### Installation

1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Replace the placeholder values in `index.js`:
    * Update `mongodb+srv://....../facialRecognition` with your actual MongoDB connection string.

### Running the application

1. Start the server:
   ```bash
   node index.js
   ```
2. The server will listen on port 5000 by default (you can modify this in `index.js`).

### API Usage

**Register a new face:**

* **Method:** POST
* **URL:** `http://localhost:5000/api/register`
* **Request Body:**
    ```json
    {
        "username": "your_username",
        "descriptor": [[array of face descriptor values], ...]
    }
    ```
* **Response:**
    * Status code 200: Success message indicating face registration.
    * Status code 400: Error message if username already exists or invalid descriptor format provided.

**Get all registered faces:**

* **Method:** GET
* **URL:** `http://localhost:5000/api/faces`
* **Response:**
    * JSON array containing all registered faces with username and descriptor information.

### Contribution

We welcome contributions to improve this project. Please follow these guidelines:

* Fork the repository.
* Create a new branch for your feature or bug fix.
* Implement your changes and write unit tests.
* Submit a pull request for review.

### License

This project is licensed under the MIT License.  See the LICENSE file for details.

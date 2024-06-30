# API Tracker

API Tracker is a web application that tracks and displays API hit data. It includes a backend for logging API hits and a frontend for visualizing the data in various formats such as tables and charts.

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Technologies

- Flask (Backend)
- React (Frontend)
- PostgreSQL (Database)
- Chart.js (Data Visualization)
- Axios (HTTP Client)

## Setup

### Backend Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Aniruddhs23/api-tracker.git
    cd api-tracker/api-tracker-backend
    ```

2. **Create a virtual environment:**

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install the dependencies:**

    ```sh
    pip install -r requirements.txt
    ```

4. **Set up the database:**

    Ensure you have PostgreSQL installed and running. Create a new database.

    ```sh
    createdb api_tracker
    ```

    Update the `DATABASE_URL` in your environment variables or directly in the code.

    ```sh
    export DATABASE_URL="postgresql://username:password@localhost/api_tracker"
    ```

5. **Run the Flask application:**

    ```sh
    flask run
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```sh
    cd ../api-tracker-frontend
    ```

2. **Install the dependencies:**

    ```sh
    npm install
    ```

3. **Run the React application:**

    ```sh
    npm start
    ```

## Usage

- The backend will be running on `http://localhost:5000`
- The frontend will be running on `http://localhost:3000`

### Viewing the Dashboard

Navigate to `http://localhost:3000` in your browser to view the API hit dashboard. The dashboard includes:
- A pie chart showing the number of requests by browser.
- A bar chart showing the number of requests by criteria.
- A table listing all API hits.

## API Endpoints

### Get API Hits

```http
GET /api_tracking/api_hits

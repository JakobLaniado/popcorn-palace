# 🎬 Popcorn Palace Movie Ticket Booking System

A modern, RESTful API for managing movie tickets, showtimes, and bookings built with NestJS and TypeScript.

## 🚀 Features

- **Movie Management**
  - Create, read, update, and delete movies
  - Track movie details including title, genre, duration, rating, and release year
  - Input validation and error handling

- **Showtime Management**
  - Schedule movie showtimes in different theaters
  - Manage showtime details including start time, end time, and pricing
  - Prevent overlapping showtimes in the same theater

- **Ticket Booking**
  - Book tickets for specific showtimes
  - Track customer information and seat assignments
  - Validate seat availability

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: class-validator
- **Containerization**: Docker & Docker Compose

## 🏗️ Project Structure

```
src/
├── controllers/     # Request handlers
├── services/       # Business logic
├── entities/       # Database models
├── dto/           # Data Transfer Objects
├── config/        # Configuration files
└── main.ts        # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)

### Running with Docker

1. Clone the repository:
```bash
git clone <your-repo-url>
cd popcorn_palace_typescript
```

2. Start the application:
```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`

### Running Locally

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=popcorn_palace
```

3. Start the application:
```bash
npm run start:dev
```

## 📝 API Endpoints

### Movies

- `GET /movies` - Get all movies
- `GET /movies/:id` - Get a specific movie
- `POST /movies` - Create a new movie
- `PUT /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie

### Showtimes

- `GET /showtimes` - Get all showtimes
- `GET /showtimes/:id` - Get a specific showtime
- `POST /showtimes` - Create a new showtime
- `PUT /showtimes/:id` - Update a showtime
- `DELETE /showtimes/:id` - Delete a showtime

### Tickets

- `GET /tickets` - Get all tickets
- `GET /tickets/:id` - Get a specific ticket
- `POST /tickets` - Create a new ticket
- `DELETE /tickets/:id` - Delete a ticket

## 🧪 Testing

Run the test suite:
```bash
# Unit tests
npm run test
```

## 📚 Documentation

The API documentation is available at `http://localhost:3000/api` when running the application.


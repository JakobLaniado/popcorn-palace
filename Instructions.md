# Popcorn Palace - Movie Ticket Booking System

This is a RESTful API for a movie ticket booking system built with NestJS, TypeScript, and PostgreSQL.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v7 or higher)
- Docker and Docker Compose

## Project Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd popcorn_palace_typescript
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Make sure Docker and Docker Compose are installed and running on your system.

2. Build and start the containers:
```bash
# Build the containers
docker-compose build

# Start the containers in detached mode
docker-compose up -d
```

3. Check if containers are running:
```bash
docker-compose ps
```

4. Check container logs if needed:
```bash
# Check app logs
docker-compose logs app

# Check database logs
docker-compose logs postgres
```

5. The API will be available at `http://localhost:3000`

6. To stop the containers:
```bash
docker-compose down
```

7. To stop containers and remove volumes:
```bash
docker-compose down -v
```

## Testing

The project includes comprehensive tests for all controllers and services. Here are the available test commands:

```bash
# Run all tests
npm run test
```

### Running Specific Tests

```bash
# Run only movie controller tests
npm run test -- src/controllers/movie.controller.spec.ts

# Run only showtime controller tests
npm run test -- src/controllers/showtime.controller.spec.ts

# Run only ticket controller tests
npm run test -- src/controllers/ticket.controller.spec.ts
```

## API Endpoints

### Movies
- `POST /movies` - Create a new movie
- `GET /movies` - Get all movies
- `GET /movies/:id` - Get a specific movie
- `PUT /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie

### Showtimes
- `POST /showtimes` - Create a new showtime
- `GET /showtimes` - Get all showtimes
- `GET /showtimes/:id` - Get a specific showtime
- `PUT /showtimes/:id` - Update a showtime
- `DELETE /showtimes/:id` - Delete a showtime

### Tickets
- `POST /tickets` - Create a new ticket
- `GET /tickets` - Get all tickets
- `GET /tickets/:id` - Get a specific ticket
- `DELETE /tickets/:id` - Delete a ticket

## Data Validation

The API includes comprehensive validation for all inputs:

### Movie Validation
- Title: Required, unique
- Duration: Positive number
- Genre: Required
- Rating: Decimal between 0 and 10
- Release Year: Valid year

### Showtime Validation
- Movie ID: Must exist
- Theater: Required, 1-50 characters
- Start Time: Future date, format YYYY-MM-DDTHH:mm
- End Time: After start time
- Price: Decimal between 0.01 and 100

### Ticket Validation
- Showtime ID: Must exist
- Seat Number: Integer between 1 and 100
- Customer Name: Required, 2-50 characters
- No double booking allowed
- Cannot book tickets for past showtimes

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., duplicate title)
- `500 Internal Server Error` - Server error

# Popcorn Palace - Movie Ticket Booking System

A modern movie ticket booking system built with NestJS and TypeScript, featuring a robust API and PostgreSQL database integration.

## Features

- RESTful API endpoints for movies, showtimes, and ticket management
- PostgreSQL database with TypeORM integration
- Docker containerization for easy deployment
- Comprehensive test coverage
- Swagger API documentation

## Tech Stack

- **Backend Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Containerization**: Docker
- **Testing**: Jest
- **API Documentation**: Swagger

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/JakobLaniado/popcorn-palace.git
cd popcorn-palace
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the application:
```bash
# Using Docker
docker-compose up -d

# Or locally
npm run start:dev
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api
```

## Testing

Run the test suite:
```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Docker Commands

```bash
# Build and start containers
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild containers
docker-compose up -d --build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NestJS team for the amazing framework
- TypeORM team for the excellent ORM
- All contributors who help improve this project

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


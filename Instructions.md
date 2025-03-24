# Popcorn Palace - Movie Ticket Booking System

## Project Overview

This project implements a movie ticket booking system using NestJS and TypeScript. The system allows users to manage movies, showtimes, and ticket bookings through a RESTful API.

## Repository

The project is hosted on GitHub at: https://github.com/JakobLaniado/popcorn-palace

## Features

- Movie management (CRUD operations)
- Showtime scheduling
- Ticket booking system
- Seat availability validation
- PostgreSQL database integration
- Docker containerization
- Swagger API documentation

## API Endpoints

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

## Getting Started

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

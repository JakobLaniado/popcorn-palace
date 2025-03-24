import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { MovieController } from './controllers/movie.controller';
import { MovieService } from './services/movie.service';
import { Movie } from './entities/movie.entity';
import { ShowtimeController } from './controllers/showtime.controller';
import { ShowtimeService } from './services/showtime.service';
import { Showtime } from './entities/showtime.entity';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Movie, Showtime, Ticket]),
  ],
  controllers: [
    AppController,
    MovieController,
    ShowtimeController,
    TicketController
  ],
  providers: [
    AppService,
    MovieService,
    ShowtimeService,
    TicketService
  ],
})
export class AppModule {}

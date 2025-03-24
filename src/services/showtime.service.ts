import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual, Not } from 'typeorm';
import { Showtime } from '../entities/showtime.entity';
import { CreateShowtimeDto } from '../dto/create-showtime.dto';
import { UpdateShowtimeDto } from '../dto/update-showtime.dto';
import { MovieService } from './movie.service';

@Injectable()
export class ShowtimeService {
  constructor(
    @InjectRepository(Showtime)
    private showtimeRepository: Repository<Showtime>,
    private movieService: MovieService,
  ) {}

  async create(createShowtimeDto: CreateShowtimeDto): Promise<Showtime> {
    // Check if movie exists
    const movie = await this.movieService.findOne(createShowtimeDto.movie_id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${createShowtimeDto.movie_id} not found`);
    }

    // Convert string dates to Date objects
    const startTime = new Date(createShowtimeDto.start_time);
    const endTime = new Date(createShowtimeDto.end_time);

    // Validate time constraints
    if (startTime >= endTime) {
      throw new BadRequestException('End time must be after start time');
    }

    // Check if duration is not more than 5 hours
    const durationInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    if (durationInHours > 5) {
      throw new BadRequestException('Showtime duration cannot exceed 5 hours');
    }

    // Check for overlapping showtimes in the same theater
    const overlappingShowtime = await this.showtimeRepository.findOne({
      where: [
        {
          theater: createShowtimeDto.theater,
          start_time: LessThanOrEqual(endTime),
          end_time: MoreThanOrEqual(startTime),
        },
      ],
    });

    if (overlappingShowtime) {
      throw new ConflictException(
        `There is already a showtime in this theater between ${overlappingShowtime.start_time} and ${overlappingShowtime.end_time}`,
      );
    }

    const showtime = this.showtimeRepository.create(createShowtimeDto);
    return await this.showtimeRepository.save(showtime);
  }

  async findAll(): Promise<Showtime[]> {
    return await this.showtimeRepository.find({
      relations: ['movie'],
    });
  }

  async findOne(id: number): Promise<Showtime> {
    const showtime = await this.showtimeRepository.findOne({
      where: { id },
      relations: ['movie'],
    });

    if (!showtime) {
      throw new NotFoundException(`Showtime with ID ${id} not found`);
    }

    return showtime;
  }

  async update(id: number, updateShowtimeDto: UpdateShowtimeDto): Promise<Showtime> {
    const showtime = await this.findOne(id);

    // If movie_id is being updated, check if new movie exists
    if (updateShowtimeDto.movie_id) {
      const movie = await this.movieService.findOne(updateShowtimeDto.movie_id);
      if (!movie) {
        throw new NotFoundException(`Movie with ID ${updateShowtimeDto.movie_id} not found`);
      }
    }

    // If times are being updated, validate them
    if (updateShowtimeDto.start_time || updateShowtimeDto.end_time) {
      const startTime = updateShowtimeDto.start_time 
        ? new Date(updateShowtimeDto.start_time)
        : showtime.start_time;
      const endTime = updateShowtimeDto.end_time
        ? new Date(updateShowtimeDto.end_time)
        : showtime.end_time;

      if (startTime >= endTime) {
        throw new BadRequestException('End time must be after start time');
      }

      const durationInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      if (durationInHours > 5) {
        throw new BadRequestException('Showtime duration cannot exceed 5 hours');
      }

      // Check for overlapping showtimes, excluding the current showtime
      const overlappingShowtime = await this.showtimeRepository.findOne({
        where: [
          {
            theater: updateShowtimeDto.theater || showtime.theater,
            start_time: LessThanOrEqual(endTime),
            end_time: MoreThanOrEqual(startTime),
            id: Not(id),
          },
        ],
      });

      if (overlappingShowtime) {
        throw new ConflictException(
          `There is already a showtime in this theater between ${overlappingShowtime.start_time} and ${overlappingShowtime.end_time}`,
        );
      }
    }

    // Update only the provided fields
    Object.assign(showtime, updateShowtimeDto);
    return await this.showtimeRepository.save(showtime);
  }

  async delete(id: number): Promise<void> {
    const showtime = await this.findOne(id);
    await this.showtimeRepository.remove(showtime);
  }
} 
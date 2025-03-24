import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    // Check if movie with same title exists
    const existingMovie = await this.movieRepository.findOne({
      where: { title: createMovieDto.title }
    });

    if (existingMovie) {
      throw new ConflictException(`Movie with title "${createMovieDto.title}" already exists`);
    }

    const movie = this.movieRepository.create(createMovieDto);
    return await this.movieRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id }
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    // Find the movie to update
    const movie = await this.findOne(id);

    // If title is being updated, check for conflicts
    if (updateMovieDto.title && updateMovieDto.title !== movie.title) {
      const existingMovie = await this.movieRepository.findOne({
        where: { title: updateMovieDto.title }
      });

      if (existingMovie) {
        throw new ConflictException(`Movie with title "${updateMovieDto.title}" already exists`);
      }
    }

    // Update only the provided fields
    Object.assign(movie, updateMovieDto);
    return await this.movieRepository.save(movie);
  }

  async delete(id: number): Promise<void> {
    const movie = await this.findOne(id);
    await this.movieRepository.remove(movie);
  }

} 
import { IsString, IsNumber, Min, Max, Length } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @Length(1, 100, { message: 'Title must be between 1 and 100 characters' })
  title: string;

  @IsString()
  @Length(1, 50, { message: 'Genre must be between 1 and 50 characters' })
  genre: string;

  @IsNumber()
  @Min(1, { message: 'Duration must be at least 1 minute' })
  @Max(300, { message: 'Duration cannot exceed 300 minutes (5 hours)' })
  duration: number;

  @IsNumber()
  @Min(0, { message: 'Rating cannot be less than 0' })
  @Max(10, { message: 'Rating cannot exceed 10' })
  rating: number;

  @IsNumber()
  @Min(1900, { message: 'Release year cannot be before 1900' })
  @Max(new Date().getFullYear(), { message: 'Release year cannot be in the future' })
  release_year: number;
} 
import { IsString, IsNumber, IsDateString, Min, Max, IsPositive, Length, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShowtimeDto {
  @IsNumber()
  @IsPositive()
  movie_id: number;

  @IsString()
  @Length(1, 50, { message: 'Theater name must be between 1 and 50 characters' })
  theater: string;

  @IsString()
  @Matches(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
    { message: 'start_time must be in format YYYY-MM-DDTHH:mm' }
  )
  start_time: string;

  @IsString()
  @Matches(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
    { message: 'end_time must be in format YYYY-MM-DDTHH:mm' }
  )
  end_time: string;

  @IsNumber()
  @IsPositive()
  @Min(0.01, { message: 'Price must be greater than 0' })
  @Max(100, { message: 'Price cannot exceed 100' })
  price: number;
} 
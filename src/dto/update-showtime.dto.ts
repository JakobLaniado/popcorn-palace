import { IsString, IsNumber, IsPositive, Length, Matches, IsOptional, Min, Max } from 'class-validator';

export class UpdateShowtimeDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  movie_id?: number;

  @IsOptional()
  @IsString()
  @Length(1, 50, { message: 'Theater name must be between 1 and 50 characters' })
  theater?: string;

  @IsOptional()
  @IsString()
  @Matches(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
    { message: 'start_time must be in format YYYY-MM-DDTHH:mm' }
  )
  start_time?: string;

  @IsOptional()
  @IsString()
  @Matches(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
    { message: 'end_time must be in format YYYY-MM-DDTHH:mm' }
  )
  end_time?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0.01, { message: 'Price must be greater than 0' })
  @Max(100, { message: 'Price cannot exceed 100' })
  price?: number;
} 
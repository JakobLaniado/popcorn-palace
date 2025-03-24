import { IsString, IsNumber, IsPositive, Length, Min, Max } from 'class-validator';

export class CreateTicketDto {
  @IsNumber()
  @IsPositive()
  showtime_id: number;

  @IsString()
  seat_number: string;

  @IsString()
  @Length(2, 50, { message: 'Customer name must be between 2 and 50 characters' })
  customer_name: string;
} 
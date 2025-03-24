import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { ShowtimeService } from './showtime.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    private showtimeService: ShowtimeService,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    // Check if showtime exists and get its details
    const showtime = await this.showtimeService.findOne(createTicketDto.showtime_id);
    if (!showtime) {
      throw new NotFoundException(`Showtime with ID ${createTicketDto.showtime_id} not found`);
    }

    // Check if showtime has already started
    const now = new Date();
    const startTime = new Date(showtime.start_time);
    if (now >= startTime) {
      throw new BadRequestException('Cannot book tickets for a showtime that has already started');
    }

    // Check if seat is already booked for this showtime
    const existingTicket = await this.ticketRepository.findOne({
      where: {
        showtime: { id: createTicketDto.showtime_id },
        seat_number: createTicketDto.seat_number,
      },
    });

    if (existingTicket) {
      throw new ConflictException(
        `Seat ${createTicketDto.seat_number} is already booked for this showtime`,
      );
    }

    const ticket = this.ticketRepository.create(createTicketDto);
    return await this.ticketRepository.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      relations: ['showtime', 'showtime.movie'],
    });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['showtime', 'showtime.movie'],
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return ticket;
  }

  async findByShowtime(showtimeId: number): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      where: { showtime: { id: showtimeId } },
      relations: ['showtime', 'showtime.movie'],
    });
  }

  async delete(id: number): Promise<void> {
    const ticket = await this.findOne(id);
    
    // Check if showtime has already started
    const now = new Date();
    const startTime = new Date(ticket.showtime.start_time);
    if (now >= startTime) {
      throw new BadRequestException('Cannot cancel tickets for a showtime that has already started');
    }

    await this.ticketRepository.remove(ticket);
  }
} 
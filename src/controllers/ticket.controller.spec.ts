import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketService } from '../services/ticket.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';

describe('TicketController', () => {
  let controller: TicketController;
  let service: TicketService;

  // Mock data for testing
  const mockTicket = {
    id: 1,
    showtime: {
      id: 1,
      movie: { id: 1 },
      theater: 'Theater 1',
      start_time: new Date('2024-03-20T14:00'),
      end_time: new Date('2024-03-20T16:00'),
      price: 12.99,
    },
    seat_number: 1,
    customer_name: 'John Doe',
  };

  // Mock TicketService
  const mockTicketService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [
        {
          provide: TicketService,
          useValue: mockTicketService,
        },
      ],
    }).compile();

    controller = module.get<TicketController>(TicketController);
    service = module.get<TicketService>(TicketService);
  });

  // Reset all mocks before each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a ticket successfully', async () => {
      const createTicketDto: CreateTicketDto = {
        showtime_id: 1,
        seat_number:  'A1',
        customer_name: 'John Doe',
      };

      mockTicketService.create.mockResolvedValue(mockTicket);

      const result = await controller.create(createTicketDto);

      expect(result).toEqual(mockTicket);
      expect(service.create).toHaveBeenCalledWith(createTicketDto);
    });

    it('should throw ConflictException when booking already booked seat', async () => {
      const createTicketDto: CreateTicketDto = {
        showtime_id: 1,
        seat_number:  'A1', 
        customer_name: 'John Doe',
      };

      mockTicketService.create.mockRejectedValue(
        new ConflictException('Seat is already booked')
      );

      await expect(controller.create(createTicketDto)).rejects.toThrow(ConflictException);
      await expect(controller.create(createTicketDto)).rejects.toThrow(
        'Seat is already booked'
      );
    });

    it('should throw BadRequestException when showtime has already started', async () => {
      const createTicketDto: CreateTicketDto = {
        showtime_id: 1,
        seat_number:  'A1',
        customer_name: 'John Doe',
      };

      mockTicketService.create.mockRejectedValue(
        new BadRequestException('Cannot book ticket for a showtime that has already started')
      );

      await expect(controller.create(createTicketDto)).rejects.toThrow(BadRequestException);
      await expect(controller.create(createTicketDto)).rejects.toThrow(
        'Cannot book ticket for a showtime that has already started'
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of tickets', async () => {
      const tickets = [mockTicket];
      mockTicketService.findAll.mockResolvedValue(tickets);

      const result = await controller.findAll();

      expect(result).toEqual(tickets);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no tickets exist', async () => {
      mockTicketService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single ticket', async () => {
      mockTicketService.findOne.mockResolvedValue(mockTicket);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockTicket);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when ticket does not exist', async () => {
      mockTicketService.findOne.mockRejectedValue(
        new NotFoundException(`Ticket with ID 999 not found`)
      );

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
      await expect(controller.findOne('999')).rejects.toThrow(
        `Ticket with ID 999 not found`
      );
    });
  });

  describe('remove', () => {
    it('should delete a ticket successfully', async () => {
      mockTicketService.delete.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when deleting non-existent ticket', async () => {
      mockTicketService.delete.mockRejectedValue(
        new NotFoundException(`Ticket with ID 999 not found`)
      );

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
      await expect(controller.remove('999')).rejects.toThrow(
        `Ticket with ID 999 not found`
      );
    });

    it('should throw BadRequestException when trying to delete ticket for started showtime', async () => {
      mockTicketService.delete.mockRejectedValue(
        new BadRequestException('Cannot delete ticket for a showtime that has already started')
      );

      await expect(controller.remove('1')).rejects.toThrow(BadRequestException);
      await expect(controller.remove('1')).rejects.toThrow(
        'Cannot delete ticket for a showtime that has already started'
      );
    });
  });
}); 
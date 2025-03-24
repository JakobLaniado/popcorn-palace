import { Test, TestingModule } from '@nestjs/testing';
import { ShowtimeController } from './showtime.controller';
import { ShowtimeService } from '../services/showtime.service';
import { CreateShowtimeDto } from '../dto/create-showtime.dto';
import { UpdateShowtimeDto } from '../dto/update-showtime.dto';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';

describe('ShowtimeController', () => {
  let controller: ShowtimeController;
  let service: ShowtimeService;

  // Mock data for testing
  const mockShowtime = {
    id: 1,
    movie: { id: 1 }, // Mock movie relation
    theater: 'Theater 1',
    start_time: new Date('2024-03-20T14:00'),
    end_time: new Date('2024-03-20T16:00'),
    price: 12.99,
    tickets: [], // Mock tickets relation
  };

  // Mock ShowtimeService
  const mockShowtimeService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowtimeController],
      providers: [
        {
          provide: ShowtimeService,
          useValue: mockShowtimeService,
        },
      ],
    }).compile();

    controller = module.get<ShowtimeController>(ShowtimeController);
    service = module.get<ShowtimeService>(ShowtimeService);
  });

  // Reset all mocks before each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a showtime successfully', async () => {
      const createShowtimeDto: CreateShowtimeDto = {
        movie_id: 1,
        theater: 'Theater 1',
        start_time: '2024-03-20T14:00',
        end_time: '2024-03-20T16:00',
        price: 12.99,
      };

      mockShowtimeService.create.mockResolvedValue(mockShowtime);

      const result = await controller.create(createShowtimeDto);

      expect(result).toEqual(mockShowtime);
      expect(service.create).toHaveBeenCalledWith(createShowtimeDto);
    });

    it('should throw ConflictException when creating overlapping showtime', async () => {
      const createShowtimeDto: CreateShowtimeDto = {
        movie_id: 1,
        theater: 'Theater 1',
        start_time: '2024-03-20T14:00',
        end_time: '2024-03-20T16:00',
        price: 12.99,
      };

      mockShowtimeService.create.mockRejectedValue(
        new ConflictException('Showtime overlaps with existing showtime')
      );

      await expect(controller.create(createShowtimeDto)).rejects.toThrow(ConflictException);
      await expect(controller.create(createShowtimeDto)).rejects.toThrow(
        'Showtime overlaps with existing showtime'
      );
    });

    it('should throw BadRequestException for invalid time format', async () => {
      const invalidShowtimeDto: CreateShowtimeDto = {
        movie_id: 1,
        theater: 'Theater 1',
        start_time: 'invalid-time',
        end_time: '2024-03-20T16:00',
        price: 12.99,
      };

      mockShowtimeService.create.mockRejectedValue(
        new BadRequestException('Invalid time format')
      );

      await expect(controller.create(invalidShowtimeDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when end_time is before start_time', async () => {
      const invalidShowtimeDto: CreateShowtimeDto = {
        movie_id: 1,
        theater: 'Theater 1',
        start_time: '2024-03-20T16:00',
        end_time: '2024-03-20T14:00',
        price: 12.99,
      };

      mockShowtimeService.create.mockRejectedValue(
        new BadRequestException('End time must be after start time')
      );

      await expect(controller.create(invalidShowtimeDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of showtimes', async () => {
      const showtimes = [mockShowtime];
      mockShowtimeService.findAll.mockResolvedValue(showtimes);

      const result = await controller.findAll();

      expect(result).toEqual(showtimes);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no showtimes exist', async () => {
      mockShowtimeService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single showtime', async () => {
      mockShowtimeService.findOne.mockResolvedValue(mockShowtime);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockShowtime);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when showtime does not exist', async () => {
      mockShowtimeService.findOne.mockRejectedValue(
        new NotFoundException(`Showtime with ID 999 not found`)
      );

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
      await expect(controller.findOne('999')).rejects.toThrow(
        `Showtime with ID 999 not found`
      );
    });
  });

  describe('update', () => {
    it('should update a showtime successfully', async () => {
      const updateShowtimeDto: UpdateShowtimeDto = {
        price: 14.99,
        start_time: '2024-03-20T15:00',
        end_time: '2024-03-20T17:00',
      };

      const updatedShowtime = { ...mockShowtime, ...updateShowtimeDto };
      mockShowtimeService.update.mockResolvedValue(updatedShowtime);

      const result = await controller.update('1', updateShowtimeDto);

      expect(result).toEqual(updatedShowtime);
      expect(service.update).toHaveBeenCalledWith(1, updateShowtimeDto);
    });

    it('should throw NotFoundException when updating non-existent showtime', async () => {
      const updateShowtimeDto: UpdateShowtimeDto = {
        price: 14.99,
      };

      mockShowtimeService.update.mockRejectedValue(
        new NotFoundException(`Showtime with ID 999 not found`)
      );

      await expect(controller.update('999', updateShowtimeDto)).rejects.toThrow(NotFoundException);
      await expect(controller.update('999', updateShowtimeDto)).rejects.toThrow(
        `Showtime with ID 999 not found`
      );
    });

    it('should throw ConflictException when updating to overlapping time', async () => {
      const updateShowtimeDto: UpdateShowtimeDto = {
        start_time: '2024-03-20T13:00',
        end_time: '2024-03-20T15:00',
      };

      mockShowtimeService.update.mockRejectedValue(
        new ConflictException('Showtime overlaps with existing showtime')
      );

      await expect(controller.update('1', updateShowtimeDto)).rejects.toThrow(ConflictException);
      await expect(controller.update('1', updateShowtimeDto)).rejects.toThrow(
        'Showtime overlaps with existing showtime'
      );
    });
  });

  describe('remove', () => {
    it('should delete a showtime successfully', async () => {
      mockShowtimeService.delete.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when deleting non-existent showtime', async () => {
      mockShowtimeService.delete.mockRejectedValue(
        new NotFoundException(`Showtime with ID 999 not found`)
      );

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
      await expect(controller.remove('999')).rejects.toThrow(
        `Showtime with ID 999 not found`
      );
    });
  });
}); 
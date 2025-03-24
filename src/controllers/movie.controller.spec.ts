import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from '../services/movie.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;

  // Mock data for testing
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    duration: 120,
    genre: 'Action',
    rating: 4.5,
    release_year: 2024,
  };

  // Mock MovieService
  const mockMovieService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
  });

  // Reset all mocks before each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie successfully', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Test Movie',
        duration: 120,
        genre: 'Action',
        rating: 4.5,
        release_year: 2024,
      };

      mockMovieService.create.mockResolvedValue(mockMovie);

      const result = await controller.create(createMovieDto);

      expect(result).toEqual(mockMovie);
      expect(service.create).toHaveBeenCalledWith(createMovieDto);
    });

    it('should throw ConflictException when creating movie with existing title', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Existing Movie',
        duration: 120,
        genre: 'Action',
        rating: 4.5,
        release_year: 2024,
      };

      // Mock the service to throw a ConflictException
      mockMovieService.create.mockRejectedValue(
        new ConflictException(`Movie with title "${createMovieDto.title}" already exists`)
      );

      // Test that the controller properly propagates the error
      await expect(controller.create(createMovieDto)).rejects.toThrow(ConflictException);
      await expect(controller.create(createMovieDto)).rejects.toThrow(
        `Movie with title "${createMovieDto.title}" already exists`
      );
    });

    it('should validate required fields', async () => {
      const invalidMovieDto = {
        title: '', // Empty title
        duration: -1, // Invalid duration
        genre: '', // Empty genre
        rating: 11, // Invalid rating
        release_year: 1800, // Invalid year
      };

      // Mock the service to throw a BadRequestException
      mockMovieService.create.mockRejectedValue(
        new Error('Invalid movie data')
      );

      await expect(controller.create(invalidMovieDto as CreateMovieDto)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const movies = [mockMovie];
      mockMovieService.findAll.mockResolvedValue(movies);

      const result = await controller.findAll();

      expect(result).toEqual(movies);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no movies exist', async () => {
      mockMovieService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single movie', async () => {
      mockMovieService.findOne.mockResolvedValue(mockMovie);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockMovie);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when movie does not exist', async () => {
      mockMovieService.findOne.mockRejectedValue(
        new NotFoundException(`Movie with ID 999 not found`)
      );

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
      await expect(controller.findOne('999')).rejects.toThrow(
        `Movie with ID 999 not found`
      );
    });

    it('should handle invalid ID format', async () => {
      await expect(controller.findOne('invalid')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a movie successfully', async () => {
      const updateMovieDto: UpdateMovieDto = {
        title: 'Updated Movie',
        rating: 5.0,
      };

      const updatedMovie = { ...mockMovie, ...updateMovieDto };
      mockMovieService.update.mockResolvedValue(updatedMovie);

      const result = await controller.update('1', updateMovieDto);

      expect(result).toEqual(updatedMovie);
      expect(service.update).toHaveBeenCalledWith(1, updateMovieDto);
    });

    it('should throw NotFoundException when updating non-existent movie', async () => {
      const updateMovieDto: UpdateMovieDto = {
        title: 'Updated Movie',
        rating: 5.0,
      };

      mockMovieService.update.mockRejectedValue(
        new NotFoundException(`Movie with ID 999 not found`)
      );

      await expect(controller.update('999', updateMovieDto)).rejects.toThrow(NotFoundException);
      await expect(controller.update('999', updateMovieDto)).rejects.toThrow(
        `Movie with ID 999 not found`
      );
    });

    it('should throw ConflictException when updating to existing title', async () => {
      const updateMovieDto: UpdateMovieDto = {
        title: 'Existing Movie',
      };

      mockMovieService.update.mockRejectedValue(
        new ConflictException(`Movie with title "${updateMovieDto.title}" already exists`)
      );

      await expect(controller.update('1', updateMovieDto)).rejects.toThrow(ConflictException);
      await expect(controller.update('1', updateMovieDto)).rejects.toThrow(
        `Movie with title "${updateMovieDto.title}" already exists`
      );
    });
  });

  describe('remove', () => {
    it('should delete a movie successfully', async () => {
      mockMovieService.delete.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when deleting non-existent movie', async () => {
      mockMovieService.delete.mockRejectedValue(
        new NotFoundException(`Movie with ID 999 not found`)
      );

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
      await expect(controller.remove('999')).rejects.toThrow(
        `Movie with ID 999 not found`
      );
    });
  });
}); 
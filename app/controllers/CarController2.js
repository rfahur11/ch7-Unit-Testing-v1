const CarController = require('./CarController');
const { Car, UserCar } = require('../models');
const dayjs = require('dayjs');


describe('CarController', () => {
  let carController;

  beforeAll(() => {
    carController = new CarController({ carModel: Car, userCarModel: UserCar, dayjs });
  });

  describe('#handleListCars', () => {
    it('should call res.status(200) and res.json with list of cars and pagination meta', async () => {
      const mockRequest = {
        query: {
          pageSize: 10,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockCars = [{ id: 1, name: 'Car 1' }, { id: 2, name: 'Car 2' }];
      const mockCarCount = 2;
      const mockPagination = { page: 1, totalPages: 1 };

      carController.carModel.findAll = jest.fn().mockResolvedValue(mockCars);
      carController.carModel.count = jest.fn().mockResolvedValue(mockCarCount);
      carController.buildPaginationObject = jest.fn().mockReturnValue(mockPagination);

      await carController.handleListCars(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        cars: mockCars,
        meta: {
          pagination: mockPagination,
        },
      });
    });
  });

  describe('#handleGetCar', () => {
    it('should call res.status(200) and res.json with the car', async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockCar = { id: 1, name: 'Car 1' };

      carController.getCarFromRequest = jest.fn().mockResolvedValue(mockCar);

      await carController.handleGetCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCar);
    });
  });

  describe('#handleCreateCar', () => {
    it('should call res.status(201) and res.json with the created car', async () => {
      const mockRequest = {
        body: {
          name: 'Car 1',
          price: 100,
          size: 'Medium',
          image: 'car1.jpg',
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockCreatedCar = { id: 1, name: 'Car 1', price: 100, size: 'Medium', image: 'car1.jpg' };

      carController.carModel.create = jest.fn().mockResolvedValue(mockCreatedCar);

      await carController.handleCreateCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedCar);
    });

    it('should call res.status(422) and res.json with the error if an error occurs', async () => {
      const mockRequest = {
        body: {
          name: 'Car 1',
          price: 100,
          size: 'Medium',
          image: 'car1.jpg',
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockError = new Error('Validation error');

      carController.carModel.create = jest.fn().mockRejectedValue(mockError);

      await carController.handleCreateCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: mockError.name,
          message: mockError.message,
        },
      });
    });
  });

  describe('#handleRentCar', () => {
    it('should call res.status(201) and res.json with the userCar instance', async () => {
      // TODO: Write the test case for handleRentCar
    });

    it('should call res.status(422) and res.json with CarAlreadyRentedError instance if the car is already rented', async () => {
      // TODO: Write the test case for handleRentCar when the car is already rented
    });

    it('should call next with the error instance if an error occurs', async () => {
      // TODO: Write the test case for handleRentCar error case
    });
  });

  describe('#handleUpdateCar', () => {
    it('should call res.status(200) and res.json with the updated car', async () => {
      // TODO: Write the test case for handleUpdateCar
    });

    it('should call res.status(422) and res.json with the error if an error occurs', async () => {
      // TODO: Write the test case for handleUpdateCar error case
    });
  });

  describe('#handleDeleteCar', () => {
    it('should call res.status(204) and end the response', async () => {
      // TODO: Write the test case for handleDeleteCar
    });
  });
});

const { Car, UserCar } = require("../models")
const CarController = require("./CarController");

describe("CarController",  () => {
    describe("Constructor check", () => {
        it("constructor works", () => {
            const object = new CarController({
                carModel: "hino",
                userCarModel: "kuro",
                dayjs: 1,
            })
            expect(object.carModel).toBe("hino");
            expect(object.userCarModel).toBe("kuro");
            expect(object.dayjs).toBe(1);
        }) 
    })
    describe("handleListCar", () => {
        it("should call res.status(200) and res.json with queried list of car instances", async () => {
            const name = "kuro"
            const price = 5000
            const size = "small"
            const image= "image.jpg"
            const isCurrentlyRented = false
      
            const mockRequest = {
              query: {
                size: "small",
                availableAt: "05/05/2023"
              },
            };
            const mockCar = new Car({ name, price, size, image, isCurrentlyRented });
            const mockCarModel = { findAll: jest.fn().mockReturnValue(mockCar), count: jest.fn().mockReturnValue(Promise.resolve(0)) };
            mockCarCount = { count: jest.fn().mockReturnThis(mockCarModel)}

            const mockResponse = {};
            mockResponse.status = jest.fn().mockReturnThis();
            mockResponse.json = jest.fn().mockReturnThis();
      
            const carController = new CarController({ carModel: mockCarModel });
            await carController.handleListCars(mockRequest, mockResponse);

            expect(mockCarModel.findAll).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        })
    })
    describe("handleGetCar", () => {
        it("should call res.status(200) and res.json with car instance", async () => {
            const name = "kuro"
            const price = 5000
            const size = "small"
            const image= "image.jpg"
            const isCurrentlyRented = false
      
            const mockRequest = {
              params: {
                id: 1,
              },
            };
      
            const mockCar = new Car({ name, price, size, image, isCurrentlyRented });
            const mockCarModel = {};
            mockCarModel.findByPk = jest.fn().mockReturnValue(mockCar);
            mockCarModel.count = jest.fn().mockReturnThis();
      
            const mockResponse = {};
            mockResponse.status = jest.fn().mockReturnThis();
            mockResponse.json = jest.fn().mockReturnThis();
      
            const carController = new CarController({ carModel: mockCarModel });
            await carController.getCarFromRequest(mockRequest);
            await carController.handleGetCar(mockRequest, mockResponse);
      
            expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockCar);
          });      
    })
    describe("handleCreateCar", () => {
        it("should call res.status(201) and res.json with car instance", async () => {
            const name = "kuro"
            const price = 5000
            const size = "small"
            const image= "image.jpg"
            const isCurrentlyRented = false
            
            const mockRequest = {
                body: {
                    name: name,
                    price: price,
                    size: size,
                    image: image
                }
            };

            const car = new Car({ name, price, size, image, isCurrentlyRented });
            const mockCarModel = { create: jest.fn().mockReturnValue(car) };

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const carController = new CarController({ carModel: mockCarModel });

            await carController.handleCreateCar(mockRequest, mockResponse);

            expect(mockCarModel.create).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(car);
        });
        it("should call res.status(422) and res.json with car instance", async () => {
            const err = new Error("Something");
            const name = "kuro"
            const price = 5000
            const size = "small"
            const image= "image.jpg"
            const isCurrentlyRented = false
            
            const mockRequest = {
                body: {
                    name: name,
                    price: price,
                    size: size,
                    image: image
                }
            };

            const mockCarModel = { create: jest.fn().mockReturnValue(Promise.reject(err)),};

            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            const carController = new CarController({ carModel: mockCarModel });

            await carController.handleCreateCar(mockRequest, mockResponse);

            expect(mockCarModel.create).toHaveBeenCalledWith({
                name, price, size, image, isCurrentlyRented
            });
            expect(mockResponse.status).toHaveBeenCalledWith(422);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: {
                    name: err.name,
                    message: err.message,
                }          
            });
        })
    })
    describe("handleUpdateCar", () => {
        it("should call res.status(200) and res.json with car instance", async () => {
            const name = "kuro"
            const price = 5000
            const size = "small"
            const image= "image.jpg"
            const isCurrentlyRented = false
      
            const mockRequest = {
              params: {
                id: 1,
              },
              body: {
                name,
                price,
                size,
                image
              },
            };
      
            const mockCar = new Car({ name, price, size, image, isCurrentlyRented});
            mockCar.update = jest.fn().mockReturnThis();
      
            const mockCarModel = {};
            mockCarModel.findByPk = jest.fn().mockReturnValue(mockCar);
      
            const mockResponse = {};
            mockResponse.status = jest.fn().mockReturnThis();
            mockResponse.json = jest.fn().mockReturnThis();
      
            const carController = new CarController({ carModel: mockCarModel });
            await carController.handleUpdateCar(mockRequest, mockResponse);
      
            expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
            expect(mockCar.update).toHaveBeenCalledWith({ name, price, size, image, isCurrentlyRented });
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockCar);
          });
        it("should call res.status(422) and res.json with car instance", async () => {
            const name = "kuro"
            const price = 5000
            const size = "small"
            const image= "image.jpg"
            const isCurrentlyRented = false
            const err = new TypeError("Cannot read properties of null (reading 'update')");
      
            const mockRequest = {
              params: {
                id: 1,
              },
              body: {
                name,
                price,
                size,
                image
              },
            };            
            const mockCarModel = {};
            mockCarModel.findByPk = jest.fn().mockReturnValue(null);

            const mockResponse = {};
            mockResponse.status = jest.fn().mockReturnThis();
            mockResponse.json = jest.fn().mockReturnThis();
      
            const carController = new CarController({ carModel: mockCarModel });
            await carController.handleUpdateCar(mockRequest, mockResponse);
      
            expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(422);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: {
                    name: err.name,
                    message: err.message,
                },          
            });
          });
    })
    describe("handleDeleteCar", () => {
        it("should call res.status(204)", async () => {
            const name = "kuro"
            const price = 5000
            const size = "small"
            const image= "image.jpg"
            const isCurrentlyRented = false
      
            const mockRequest = {
              params: {
                id: 1,
              },
            };
      
            const mockCar = new Car({ name, price, size, image, isCurrentlyRented });
            mockCar.destroy = jest.fn();
      
            const mockResponse = {};
            mockResponse.status = jest.fn().mockReturnThis();
            mockResponse.end = jest.fn().mockReturnThis();

            const carController = new CarController({ carModel: mockCar });
            await carController.handleDeleteCar(mockRequest, mockResponse);
      
            expect(mockCar.destroy).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(204);
            expect(mockResponse.end).toHaveBeenCalled();
          });      
    })
})
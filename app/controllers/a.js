// Berikut ada contoh kode file TaskController.spec.js untuk testing file TaskController.js :
const { Task } = require("../models");
const TaskController = require("./TaskController");

describe("TaskController", () => {
  describe("#handleCreateTask", () => {
    it("should call res.status(200) and res.json with list of task instances", async () => {
      const name = "Hello";
      const prompt = "World";

      const mockRequest = {};

      const tasks = [];

      for (let i = 0; i < 10; i++) {
        const task = new Task({ name, prompt });
        tasks.push(task);
      }

      const mockTaskModel = { findAll: jest.fn().mockReturnValue(tasks) };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const taskController = new TaskController({ taskModel: mockTaskModel });

      await taskController.handleListTasks(mockRequest, mockResponse);

      expect(mockTaskModel.findAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(tasks);
    });
  });

  describe("#handleCreateTask", () => {
    it("should call res.status(201) and res.json with task instance", async () => {
      const name = "Hello";
      const prompt = "World";

      const mockRequest = {
        body: {
          name,
          prompt,
        },
      };

      const task = new Task({ name, prompt });
      const mockTaskModel = { create: jest.fn().mockReturnValue(task) };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const taskController = new TaskController({ taskModel: mockTaskModel });

      await taskController.handleCreateTask(mockRequest, mockResponse);

      expect(mockTaskModel.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(task);
    });

    it("should call res.status(422) and res.json with task instance", async () => {
      const err = new Error("Something");
      const name = "Hello";
      const prompt = "World";

      const mockRequest = {
        body: {
          name,
          prompt,
        },
      };

      const mockTaskModel = {
        create: jest.fn().mockReturnValue(Promise.reject(err)),
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const taskController = new TaskController({ taskModel: mockTaskModel });

      await taskController.handleCreateTask(mockRequest, mockResponse);

      expect(mockTaskModel.create).toHaveBeenCalledWith({
        name,
        prompt,
      });
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
        },
      });
    });
  });

  describe("#handleGetTask", () => {
    it("should call res.status(200) and res.json with task instance", async () => {
      const name = "Hello";
      const prompt = "World";

      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockTask = new Task({ name, prompt });
      const mockTaskModel = {};
      mockTaskModel.findByPk = jest.fn().mockReturnValue(mockTask);

      const mockResponse = {};
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn().mockReturnThis();

      const taskController = new TaskController({ taskModel: mockTaskModel });
      await taskController.handleGetTask(mockRequest, mockResponse);

      expect(mockTaskModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
    });

    it("should call res.status(404) and res.json with error instance", async () => {
      const err = new Error("Not found!");

      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockTaskModel = {};
      mockTaskModel.findByPk = jest.fn(() => Promise.reject(err));

      const mockResponse = {};
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn().mockReturnThis();

      const taskController = new TaskController({ taskModel: mockTaskModel });
      await taskController.handleGetTask(mockRequest, mockResponse);

      expect(mockTaskModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
        },
      });
    });
  });

  describe("#handleUpdateTask", () => {
    it("should call res.status(200) and res.json with task instance", async () => {
      const name = "Hello";
      const prompt = "World";

      const mockRequest = {
        params: {
          id: 1,
        },
        body: {
          name,
          prompt,
        },
      };

      const mockTask = new Task({ name, prompt });
      mockTask.update = jest.fn().mockReturnThis();

      const mockTaskModel = {};
      mockTaskModel.findByPk = jest.fn().mockReturnValue(mockTask);

      const mockResponse = {};
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn().mockReturnThis();

      const taskController = new TaskController({ taskModel: mockTaskModel });
      await taskController.handleUpdateTask(mockRequest, mockResponse);

      expect(mockTaskModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockTask.update).toHaveBeenCalledWith({ name, prompt });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
    });

    it("should call res.status(422) and res.json with error instance", async () => {
      const name = "Hello";
      const prompt = "World";
      const err = new Error("Something");

      const mockRequest = {
        params: {
          id: 1,
        },
        body: {
          name,
          prompt,
        },
      };

      const mockTaskModel = {};
      mockTaskModel.findByPk = jest.fn(() => Promise.reject(err));

      const mockResponse = {};
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn().mockReturnThis();

      const taskController = new TaskController({ taskModel: mockTaskModel });
      await taskController.handleUpdateTask(mockRequest, mockResponse);

      expect(mockTaskModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
        },
      });
    });
  });

  describe("#handleDeleteTask", () => {
    it("should call res.status(204)", async () => {
      const name = "Hello";
      const prompt = "World";

      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockTask = new Task({ name, prompt });
      mockTask.destroy = jest.fn();

      const mockTaskModel = {};
      mockTaskModel.findByPk = jest.fn().mockReturnValue(mockTask);

      const mockResponse = {};
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.end = jest.fn().mockReturnThis();

      const taskController = new TaskController({ taskModel: mockTaskModel });
      await taskController.handleDeleteTask(mockRequest, mockResponse);

      expect(mockTaskModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockTask.destroy).toHaveBeenCalledWith();
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.end).toHaveBeenCalled();
    });

    it("should call res.status(404) and res.json with error instance", async () => {
      const err = new Error("Not found!");

      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockTaskModel = {};
      mockTaskModel.findByPk = jest.fn(() => Promise.reject(err));

      const mockResponse = {};
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn().mockReturnThis();

      const taskController = new TaskController({ taskModel: mockTaskModel });
      await taskController.handleDeleteTask(mockRequest, mockResponse);

      expect(mockTaskModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
        },
      });
    });
  });
});


//Import dari router pada folder models berikut :

const express = require("express");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const bcrypt = require("bcryptjs");

const {
  ApplicationController,
  AuthenticationController,
  CarController,
} = require("./controllers");

const {
  User,
  Role,
  Car,
  UserCar,
} = require("./models");

function apply(app) {
  const carModel = Car;
  const roleModel = Role;
  const userModel = User;
  const userCarModel = UserCar;

  const applicationController = new ApplicationController();
  const authenticationController = new AuthenticationController({ bcrypt, jwt, roleModel, userModel, });
  const carController = new CarController({ carModel, userCarModel, dayjs });

  const accessControl = authenticationController.accessControl;

  app.get("/", applicationController.handleGetRoot);

  app.get("/v1/cars", carController.handleListCars);
  app.post("/v1/cars", authenticationController.authorize(accessControl.ADMIN), carController.handleCreateCar);
  app.post("/v1/cars/:id/rent", authenticationController.authorize(accessControl.CUSTOMER), carController.handleRentCar);
  app.get("/v1/cars/:id", carController.handleGetCar);
  app.put("/v1/cars/:id", authenticationController.authorize(accessControl.ADMIN), carController.handleUpdateCar);
  app.delete("/v1/cars/:id", authenticationController.authorize(accessControl.ADMIN), carController.handleDeleteCar);

  app.post("/v1/auth/login", authenticationController.handleLogin);
  app.post("/v1/auth/register", authenticationController.handleRegister);
  app.get("/v1/auth/whoami", authenticationController.authorize(accessControl.CUSTOMER), authenticationController.handleGetUser);

  app.use(applicationController.handleNotFound);
  app.use(applicationController.handleError);

  return app;
};

module.exports = { apply, }


// buatakan file CarController.spec.js untuk testing file CarController.js berikut menggunakan jest :

const { Op } = require("sequelize");
const ApplicationController = require("./ApplicationController");

class CarController extends ApplicationController {
  constructor({ carModel, userCarModel, dayjs }) {
    super();
    this.carModel = carModel;
    this.userCarModel = userCarModel;
    this.dayjs = dayjs;
  }

  handleListCars = async (req, res) => {
    const offset = this.getOffsetFromRequest(req);
    const limit = req.query.pageSize;
    const query = this.getListQueryFromRequest(req);
    const cars = await this.carModel.findAll(query);
    const carCount = await this.carModel.count({ where: query.where, include: query.include, });
    const pagination = this.buildPaginationObject(req, carCount);

    res.status(200).json({
      cars,
      meta: {
        pagination,
      }
    });
  }

  handleGetCar = async (req, res) => {
    const car = await this.getCarFromRequest(req); 

    res.status(200).json(car);
  }

  handleCreateCar = async (req, res) => {
    try {
      const {
        name,
        price,
        size,
        image,
      } = req.body;

      const car = await this.carModel.create({
        name,
        price,
        size,
        image,
        isCurrentlyRented: false,
      });

      res.status(201).json(car);
    }

    catch(err) {
      res.status(422).json({
        error: {
          name: err.name,
          message: err.message,
        }
      });
    }
  }

  handleRentCar = async (req, res, next) => {
    try {
      let { rentStartedAt, rentEndedAt } = req.body;
      const car = await this.getCarFromRequest(req)

      if (!rentEndedAt) rentEndedAt = this.dayjs(rentStartedAt).add(1, "day");

      const activeRent = await this.userCarModel.findOne({
        where: {
          carId: car.id,
          rentStartedAt: {
            [Op.gte]: rentStartedAt,
          },
          rentEndedAt: {
            [Op.lte]: rentEndedAt, 
          }
        }
      });

      if (!!activeRent) {
        const err = new CarAlreadyRentedError(car);
        res.status(422).json(err)
        return;
      }

      const userCar = await this.userCarModel.create({
        userId: req.user.id,
        carId: car.id,
        rentStartedAt,
        rentEndedAt,
      });

      res.status(201).json(userCar)
    }

    catch(err) {
      next(err);
    }
  }

  handleUpdateCar = async (req, res) => {
    try {
      const {
        name,
        price,
        size,
        image,
      } = req.body;

      const car = this.getCarFromRequest(req);

      await car.update({
        name,
        price,
        size,
        image,
        isCurrentlyRented: false,
      });

      res.status(200).json(car);
    }

    catch(err) {
      res.status(422).json({
        error: {
          name: err.name,
          message: err.message,
        }
      });
    }
  }

  handleDeleteCar = async (req, res) => {
    const car = await this.carModel.destroy(req.params.id); 
    res.status(204).end();
  }

  getCarFromRequest(req) {
    return this.carModel.findByPk(req.params.id);
  }

  getListQueryFromRequest(req) {
    const { size, availableAt } = req.query;
    const offset = this.getOffsetFromRequest(req);
    const limit = req.query.pageSize || 10;
    const where = {};
    const include = {
      model: this.userCarModel,
      as: "userCar",
      required: false,
    }

    if (!!size) where.size = size;
    if (!!availableAt) {
      include.where = {
        rentEndedAt: {
          [Op.gte]: availableAt, 
        }
      }
    }

    const query = {
      include,
      where,
      limit,
      offset,
    };

    return query;
  }
}

module.exports = CarController;



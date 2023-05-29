const ApplicationController = require("./ApplicationController");
const { NotFoundError } = require("../errors");

describe("ApplicationController", () => {
  let applicationController;

  beforeEach(() => {
    applicationController = new ApplicationController();
  });

  describe("handleGetRoot", () => {
    it("should return status 200 and message 'BCR API is up and running!'", () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      applicationController.handleGetRoot(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "OK",
        message: "BCR API is up and running!",
      });
    });
  });

  describe("handleNotFound", () => {
    it("should return status 404 and an error object with the correct name, message, and details", () => {
      const req = {
        method: "GET",
        url: "/not-found",
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedError = new NotFoundError(req.method, req.url);

      applicationController.handleNotFound(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          name: expectedError.name,
          message: expectedError.message,
          details: expectedError.details,
        },
      });
    });
  });

  describe("handleError", () => {
    it("should return status 500 and an error object with the correct name, message, and details", () => {
      const err = new Error("Test error");
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      applicationController.handleError(err, req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
          details: err.details || null,
        },
      });
    });
  });

  describe("getOffsetFromRequest", () => {
    it("should return the correct offset value based on the page and pageSize query parameters", () => {
      const req = { query: { page: "2", pageSize: "10" } };
      const expectedOffset = 10;

      const offset = applicationController.getOffsetFromRequest(req);

      expect(offset).toEqual(expectedOffset);
    });
  });

  describe("buildPaginationObject", () => {
    it("should return an object with the correct properties based on the count and query parameters", () => {
      const req = { query: { page: "2", pageSize: "10" } };
      const count = 25;
      const expectedPaginationObject = {
        page: "2",
        pageCount: 3,
        pageSize: "10",
        count,
      };

      const paginationObject = applicationController.buildPaginationObject(req, count);

      expect(paginationObject).toEqual(expectedPaginationObject);
    });
  });
});
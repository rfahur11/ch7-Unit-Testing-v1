const {
    ApplicationController,
    AuthenticationController,
    CarController,
  } = require("./index");
  
  describe("index", () => {
    it("should export ApplicationController", () => {
      expect(ApplicationController).toBeDefined();
    });
  
    it("should export AuthenticationController", () => {
      expect(AuthenticationController).toBeDefined();
    });
  
    it("should export CarController", () => {
      expect(CarController).toBeDefined();
    });
  });
  
  

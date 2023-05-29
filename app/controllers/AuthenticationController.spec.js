const AuthenticationController = require('./AuthenticationController');
const { EmailNotRegisteredError, WrongPasswordError } = require('../errors');

describe('AuthenticationController', () => {
  let controller;

  beforeEach(() => {
    controller = new AuthenticationController({
      userModel: {},
      roleModel: {},
      bcrypt: {},
      jwt: {},
    });
  });

  describe('handleLogin', () => {
    it('should return an error if email is not registered', async () => {
      const req = { body: { email: 'test@test.com', password: 'password' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      controller.userModel.findOne = jest.fn().mockReturnValue(null);

      await controller.handleLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(new EmailNotRegisteredError(req.body.email));
    });

    it('should return an error if password is incorrect', async () => {
      const req = { body: { email: 'test@test.com', password: 'password' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      controller.userModel.findOne = jest.fn().mockReturnValue({ encryptedPassword: 'encryptedPassword' });
      controller.verifyPassword = jest.fn().mockReturnValue(false);

      await controller.handleLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(new WrongPasswordError());
    });

    it('should return an access token if email and password are correct', async () => {
      const req = { body: { email: 'test@test.com', password: 'password' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      controller.userModel.findOne = jest.fn().mockReturnValue({ Role: {} });
      controller.verifyPassword = jest.fn().mockReturnValue(true);
      controller.createTokenFromUser = jest.fn().mockReturnValue('accessToken');

      await controller.handleLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ accessToken: 'accessToken' });
    });
  });
});

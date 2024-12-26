import { validateSignUp, validateSignIn } from "../validationMiddleware";

describe("Validation Middleware", () => {
  let mockRequest;
  let mockResponse;
  let nextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {
        username: "testuser",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        citizenId: "1234567890",
        email: "john@example.com",
        phoneNumber: "1234567890",
        userAddress: "123 Test St",
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  describe("validateSignUp", () => {
    test("should pass valid signup data", () => {
      validateSignUp(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });

    test("should fail with missing fields", () => {
      mockRequest.body = {};
      validateSignUp(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "All fields are required",
      });
    });

    test("should fail with invalid email", () => {
      mockRequest.body.email = "invalid-email";
      validateSignUp(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid email format",
      });
    });

    test("should fail with short password", () => {
      mockRequest.body.password = "123";
      validateSignUp(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    });

    test("should fail with invalid phone number", () => {
      mockRequest.body.phoneNumber = "abc";
      validateSignUp(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid phone number format",
      });
    });
  });

  describe("validateSignIn", () => {
    test("should pass valid signin data", () => {
      validateSignIn(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });

    test("should fail with missing username", () => {
      mockRequest.body = { password: "password123" };
      validateSignIn(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Username and password are required",
      });
    });

    test("should fail with missing password", () => {
      mockRequest.body = { username: "testuser" };
      validateSignIn(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Username and password are required",
      });
    });
  });
});

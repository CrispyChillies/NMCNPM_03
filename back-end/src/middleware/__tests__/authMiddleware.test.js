import jwt from "jsonwebtoken";
import { verifyToken, isAdmin, isActive } from "../authMiddleware";
import { connectDB } from "../../config/connectDB";

// Mock the database connection and queries
jest.mock("../../config/connectDB");

describe("Auth Middleware", () => {
  let mockRequest;
  let mockResponse;
  let nextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {
        authorization: "Bearer valid-token",
      },
      userId: 1,
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
    process.env.JWT_SECRET = "test-secret";
  });

  describe("verifyToken", () => {
    test("should verify valid token", async () => {
      const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);
      mockRequest.headers.authorization = `Bearer ${token}`;

      await verifyToken(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });

    test("should fail with no token", async () => {
      mockRequest.headers = {};
      await verifyToken(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "No token provided",
      });
    });

    test("should fail with invalid token", async () => {
      mockRequest.headers.authorization = "Bearer invalid-token";
      await verifyToken(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Invalid token",
      });
    });
  });

  describe("isAdmin", () => {
    test("should pass for admin user", async () => {
      const mockPool = {
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({ recordset: [{ role: "admin" }] }),
      };
      connectDB.mockResolvedValue(mockPool);

      await isAdmin(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });

    test("should fail for non-admin user", async () => {
      const mockPool = {
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({ recordset: [] }),
      };
      connectDB.mockResolvedValue(mockPool);

      await isAdmin(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Access denied",
      });
    });
  });
});

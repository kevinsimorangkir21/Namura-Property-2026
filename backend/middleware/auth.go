package middleware

import (
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

// AuthRequired returns a Fiber middleware handler that validates JWT tokens.
// It extracts the token from "Authorization: Bearer <token>" header,
// verifies signature and expiration, and stores user claims in Locals.
func AuthRequired(jwtSecret string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Check for Authorization header presence
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "authentication credentials are missing",
			})
		}

		// Check "Bearer " prefix
		if !strings.HasPrefix(authHeader, "Bearer ") {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "invalid authorization format",
			})
		}

		// Extract token string
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "authentication credentials are missing",
			})
		}

		// Parse and validate token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Ensure signing method is HMAC
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fiber.NewError(fiber.StatusUnauthorized, "invalid token signing method")
			}
			return []byte(jwtSecret), nil
		})

		if err != nil {
			// Check if the error is due to token expiration
			if strings.Contains(err.Error(), "token is expired") {
				return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
					"error": "token has expired",
				})
			}
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "token is invalid",
			})
		}

		if !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "token is invalid",
			})
		}

		// Extract claims
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "token is invalid",
			})
		}

		// Extract user_id (stored as float64 in JSON)
		userIDFloat, ok := claims["user_id"].(float64)
		if !ok {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "token is invalid",
			})
		}
		userID := uint(userIDFloat)

		// Extract user_name
		userName, ok := claims["user_name"].(string)
		if !ok {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "token is invalid",
			})
		}

		// Store user claims in Fiber Locals
		c.Locals("user_id", userID)
		c.Locals("user_name", userName)

		return c.Next()
	}
}

// GenerateToken creates a JWT token with user_id and user_name claims.
// The token expires 24 hours from the time of issuance.
func GenerateToken(userID uint, userName string, jwtSecret string) (string, error) {
	claims := jwt.MapClaims{
		"user_id":   userID,
		"user_name": userName,
		"exp":       time.Now().Add(24 * time.Hour).Unix(),
		"iat":       time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(jwtSecret))
}

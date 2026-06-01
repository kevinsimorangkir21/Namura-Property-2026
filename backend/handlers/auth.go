package handlers

import (
	"strings"

	"namura-api/backend/database"
	"namura-api/backend/middleware"
	"namura-api/backend/models"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

// JWTSecret holds the JWT signing secret, set from main.go during startup.
var JWTSecret string

// LoginRequest represents the expected request body for login.
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Login authenticates a user by email and password, returning a JWT token on success.
func Login(c *fiber.Ctx) error {
	var req LoginRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "email and password are required",
		})
	}

	// Validate required fields
	if strings.TrimSpace(req.Email) == "" || strings.TrimSpace(req.Password) == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "email and password are required",
		})
	}

	// Look up user by email
	var user models.User
	result := database.DB.Where("email = ?", req.Email).First(&user)
	if result.Error != nil {
		// User not found - return generic invalid credentials
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "invalid credentials",
		})
	}

	// Compare password with bcrypt hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		// Wrong password - return same generic error
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "invalid credentials",
		})
	}

	// Generate JWT token with 24-hour expiration
	token, err := middleware.GenerateToken(user.ID, user.Name, JWTSecret)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to generate token",
		})
	}

	// Return token and user object
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"token": token,
		"user": fiber.Map{
			"id":   user.ID,
			"name": user.Name,
		},
	})
}

package handlers

import (
	"strconv"
	"strings"

	"namura-api/backend/database"
	"namura-api/backend/models"
	"namura-api/backend/utils"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

// CreateUserRequest represents the expected request body for creating a user.
type CreateUserRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
	Status   string `json:"status"`
}

// UpdateUserRequest represents the expected request body for updating a user.
type UpdateUserRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
	Status   string `json:"status"`
}

// GetUsers returns all users without password fields.
func GetUsers(c *fiber.Ctx) error {
	var users []models.User

	if err := database.DB.Find(&users).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to fetch users",
		})
	}

	return c.JSON(users)
}

// CreateUser validates input, hashes the password, and creates a new user.
func CreateUser(c *fiber.Ctx) error {
	var req CreateUserRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid request body",
		})
	}

	// Validate fields
	details := make(map[string]string)

	name := strings.TrimSpace(req.Name)
	if name == "" || len(name) > 255 {
		if name == "" {
			details["name"] = "name is required"
		} else {
			details["name"] = "name must not exceed 255 characters"
		}
	}

	email := strings.TrimSpace(req.Email)
	if email == "" {
		details["email"] = "email is required"
	} else if !utils.ValidateEmail(email) {
		details["email"] = "email format is invalid"
	}

	if req.Password == "" {
		details["password"] = "password is required"
	} else if len(req.Password) < 8 {
		details["password"] = "password must be at least 8 characters"
	}

	if strings.TrimSpace(req.Role) == "" {
		details["role"] = "role is required"
	}

	if strings.TrimSpace(req.Status) == "" {
		details["status"] = "status is required"
	}

	if len(details) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "validation failed",
			"details": details,
		})
	}

	// Check email uniqueness
	var existing models.User
	if err := database.DB.Where("email = ?", email).First(&existing).Error; err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": "email already in use",
		})
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to hash password",
		})
	}

	user := models.User{
		Name:     name,
		Email:    email,
		Password: string(hashedPassword),
		Role:     strings.TrimSpace(req.Role),
		Status:   strings.TrimSpace(req.Status),
	}

	if err := database.DB.Create(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to create user",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(user)
}

// UpdateUser finds a user by ID, validates input, and updates the record.
func UpdateUser(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid user ID",
		})
	}

	var user models.User
	if err := database.DB.First(&user, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "user not found",
		})
	}

	var req UpdateUserRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid request body",
		})
	}

	// Check email uniqueness if email is being changed
	email := strings.TrimSpace(req.Email)
	if email != "" && email != user.Email {
		if !utils.ValidateEmail(email) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error":   "validation failed",
				"details": map[string]string{"email": "email format is invalid"},
			})
		}
		var existing models.User
		if err := database.DB.Where("email = ? AND id != ?", email, id).First(&existing).Error; err == nil {
			return c.Status(fiber.StatusConflict).JSON(fiber.Map{
				"error": "email already in use",
			})
		}
		user.Email = email
	}

	// Update fields if provided
	if name := strings.TrimSpace(req.Name); name != "" {
		user.Name = name
	}

	if strings.TrimSpace(req.Role) != "" {
		user.Role = strings.TrimSpace(req.Role)
	}

	if strings.TrimSpace(req.Status) != "" {
		user.Status = strings.TrimSpace(req.Status)
	}

	// Hash new password if provided
	if req.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "failed to hash password",
			})
		}
		user.Password = string(hashedPassword)
	}

	if err := database.DB.Save(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to update user",
		})
	}

	return c.JSON(user)
}

// DeleteUser finds a user by ID and deletes the record.
func DeleteUser(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid user ID",
		})
	}

	var user models.User
	if err := database.DB.First(&user, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "user not found",
		})
	}

	if err := database.DB.Delete(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to delete user",
		})
	}

	return c.JSON(fiber.Map{
		"message": "user deleted successfully",
	})
}

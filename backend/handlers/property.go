package handlers

import (
	"strconv"
	"strings"

	"namura-api/backend/database"
	"namura-api/backend/models"
	"namura-api/backend/utils"

	"github.com/gofiber/fiber/v2"
)

// GetProperties returns all property records as a JSON array.
func GetProperties(c *fiber.Ctx) error {
	var properties []models.Property

	result := database.DB.Find(&properties)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "internal server error",
		})
	}

	return c.JSON(properties)
}

// GetProperty returns a single property by ID.
func GetProperty(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid property ID",
		})
	}

	var property models.Property
	result := database.DB.First(&property, id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "property not found",
		})
	}

	return c.JSON(property)
}

// CreateProperty creates a new property record with validation.
func CreateProperty(c *fiber.Ctx) error {
	var property models.Property

	if err := c.BodyParser(&property); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid request body",
		})
	}

	// Validate required fields and constraints
	errors := validateProperty(&property)
	if len(errors) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "validation failed",
			"details": errors,
		})
	}

	// Generate slug from title
	property.Slug = utils.GenerateSlug(property.Title, 200)

	// Create the property in the database
	result := database.DB.Create(&property)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "internal server error",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(property)
}

// GetPropertyBySlug returns a single property by its slug.
func GetPropertyBySlug(c *fiber.Ctx) error {
	slug := c.Params("slug")
	if slug == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "slug is required",
		})
	}

	var property models.Property
	result := database.DB.Where("slug = ?", slug).First(&property)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "property not found",
		})
	}

	return c.JSON(property)
}

// UpdateProperty updates an existing property by ID.
func UpdateProperty(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid property ID",
		})
	}

	// Find existing property
	var property models.Property
	result := database.DB.First(&property, id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "property not found",
		})
	}

	oldTitle := property.Title

	// Parse update data
	if err := c.BodyParser(&property); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid request body",
		})
	}

	// Regenerate slug if title changed
	if property.Title != oldTitle && strings.TrimSpace(property.Title) != "" {
		property.Slug = utils.GenerateSlug(property.Title, 200)
	}

	// Save updated property
	result = database.DB.Save(&property)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "internal server error",
		})
	}

	return c.JSON(property)
}

// DeleteProperty deletes a property by ID.
func DeleteProperty(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid property ID",
		})
	}

	var property models.Property
	result := database.DB.First(&property, id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "property not found",
		})
	}

	database.DB.Delete(&property)

	return c.JSON(fiber.Map{
		"message": "property deleted successfully",
	})
}

// validateProperty checks required fields, numeric constraints, and field lengths.
func validateProperty(p *models.Property) map[string]string {
	errors := make(map[string]string)

	// Required fields
	if strings.TrimSpace(p.Title) == "" {
		errors["title"] = "title is required"
	}
	if strings.TrimSpace(p.Type) == "" {
		errors["type"] = "type is required"
	}
	if strings.TrimSpace(p.Status) == "" {
		errors["status"] = "status is required"
	}
	if strings.TrimSpace(p.Location) == "" {
		errors["location"] = "location is required"
	}

	// Numeric fields must be non-negative
	if p.Price < 0 {
		errors["price"] = "price must be non-negative"
	}
	if p.Bedrooms < 0 {
		errors["bedrooms"] = "bedrooms must be non-negative"
	}
	if p.Bathrooms < 0 {
		errors["bathrooms"] = "bathrooms must be non-negative"
	}
	if p.Garage < 0 {
		errors["garage"] = "garage must be non-negative"
	}
	if p.BuildingArea < 0 {
		errors["building_area"] = "building_area must be non-negative"
	}
	if p.LandArea < 0 {
		errors["land_area"] = "land_area must be non-negative"
	}

	// Field length constraints
	if len(p.Title) > 255 {
		errors["title"] = "title must not exceed 255 characters"
	}
	if len(p.Description) > 5000 {
		errors["description"] = "description must not exceed 5000 characters"
	}

	return errors
}

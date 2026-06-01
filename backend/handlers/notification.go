package handlers

import (
	"strconv"
	"strings"

	"namura-api/backend/database"
	"namura-api/backend/models"

	"github.com/gofiber/fiber/v2"
)

// GetNotifications returns all notifications from the database.
func GetNotifications(c *fiber.Ctx) error {
	var notifications []models.Notification

	result := database.DB.Find(&notifications)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to fetch notifications",
		})
	}

	return c.JSON(notifications)
}

// CreateNotification validates input and creates a new notification record.
func CreateNotification(c *fiber.Ctx) error {
	var notification models.Notification

	if err := c.BodyParser(&notification); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid request body",
		})
	}

	// Validate required fields
	details := make(map[string]string)

	if strings.TrimSpace(notification.Title) == "" {
		details["title"] = "title is required"
	} else if len(notification.Title) > 255 {
		details["title"] = "title must not exceed 255 characters"
	}

	if strings.TrimSpace(notification.Message) == "" {
		details["message"] = "message is required"
	} else if len(notification.Message) > 1000 {
		details["message"] = "message must not exceed 1000 characters"
	}

	if strings.TrimSpace(notification.Status) == "" {
		details["status"] = "status is required"
	}

	if len(details) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "validation failed",
			"details": details,
		})
	}

	result := database.DB.Create(&notification)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to create notification",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(notification)
}

// DeleteNotification deletes a notification by ID.
func DeleteNotification(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid notification ID",
		})
	}

	var notification models.Notification
	result := database.DB.First(&notification, id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "notification not found",
		})
	}

	database.DB.Delete(&notification)

	return c.JSON(fiber.Map{
		"message": "notification deleted successfully",
	})
}

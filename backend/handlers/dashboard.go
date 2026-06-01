package handlers

import (
	"namura-api/backend/database"
	"namura-api/backend/models"

	"github.com/gofiber/fiber/v2"
)

// GetDashboardStats returns aggregate counts for properties, articles, users, and notifications.
func GetDashboardStats(c *fiber.Ctx) error {
	var totalProperties, totalArticles, totalUsers, totalNotifications int64

	if err := database.DB.Model(&models.Property{}).Count(&totalProperties).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to count properties",
		})
	}

	if err := database.DB.Model(&models.Article{}).Count(&totalArticles).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to count articles",
		})
	}

	if err := database.DB.Model(&models.User{}).Count(&totalUsers).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to count users",
		})
	}

	if err := database.DB.Model(&models.Notification{}).Count(&totalNotifications).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to count notifications",
		})
	}

	return c.JSON(fiber.Map{
		"total_properties":    totalProperties,
		"total_articles":      totalArticles,
		"total_users":         totalUsers,
		"total_notifications": totalNotifications,
	})
}

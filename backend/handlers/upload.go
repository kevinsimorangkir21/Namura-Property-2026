package handlers

import (
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"namura-api/backend/database"
	"namura-api/backend/models"

	"github.com/gofiber/fiber/v2"
)

// allowedImageTypes defines the accepted content types for image uploads.
var allowedImageTypes = map[string]bool{
	"image/jpeg": true,
	"image/png":  true,
	"image/webp": true,
}

// maxFileSize is the maximum allowed upload size (10 MB).
const maxFileSize = 10 * 1024 * 1024

// UploadPropertyImage handles multipart/form-data image upload for a property.
func UploadPropertyImage(c *fiber.Ctx) error {
	// 1. Get property ID from URL params
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid property ID",
		})
	}

	// 2. Find property in DB
	var property models.Property
	result := database.DB.First(&property, id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "property not found",
		})
	}

	// 3. Get file from form field "image"
	file, err := c.FormFile("image")
	if err != nil || file == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "no file provided",
		})
	}

	// 4. Validate content type
	contentType := file.Header.Get("Content-Type")
	if !allowedImageTypes[contentType] {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "file type not allowed",
		})
	}

	// 5. Validate file size
	if file.Size > maxFileSize {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "file exceeds maximum allowed size",
		})
	}

	// 6. Sanitize filename to prevent path traversal
	filename := filepath.Base(file.Filename)
	filename = strings.ReplaceAll(filename, "\\", "_")
	filename = strings.ReplaceAll(filename, "/", "_")
	filename = strings.ReplaceAll(filename, "..", "_")

	// 7. Generate unique filename with timestamp to avoid collisions
	ext := filepath.Ext(filename)
	nameWithoutExt := strings.TrimSuffix(filename, ext)
	uniqueFilename := fmt.Sprintf("%d_%s%s", time.Now().UnixNano(), nameWithoutExt, ext)

	// 8. Ensure uploads directory exists
	uploadDir := "./uploads"
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "server storage failure",
		})
	}

	// 9. Save file to uploads directory
	savePath := filepath.Join(uploadDir, uniqueFilename)
	if err := c.SaveFile(file, savePath); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "server storage failure",
		})
	}

	// 10. Update property record with image path
	relativePath := "uploads/" + uniqueFilename
	property.Image = relativePath
	if err := database.DB.Save(&property).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "server storage failure",
		})
	}

	// 11. Return success with image path
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"image": relativePath,
	})
}

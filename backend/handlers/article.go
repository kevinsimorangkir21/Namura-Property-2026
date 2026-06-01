package handlers

import (
	"fmt"
	"strconv"
	"strings"

	"namura-api/backend/database"
	"namura-api/backend/models"
	"namura-api/backend/utils"

	"github.com/gofiber/fiber/v2"
)

// GetArticles returns all articles with their author information preloaded.
func GetArticles(c *fiber.Ctx) error {
	var articles []models.Article
	result := database.DB.Preload("Author").Find(&articles)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to fetch articles",
		})
	}
	return c.JSON(articles)
}

// GetArticle returns a single article by ID.
func GetArticle(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid article ID",
		})
	}

	var article models.Article
	result := database.DB.Preload("Author").First(&article, id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "article not found",
		})
	}

	return c.JSON(article)
}

// CreateArticle creates a new article with slug generation and author assignment from JWT.
func CreateArticle(c *fiber.Ctx) error {
	var article models.Article
	if err := c.BodyParser(&article); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid request body",
		})
	}

	// Validate required fields
	details := make(map[string]string)
	if strings.TrimSpace(article.Title) == "" {
		details["title"] = "title is required"
	}
	if strings.TrimSpace(article.Content) == "" {
		details["content"] = "content is required"
	}
	if strings.TrimSpace(article.Status) == "" {
		details["status"] = "status is required"
	}

	if len(details) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "validation failed",
			"details": details,
		})
	}

	// Set AuthorID from JWT claims
	article.AuthorID = c.Locals("user_id").(uint)

	// Generate slug with uniqueness check
	baseSlug := utils.GenerateSlug(article.Title, 200)
	slug := baseSlug
	suffix := 2

	for {
		var existing models.Article
		result := database.DB.Where("slug = ?", slug).First(&existing)
		if result.Error != nil {
			// No existing article with this slug, we can use it
			break
		}
		// Slug exists, append suffix
		slug = fmt.Sprintf("%s-%d", baseSlug, suffix)
		suffix++
	}
	article.Slug = slug

	// Create the article
	result := database.DB.Create(&article)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to create article",
		})
	}

	// Preload author for response
	database.DB.Preload("Author").First(&article, article.ID)

	return c.Status(fiber.StatusCreated).JSON(article)
}

// GetArticleBySlug returns a single article by its slug.
func GetArticleBySlug(c *fiber.Ctx) error {
	slug := c.Params("slug")
	if slug == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "slug is required",
		})
	}

	var article models.Article
	result := database.DB.Preload("Author").Where("slug = ?", slug).First(&article)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "article not found",
		})
	}

	return c.JSON(article)
}

// UpdateArticle updates an existing article by ID.
func UpdateArticle(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid article ID",
		})
	}

	var article models.Article
	result := database.DB.First(&article, id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "article not found",
		})
	}

	oldTitle := article.Title

	if err := c.BodyParser(&article); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid request body",
		})
	}

	// Regenerate slug if title changed
	if article.Title != oldTitle && strings.TrimSpace(article.Title) != "" {
		baseSlug := utils.GenerateSlug(article.Title, 200)
		slug := baseSlug
		suffix := 2
		for {
			var existing models.Article
			res := database.DB.Where("slug = ? AND id != ?", slug, id).First(&existing)
			if res.Error != nil {
				break
			}
			slug = fmt.Sprintf("%s-%d", baseSlug, suffix)
			suffix++
		}
		article.Slug = slug
	}

	database.DB.Save(&article)

	// Preload author for response
	database.DB.Preload("Author").First(&article, article.ID)

	return c.JSON(article)
}

// DeleteArticle deletes an article by ID.
func DeleteArticle(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid article ID",
		})
	}

	var article models.Article
	result := database.DB.First(&article, id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "article not found",
		})
	}

	database.DB.Delete(&article)

	return c.JSON(fiber.Map{
		"message": "article deleted successfully",
	})
}

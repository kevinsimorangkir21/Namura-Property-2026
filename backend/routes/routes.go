package routes

import (
	"namura-api/backend/handlers"
	"namura-api/backend/middleware"

	"github.com/gofiber/fiber/v2"
)

// SetupRoutes registers all API routes on the Fiber app.
// Public routes are accessible without authentication.
// Protected routes require a valid JWT token via the AuthRequired middleware.
func SetupRoutes(app *fiber.App, jwtSecret string) {
	// Health check (public)
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Namura Property API is running"})
	})

	// Auth routes (public)
	app.Post("/api/auth/login", handlers.Login)

	// ─── Public Property routes (no auth required) ───
	app.Get("/api/properties", handlers.GetProperties)
	app.Get("/api/properties/slug/:slug", handlers.GetPropertyBySlug)
	app.Get("/api/properties/:id", handlers.GetProperty)

	// ─── Public Article routes (no auth required) ───
	app.Get("/api/articles", handlers.GetArticles)
	app.Get("/api/articles/slug/:slug", handlers.GetArticleBySlug)
	app.Get("/api/articles/:id", handlers.GetArticle)

	// ─── Protected routes - apply JWT middleware ───
	api := app.Group("/api", middleware.AuthRequired(jwtSecret))

	// Property write routes (protected)
	properties := api.Group("/properties")
	properties.Post("/", handlers.CreateProperty)
	properties.Put("/:id", handlers.UpdateProperty)
	properties.Delete("/:id", handlers.DeleteProperty)
	properties.Post("/:id/upload", handlers.UploadPropertyImage)

	// Article write routes (protected)
	articles := api.Group("/articles")
	articles.Post("/", handlers.CreateArticle)
	articles.Put("/:id", handlers.UpdateArticle)
	articles.Delete("/:id", handlers.DeleteArticle)

	// User routes (protected)
	users := api.Group("/users")
	users.Get("/", handlers.GetUsers)
	users.Post("/", handlers.CreateUser)
	users.Put("/:id", handlers.UpdateUser)
	users.Delete("/:id", handlers.DeleteUser)

	// Notification routes (protected)
	notifications := api.Group("/notifications")
	notifications.Get("/", handlers.GetNotifications)
	notifications.Post("/", handlers.CreateNotification)
	notifications.Delete("/:id", handlers.DeleteNotification)

	// Dashboard routes (protected)
	api.Get("/dashboard/stats", handlers.GetDashboardStats)
}

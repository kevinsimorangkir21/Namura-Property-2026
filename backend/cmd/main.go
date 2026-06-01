package main

import (
	"log"

	"namura-api/backend/config"
	"namura-api/backend/database"
	"namura-api/backend/handlers"
	"namura-api/backend/models"
	"namura-api/backend/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"golang.org/x/crypto/bcrypt"
)

func seedAdmin() {
	var count int64

	database.DB.Model(&models.User{}).Count(&count)

	// Kalau sudah ada user, jangan buat lagi
	if count > 0 {
		log.Println("admin already exists, skipping seed")
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte("123456"),
		bcrypt.DefaultCost,
	)

	if err != nil {
		log.Println("failed to hash password:", err)
		return
	}

	admin := models.User{
		Name:     "Administrator",
		Email:    "admin@namura.com",
		Password: string(hashedPassword),
		Role:     "admin",
		Status:   "active",
	}

	if err := database.DB.Create(&admin).Error; err != nil {
		log.Println("failed to create admin:", err)
		return
	}

	log.Println("default admin created")
}

func main() {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Connect to database
	if err := database.Connect(cfg); err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Create default admin
	seedAdmin()

	// Set JWT secret for handlers
	handlers.JWTSecret = cfg.JWTSecret

	// Create Fiber app
	app := fiber.New()

	// Configure CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Authorization,Content-Type",
	}))

	// Serve static uploads directory
	app.Static("/uploads", "./uploads")

	// Setup routes
	routes.SetupRoutes(app, cfg.JWTSecret)

	// Health Check
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Namura Property API is running",
		})
	})

	log.Println("Server running on :8080")
	log.Fatal(app.Listen(":8080"))
}
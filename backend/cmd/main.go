package main

import (
	"log"
	"os"

	"namura-api/backend/config"
	"namura-api/backend/database"
	"namura-api/backend/database/seeds"
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

	if count > 0 {
		log.Println("[SEED] Admin already exists, skipping")
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte("123456"), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("[SEED] Failed to hash password: %v", err)
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
		log.Printf("[SEED] Failed to create admin: %v", err)
		return
	}

	log.Println("[SEED] Default admin created (admin@namura.com / 123456)")
}

func main() {
	log.Println("[START] Namura Property API starting...")

	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("[CONFIG] Failed to load: %v", err)
	}
	log.Println("[CONFIG] Environment variables loaded")

	// Connect to database
	if err := database.Connect(cfg); err != nil {
		log.Fatalf("[DATABASE] Failed to connect: %v", err)
	}
	log.Println("[DATABASE] Connected and migrated successfully")

	// Seed admin user
	seedAdmin()

	// Seed legacy properties
	seeds.SeedProperties(database.DB)

	// Set JWT secret for handlers
	handlers.JWTSecret = cfg.JWTSecret

	// Create Fiber app
	app := fiber.New(fiber.Config{
		AppName: "Namura Property API",
	})

	// Configure CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Authorization,Content-Type",
	}))

	// Ensure uploads directory exists
	if err := os.MkdirAll("./uploads", 0755); err != nil {
		log.Printf("[UPLOADS] Warning: could not create uploads directory: %v", err)
	}

	// Serve static uploads directory
	app.Static("/uploads", "./uploads")

	// Setup routes
	routes.SetupRoutes(app, cfg.JWTSecret)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("[SERVER] Listening on :%s", port)
	log.Fatal(app.Listen(":" + port))
}

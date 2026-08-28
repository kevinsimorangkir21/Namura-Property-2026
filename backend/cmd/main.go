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

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte("123456"),
		bcrypt.DefaultCost,
	)

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

	// =========================================================
	// LOAD CONFIGURATION
	// =========================================================

	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("[CONFIG] Failed to load: %v", err)
	}

	log.Println("[CONFIG] Environment variables loaded")

	// =========================================================
	// CONNECT DATABASE
	// =========================================================

	if err := database.Connect(cfg); err != nil {
		log.Fatalf("[DATABASE] Failed to connect: %v", err)
	}

	log.Println("[DATABASE] Connected and migrated successfully")

	// =========================================================
	// SEED DATA
	// =========================================================

	seedAdmin()

	seeds.SeedProperties(database.DB)

	// =========================================================
	// JWT
	// =========================================================

	handlers.JWTSecret = cfg.JWTSecret

	// =========================================================
	// CREATE FIBER APP
	// =========================================================

	app := fiber.New(fiber.Config{
		AppName: "Namura Property API",
	})

	// =========================================================
	// CORS
	// =========================================================

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Authorization,Content-Type",
	}))

	// =========================================================
	// HEALTHCHECK
	// =========================================================

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":  "ok",
			"service": "Namura Property API",
		})
	})

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status": "ok",
		})
	})

	// =========================================================
	// UPLOADS
	// =========================================================

	if err := os.MkdirAll("./uploads", 0755); err != nil {
		log.Printf(
			"[UPLOADS] Warning: could not create uploads directory: %v",
			err,
		)
	}

	app.Static("/uploads", "./uploads")

	// =========================================================
	// API ROUTES
	// =========================================================

	routes.SetupRoutes(app, cfg.JWTSecret)

	// =========================================================
	// SERVER
	// =========================================================

	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	log.Printf("[SERVER] Listening on 0.0.0.0:%s", port)

	if err := app.Listen("0.0.0.0:" + port); err != nil {
		log.Fatalf("[SERVER] Failed to start: %v", err)
	}
}
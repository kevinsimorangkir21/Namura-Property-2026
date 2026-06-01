package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"namura-api/backend/config"
	"namura-api/backend/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DB is the global GORM database instance
var DB *gorm.DB

// Connect establishes a PostgreSQL connection with a 30-second timeout
// and runs AutoMigrate for all models
func Connect(cfg *config.Config) error {
	// Determine SSL mode: use "require" in production, "disable" locally
	sslMode := "disable"
	if sslEnv := os.Getenv("DB_SSLMODE"); sslEnv != "" {
		sslMode = sslEnv
	}

	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s connect_timeout=30",
		cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPass, cfg.DBName, sslMode,
	)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Printf("failed to connect to database: %v", err)
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	// Configure connection pool with 30-second timeout
	sqlDB, err := DB.DB()
	if err != nil {
		log.Printf("failed to get underlying sql.DB: %v", err)
		return fmt.Errorf("failed to get underlying sql.DB: %w", err)
	}
	sqlDB.SetConnMaxIdleTime(30 * time.Second)
	sqlDB.SetConnMaxLifetime(30 * time.Second)

	// Run AutoMigrate for all models
	err = DB.AutoMigrate(
		&models.User{},
		&models.Property{},
		&models.Article{},
		&models.Notification{},
	)
	if err != nil {
		log.Printf("failed to run database migration: %v", err)
		return fmt.Errorf("failed to run database migration: %w", err)
	}

	log.Println("database connected and migrated successfully")
	return nil
}

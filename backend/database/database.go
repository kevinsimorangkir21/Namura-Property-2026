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
	"gorm.io/gorm/logger"
)

// DB is the global GORM database instance
var DB *gorm.DB

// Connect establishes a PostgreSQL connection using DATABASE_URL or individual params
// and runs AutoMigrate for all models
func Connect(cfg *config.Config) error {
	var dsn string

	// Priority 1: Use DATABASE_URL if available (Railway/production)
	if cfg.DatabaseURL != "" {
		dsn = cfg.DatabaseURL
		log.Println("[DATABASE] Connecting using DATABASE_URL")
	} else {
		// Priority 2: Build DSN from individual parameters (local development)
		sslMode := "disable"
		if sslEnv := os.Getenv("DB_SSLMODE"); sslEnv != "" {
			sslMode = sslEnv
		}

		// Reduced connect_timeout from 30s to 10s to stay within healthcheck window
		dsn = fmt.Sprintf(
			"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s connect_timeout=10",
			cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPass, cfg.DBName, sslMode,
		)

		log.Printf("[DATABASE] Connecting to %s:%s/%s", cfg.DBHost, cfg.DBPort, cfg.DBName)
	}

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Warn), // Log warnings and errors only
	})
	if err != nil {
		log.Printf("[DATABASE] Connection failed: %v", err)
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	// Configure connection pool with production-safe values
	sqlDB, err := DB.DB()
	if err != nil {
		log.Printf("[DATABASE] Failed to get underlying sql.DB: %v", err)
		return fmt.Errorf("failed to get underlying sql.DB: %w", err)
	}
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxIdleTime(5 * time.Minute)
	sqlDB.SetConnMaxLifetime(1 * time.Hour)

	log.Println("[DATABASE] Connection pool configured")

	// Run AutoMigrate for all models
	log.Println("[DATABASE] Running migrations...")
	err = DB.AutoMigrate(
		&models.User{},
		&models.Property{},
		&models.Article{},
		&models.Notification{},
	)
	if err != nil {
		log.Printf("[DATABASE] Migration failed: %v", err)
		return fmt.Errorf("failed to run database migration: %w", err)
	}

	log.Println("[DATABASE] Connected and migrated successfully")
	return nil
}

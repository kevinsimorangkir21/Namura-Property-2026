package config

import (
	"fmt"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

// Config holds all environment configuration
type Config struct {
	DatabaseURL string // Full PostgreSQL connection string (priority for production)
	DBHost      string // Individual connection params (fallback for local dev)
	DBPort      string
	DBUser      string
	DBPass      string
	DBName      string
	JWTSecret   string
}

// LoadConfig loads and validates environment variables from .env or DATABASE_URL
// Priority: DATABASE_URL (Railway/production) > Individual vars (local development)
// Returns error if required variables are missing
func LoadConfig() (*Config, error) {
	// Load .env file from project root (one level above backend/)
	// Ignore error if .env doesn't exist — variables may already be set in the environment
	_ = godotenv.Load("../.env")
	_ = godotenv.Load(".env")

	cfg := &Config{}

	// Priority 1: Check DATABASE_URL (Railway/Heroku/Render standard for production)
	databaseURL := strings.TrimSpace(os.Getenv("DATABASE_URL"))
	if databaseURL != "" {
		cfg.DatabaseURL = databaseURL
		// DATABASE_URL contains all connection info, no need for individual vars
	} else {
		// Priority 2: Individual environment variables (local development/backward compatibility)
		requiredVars := []string{"DB_HOST", "DB_PORT", "DB_USER", "DB_PASS", "DB_NAME"}

		for _, v := range requiredVars {
			val := strings.TrimSpace(os.Getenv(v))
			if val == "" {
				return nil, fmt.Errorf("required environment variable %s is missing or empty (alternatively, set DATABASE_URL for production)", v)
			}
		}

		cfg.DBHost = strings.TrimSpace(os.Getenv("DB_HOST"))
		cfg.DBPort = strings.TrimSpace(os.Getenv("DB_PORT"))
		cfg.DBUser = strings.TrimSpace(os.Getenv("DB_USER"))
		cfg.DBPass = strings.TrimSpace(os.Getenv("DB_PASS"))
		cfg.DBName = strings.TrimSpace(os.Getenv("DB_NAME"))
	}

	// JWT_SECRET is always required regardless of database connection method
	cfg.JWTSecret = strings.TrimSpace(os.Getenv("JWT_SECRET"))
	if cfg.JWTSecret == "" {
		return nil, fmt.Errorf("required environment variable JWT_SECRET is missing or empty")
	}

	return cfg, nil
}

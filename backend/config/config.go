package config

import (
	"fmt"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

// Config holds all environment configuration
type Config struct {
	DBHost    string
	DBPort    string
	DBUser    string
	DBPass    string
	DBName    string
	JWTSecret string
}

// LoadConfig loads and validates environment variables from .env
// Returns error if any required variable is missing or empty
func LoadConfig() (*Config, error) {
	// Load .env file from project root (one level above backend/)
	// Ignore error if .env doesn't exist — variables may already be set in the environment
	_ = godotenv.Load("../.env")
	_ = godotenv.Load(".env")

	requiredVars := []string{"DB_HOST", "DB_PORT", "DB_USER", "DB_PASS", "DB_NAME", "JWT_SECRET"}

	for _, v := range requiredVars {
		val := strings.TrimSpace(os.Getenv(v))
		if val == "" {
			return nil, fmt.Errorf("required environment variable %s is missing or empty", v)
		}
	}

	cfg := &Config{
		DBHost:    strings.TrimSpace(os.Getenv("DB_HOST")),
		DBPort:    strings.TrimSpace(os.Getenv("DB_PORT")),
		DBUser:    strings.TrimSpace(os.Getenv("DB_USER")),
		DBPass:    strings.TrimSpace(os.Getenv("DB_PASS")),
		DBName:    strings.TrimSpace(os.Getenv("DB_NAME")),
		JWTSecret: strings.TrimSpace(os.Getenv("JWT_SECRET")),
	}

	return cfg, nil
}

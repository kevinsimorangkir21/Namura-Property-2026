package config

import (
	"os"
	"testing"
)

func setAllEnvVars() {
	os.Setenv("DB_HOST", "localhost")
	os.Setenv("DB_PORT", "5432")
	os.Setenv("DB_USER", "postgres")
	os.Setenv("DB_PASS", "postgres")
	os.Setenv("DB_NAME", "namura")
	os.Setenv("JWT_SECRET", "supersecret")
}

func clearAllEnvVars() {
	os.Unsetenv("DB_HOST")
	os.Unsetenv("DB_PORT")
	os.Unsetenv("DB_USER")
	os.Unsetenv("DB_PASS")
	os.Unsetenv("DB_NAME")
	os.Unsetenv("JWT_SECRET")
}

func TestLoadConfig_AllVarsSet(t *testing.T) {
	clearAllEnvVars()
	setAllEnvVars()
	defer clearAllEnvVars()

	cfg, err := LoadConfig()
	if err != nil {
		t.Fatalf("expected no error, got: %v", err)
	}

	if cfg.DBHost != "localhost" {
		t.Errorf("expected DBHost=localhost, got %s", cfg.DBHost)
	}
	if cfg.DBPort != "5432" {
		t.Errorf("expected DBPort=5432, got %s", cfg.DBPort)
	}
	if cfg.DBUser != "postgres" {
		t.Errorf("expected DBUser=postgres, got %s", cfg.DBUser)
	}
	if cfg.DBPass != "postgres" {
		t.Errorf("expected DBPass=postgres, got %s", cfg.DBPass)
	}
	if cfg.DBName != "namura" {
		t.Errorf("expected DBName=namura, got %s", cfg.DBName)
	}
	if cfg.JWTSecret != "supersecret" {
		t.Errorf("expected JWTSecret=supersecret, got %s", cfg.JWTSecret)
	}
}

func TestLoadConfig_MissingVar(t *testing.T) {
	requiredVars := []string{"DB_HOST", "DB_PORT", "DB_USER", "DB_PASS", "DB_NAME", "JWT_SECRET"}

	for _, missing := range requiredVars {
		t.Run("missing_"+missing, func(t *testing.T) {
			clearAllEnvVars()
			setAllEnvVars()
			os.Unsetenv(missing)

			cfg, err := LoadConfig()
			if err == nil {
				t.Fatalf("expected error for missing %s, got nil (cfg=%+v)", missing, cfg)
			}

			// Error message should mention the missing variable name
			if !contains(err.Error(), missing) {
				t.Errorf("expected error to mention %s, got: %v", missing, err)
			}
		})
	}
	clearAllEnvVars()
}

func TestLoadConfig_EmptyVar(t *testing.T) {
	requiredVars := []string{"DB_HOST", "DB_PORT", "DB_USER", "DB_PASS", "DB_NAME", "JWT_SECRET"}

	for _, emptyVar := range requiredVars {
		t.Run("empty_"+emptyVar, func(t *testing.T) {
			clearAllEnvVars()
			setAllEnvVars()
			os.Setenv(emptyVar, "")

			cfg, err := LoadConfig()
			if err == nil {
				t.Fatalf("expected error for empty %s, got nil (cfg=%+v)", emptyVar, cfg)
			}

			if !contains(err.Error(), emptyVar) {
				t.Errorf("expected error to mention %s, got: %v", emptyVar, err)
			}
		})
	}
	clearAllEnvVars()
}

func TestLoadConfig_WhitespaceOnlyVar(t *testing.T) {
	clearAllEnvVars()
	setAllEnvVars()
	os.Setenv("DB_HOST", "   ")
	defer clearAllEnvVars()

	cfg, err := LoadConfig()
	if err == nil {
		t.Fatalf("expected error for whitespace-only DB_HOST, got nil (cfg=%+v)", cfg)
	}

	if !contains(err.Error(), "DB_HOST") {
		t.Errorf("expected error to mention DB_HOST, got: %v", err)
	}
}

func contains(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || len(s) > 0 && containsSubstring(s, substr))
}

func containsSubstring(s, substr string) bool {
	for i := 0; i <= len(s)-len(substr); i++ {
		if s[i:i+len(substr)] == substr {
			return true
		}
	}
	return false
}

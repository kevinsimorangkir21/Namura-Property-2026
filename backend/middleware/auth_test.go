package middleware

import (
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

const testSecret = "test-jwt-secret-key"

// helper to create a Fiber app with the auth middleware and a simple handler
func setupTestApp() *fiber.App {
	app := fiber.New()
	app.Use(AuthRequired(testSecret))
	app.Get("/protected", func(c *fiber.Ctx) error {
		userID := c.Locals("user_id")
		userName := c.Locals("user_name")
		return c.JSON(fiber.Map{
			"user_id":   userID,
			"user_name": userName,
		})
	})
	return app
}

// helper to generate a valid token for testing
func generateTestToken(userID uint, userName string, expiration time.Duration) string {
	claims := jwt.MapClaims{
		"user_id":   userID,
		"user_name": userName,
		"exp":       time.Now().Add(expiration).Unix(),
		"iat":       time.Now().Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, _ := token.SignedString([]byte(testSecret))
	return tokenString
}

func TestAuthRequired_MissingAuthorizationHeader(t *testing.T) {
	app := setupTestApp()

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("expected status 401, got %d", resp.StatusCode)
	}
}

func TestAuthRequired_InvalidFormat_NoBearerPrefix(t *testing.T) {
	app := setupTestApp()

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Basic sometoken")
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("expected status 401, got %d", resp.StatusCode)
	}
}

func TestAuthRequired_ExpiredToken(t *testing.T) {
	app := setupTestApp()

	// Generate a token that expired 1 hour ago
	token := generateTestToken(1, "testuser", -1*time.Hour)

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Bearer "+token)
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("expected status 401, got %d", resp.StatusCode)
	}
}

func TestAuthRequired_MalformedToken(t *testing.T) {
	app := setupTestApp()

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Bearer not-a-valid-jwt-token")
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("expected status 401, got %d", resp.StatusCode)
	}
}

func TestAuthRequired_WrongSecret(t *testing.T) {
	app := setupTestApp()

	// Generate token with a different secret
	claims := jwt.MapClaims{
		"user_id":   float64(1),
		"user_name": "testuser",
		"exp":       time.Now().Add(24 * time.Hour).Unix(),
		"iat":       time.Now().Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, _ := token.SignedString([]byte("wrong-secret"))

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Bearer "+tokenString)
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("expected status 401, got %d", resp.StatusCode)
	}
}

func TestAuthRequired_ValidToken(t *testing.T) {
	app := setupTestApp()

	token := generateTestToken(42, "John Doe", 24*time.Hour)

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Bearer "+token)
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if resp.StatusCode != http.StatusOK {
		t.Errorf("expected status 200, got %d", resp.StatusCode)
	}

	body, _ := io.ReadAll(resp.Body)
	bodyStr := string(body)

	// Check that user_id and user_name are present in response
	if !contains(bodyStr, "42") {
		t.Errorf("expected response to contain user_id 42, got: %s", bodyStr)
	}
	if !contains(bodyStr, "John Doe") {
		t.Errorf("expected response to contain user_name 'John Doe', got: %s", bodyStr)
	}
}

func TestAuthRequired_EmptyBearerToken(t *testing.T) {
	app := setupTestApp()

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Bearer ")
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("expected status 401, got %d", resp.StatusCode)
	}
}

func TestGenerateToken_ValidOutput(t *testing.T) {
	tokenString, err := GenerateToken(1, "Admin", testSecret)
	if err != nil {
		t.Fatalf("unexpected error generating token: %v", err)
	}

	if tokenString == "" {
		t.Fatal("expected non-empty token string")
	}

	// Parse the token to verify claims
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(testSecret), nil
	})
	if err != nil {
		t.Fatalf("failed to parse generated token: %v", err)
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		t.Fatal("failed to extract claims")
	}

	if uint(claims["user_id"].(float64)) != 1 {
		t.Errorf("expected user_id 1, got %v", claims["user_id"])
	}
	if claims["user_name"].(string) != "Admin" {
		t.Errorf("expected user_name 'Admin', got %v", claims["user_name"])
	}

	// Verify expiration is approximately 24 hours from now
	exp := int64(claims["exp"].(float64))
	expectedExp := time.Now().Add(24 * time.Hour).Unix()
	diff := expectedExp - exp
	if diff < -5 || diff > 5 {
		t.Errorf("expected expiration ~24h from now, got diff of %d seconds", diff)
	}
}

func TestGenerateToken_RoundTrip(t *testing.T) {
	// Generate a token and pass it through the middleware
	app := setupTestApp()

	tokenString, err := GenerateToken(99, "RoundTrip User", testSecret)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Bearer "+tokenString)
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if resp.StatusCode != http.StatusOK {
		t.Errorf("expected status 200, got %d", resp.StatusCode)
	}

	body, _ := io.ReadAll(resp.Body)
	bodyStr := string(body)

	if !contains(bodyStr, "99") {
		t.Errorf("expected response to contain user_id 99, got: %s", bodyStr)
	}
	if !contains(bodyStr, "RoundTrip User") {
		t.Errorf("expected response to contain user_name 'RoundTrip User', got: %s", bodyStr)
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

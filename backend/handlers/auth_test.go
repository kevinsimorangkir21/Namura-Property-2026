package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"namura-api/backend/database"
	"namura-api/backend/models"

	"github.com/glebarez/sqlite"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// setupTestDB creates an in-memory SQLite database for testing
func setupTestDB(t *testing.T) {
	t.Helper()
	var err error
	database.DB, err = gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		t.Fatalf("failed to open test database: %v", err)
	}
	err = database.DB.AutoMigrate(&models.User{})
	if err != nil {
		t.Fatalf("failed to migrate test database: %v", err)
	}
}

// createTestUser creates a user with a hashed password in the test DB
func createTestUser(t *testing.T, name, email, password string) {
	t.Helper()
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		t.Fatalf("failed to hash password: %v", err)
	}
	user := models.User{
		Name:     name,
		Email:    email,
		Password: string(hash),
		Role:     "admin",
		Status:   "active",
	}
	if err := database.DB.Create(&user).Error; err != nil {
		t.Fatalf("failed to create test user: %v", err)
	}
}

// setupApp creates a Fiber app with the login route
func setupApp() *fiber.App {
	app := fiber.New()
	app.Post("/api/auth/login", Login)
	return app
}

func TestLogin_Success(t *testing.T) {
	setupTestDB(t)
	JWTSecret = "test-secret-key"
	createTestUser(t, "Admin User", "admin@example.com", "password123")

	app := setupApp()

	body, _ := json.Marshal(LoginRequest{
		Email:    "admin@example.com",
		Password: "password123",
	})

	req := httptest.NewRequest(http.MethodPost, "/api/auth/login", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("request failed: %v", err)
	}

	if resp.StatusCode != http.StatusOK {
		t.Errorf("expected status 200, got %d", resp.StatusCode)
	}

	respBody, _ := io.ReadAll(resp.Body)
	var result map[string]interface{}
	if err := json.Unmarshal(respBody, &result); err != nil {
		t.Fatalf("failed to parse response: %v", err)
	}

	if _, ok := result["token"]; !ok {
		t.Error("response missing 'token' field")
	}

	user, ok := result["user"].(map[string]interface{})
	if !ok {
		t.Fatal("response missing 'user' object")
	}

	if user["name"] != "Admin User" {
		t.Errorf("expected user name 'Admin User', got '%v'", user["name"])
	}

	if user["id"] == nil {
		t.Error("response missing 'user.id' field")
	}
}

func TestLogin_NonExistentEmail(t *testing.T) {
	setupTestDB(t)
	JWTSecret = "test-secret-key"

	app := setupApp()

	body, _ := json.Marshal(LoginRequest{
		Email:    "nonexistent@example.com",
		Password: "password123",
	})

	req := httptest.NewRequest(http.MethodPost, "/api/auth/login", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("request failed: %v", err)
	}

	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("expected status 401, got %d", resp.StatusCode)
	}

	respBody, _ := io.ReadAll(resp.Body)
	var result map[string]interface{}
	json.Unmarshal(respBody, &result)

	if result["error"] != "invalid credentials" {
		t.Errorf("expected error 'invalid credentials', got '%v'", result["error"])
	}
}

func TestLogin_WrongPassword(t *testing.T) {
	setupTestDB(t)
	JWTSecret = "test-secret-key"
	createTestUser(t, "Admin User", "admin@example.com", "password123")

	app := setupApp()

	body, _ := json.Marshal(LoginRequest{
		Email:    "admin@example.com",
		Password: "wrongpassword",
	})

	req := httptest.NewRequest(http.MethodPost, "/api/auth/login", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("request failed: %v", err)
	}

	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("expected status 401, got %d", resp.StatusCode)
	}

	respBody, _ := io.ReadAll(resp.Body)
	var result map[string]interface{}
	json.Unmarshal(respBody, &result)

	if result["error"] != "invalid credentials" {
		t.Errorf("expected error 'invalid credentials', got '%v'", result["error"])
	}
}

func TestLogin_IdenticalErrorForEmailAndPassword(t *testing.T) {
	setupTestDB(t)
	JWTSecret = "test-secret-key"
	createTestUser(t, "Admin User", "admin@example.com", "password123")

	app := setupApp()

	// Request with non-existent email
	body1, _ := json.Marshal(LoginRequest{
		Email:    "nonexistent@example.com",
		Password: "password123",
	})
	req1 := httptest.NewRequest(http.MethodPost, "/api/auth/login", bytes.NewReader(body1))
	req1.Header.Set("Content-Type", "application/json")
	resp1, _ := app.Test(req1)
	respBody1, _ := io.ReadAll(resp1.Body)

	// Request with wrong password
	body2, _ := json.Marshal(LoginRequest{
		Email:    "admin@example.com",
		Password: "wrongpassword",
	})
	req2 := httptest.NewRequest(http.MethodPost, "/api/auth/login", bytes.NewReader(body2))
	req2.Header.Set("Content-Type", "application/json")
	resp2, _ := app.Test(req2)
	respBody2, _ := io.ReadAll(resp2.Body)

	// Both should have same status code
	if resp1.StatusCode != resp2.StatusCode {
		t.Errorf("status codes differ: %d vs %d", resp1.StatusCode, resp2.StatusCode)
	}

	// Both should have identical response body
	if string(respBody1) != string(respBody2) {
		t.Errorf("error responses differ:\n  email not found: %s\n  wrong password: %s", respBody1, respBody2)
	}
}

func TestLogin_MissingEmail(t *testing.T) {
	setupTestDB(t)
	JWTSecret = "test-secret-key"

	app := setupApp()

	body, _ := json.Marshal(map[string]string{
		"password": "password123",
	})

	req := httptest.NewRequest(http.MethodPost, "/api/auth/login", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("request failed: %v", err)
	}

	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", resp.StatusCode)
	}

	respBody, _ := io.ReadAll(resp.Body)
	var result map[string]interface{}
	json.Unmarshal(respBody, &result)

	if result["error"] != "email and password are required" {
		t.Errorf("expected error 'email and password are required', got '%v'", result["error"])
	}
}

func TestLogin_MissingPassword(t *testing.T) {
	setupTestDB(t)
	JWTSecret = "test-secret-key"

	app := setupApp()

	body, _ := json.Marshal(map[string]string{
		"email": "admin@example.com",
	})

	req := httptest.NewRequest(http.MethodPost, "/api/auth/login", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("request failed: %v", err)
	}

	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", resp.StatusCode)
	}

	respBody, _ := io.ReadAll(resp.Body)
	var result map[string]interface{}
	json.Unmarshal(respBody, &result)

	if result["error"] != "email and password are required" {
		t.Errorf("expected error 'email and password are required', got '%v'", result["error"])
	}
}

func TestLogin_EmptyBody(t *testing.T) {
	setupTestDB(t)
	JWTSecret = "test-secret-key"

	app := setupApp()

	body, _ := json.Marshal(map[string]string{})

	req := httptest.NewRequest(http.MethodPost, "/api/auth/login", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("request failed: %v", err)
	}

	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", resp.StatusCode)
	}
}

func TestLogin_EmptyEmailField(t *testing.T) {
	setupTestDB(t)
	JWTSecret = "test-secret-key"

	app := setupApp()

	body, _ := json.Marshal(LoginRequest{
		Email:    "",
		Password: "password123",
	})

	req := httptest.NewRequest(http.MethodPost, "/api/auth/login", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("request failed: %v", err)
	}

	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", resp.StatusCode)
	}
}

func TestLogin_WhitespaceOnlyFields(t *testing.T) {
	setupTestDB(t)
	JWTSecret = "test-secret-key"

	app := setupApp()

	body, _ := json.Marshal(LoginRequest{
		Email:    "   ",
		Password: "   ",
	})

	req := httptest.NewRequest(http.MethodPost, "/api/auth/login", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("request failed: %v", err)
	}

	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", resp.StatusCode)
	}
}

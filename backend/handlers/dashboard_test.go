package handlers

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"namura-api/backend/database"
	"namura-api/backend/models"

	"github.com/glebarez/sqlite"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// setupDashboardTestDB creates an in-memory SQLite database with all models migrated
func setupDashboardTestDB(t *testing.T) {
	t.Helper()
	var err error
	database.DB, err = gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		t.Fatalf("failed to open test database: %v", err)
	}
	err = database.DB.AutoMigrate(
		&models.User{},
		&models.Property{},
		&models.Article{},
		&models.Notification{},
	)
	if err != nil {
		t.Fatalf("failed to migrate test database: %v", err)
	}
}

// setupDashboardApp creates a Fiber app with the dashboard route
func setupDashboardApp() *fiber.App {
	app := fiber.New()
	app.Get("/api/dashboard/stats", GetDashboardStats)
	return app
}

func TestGetDashboardStats_EmptyDatabase(t *testing.T) {
	setupDashboardTestDB(t)
	app := setupDashboardApp()

	req := httptest.NewRequest(http.MethodGet, "/api/dashboard/stats", nil)
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

	if result["total_properties"] != float64(0) {
		t.Errorf("expected total_properties=0, got %v", result["total_properties"])
	}
	if result["total_articles"] != float64(0) {
		t.Errorf("expected total_articles=0, got %v", result["total_articles"])
	}
	if result["total_users"] != float64(0) {
		t.Errorf("expected total_users=0, got %v", result["total_users"])
	}
	if result["total_notifications"] != float64(0) {
		t.Errorf("expected total_notifications=0, got %v", result["total_notifications"])
	}
}

func TestGetDashboardStats_WithData(t *testing.T) {
	setupDashboardTestDB(t)
	app := setupDashboardApp()

	// Seed users
	for i := 0; i < 3; i++ {
		database.DB.Create(&models.User{
			Name:     "User",
			Email:    "user" + string(rune('a'+i)) + "@example.com",
			Password: "hashed",
			Role:     "admin",
			Status:   "active",
		})
	}

	// Seed properties
	for i := 0; i < 5; i++ {
		database.DB.Create(&models.Property{
			Title:    "Property",
			Slug:     "property-" + string(rune('a'+i)),
			Price:    100000,
			Type:     "house",
			Status:   "available",
			Location: "Jakarta",
		})
	}

	// Seed articles (need a valid author_id)
	for i := 0; i < 2; i++ {
		database.DB.Create(&models.Article{
			Title:    "Article",
			Slug:     "article-" + string(rune('a'+i)),
			Content:  "Content",
			Status:   "published",
			AuthorID: 1,
		})
	}

	// Seed notifications
	for i := 0; i < 4; i++ {
		database.DB.Create(&models.Notification{
			Title:   "Notification",
			Message: "Message",
			Status:  "unread",
		})
	}

	req := httptest.NewRequest(http.MethodGet, "/api/dashboard/stats", nil)
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

	if result["total_properties"] != float64(5) {
		t.Errorf("expected total_properties=5, got %v", result["total_properties"])
	}
	if result["total_articles"] != float64(2) {
		t.Errorf("expected total_articles=2, got %v", result["total_articles"])
	}
	if result["total_users"] != float64(3) {
		t.Errorf("expected total_users=3, got %v", result["total_users"])
	}
	if result["total_notifications"] != float64(4) {
		t.Errorf("expected total_notifications=4, got %v", result["total_notifications"])
	}
}

func TestGetDashboardStats_ResponseHasAllFields(t *testing.T) {
	setupDashboardTestDB(t)
	app := setupDashboardApp()

	req := httptest.NewRequest(http.MethodGet, "/api/dashboard/stats", nil)
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("request failed: %v", err)
	}

	respBody, _ := io.ReadAll(resp.Body)
	var result map[string]interface{}
	if err := json.Unmarshal(respBody, &result); err != nil {
		t.Fatalf("failed to parse response: %v", err)
	}

	requiredFields := []string{"total_properties", "total_articles", "total_users", "total_notifications"}
	for _, field := range requiredFields {
		if _, ok := result[field]; !ok {
			t.Errorf("response missing required field '%s'", field)
		}
	}
}

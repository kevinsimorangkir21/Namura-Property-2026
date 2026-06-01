# Implementation Plan: Namura Backend API

## Overview

This plan implements a RESTful backend API for the Namura Property real estate management system using Go (Fiber v2), PostgreSQL 16, GORM ORM, and JWT-based authentication. Tasks are organized to build foundational layers first (config, database, models), then middleware, then handlers, and finally wire everything together with routes.

## Tasks

- [x] 1. Set up project structure, configuration, and database connection
  - [x] 1.1 Create config package with environment variable loading
    - Create `backend/config/config.go` with `Config` struct and `LoadConfig()` function
    - Load DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, JWT_SECRET from .env
    - Return descriptive error if any required variable is missing or empty
    - _Requirements: 1.5, 10.1, 10.2_

  - [x]* 1.2 Write property test for config validation
    - **Property 1: Config validation rejects incomplete environment**
    - **Validates: Requirements 1.5, 10.2**

  - [x] 1.3 Create database package with PostgreSQL connection and migration
    - Create `backend/database/database.go` with global `DB` variable and `Connect()` function
    - Establish PostgreSQL connection using GORM with 30-second timeout
    - Run AutoMigrate for User, Property, Article, Notification models
    - Log and return errors for connection or migration failures
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [x] 1.4 Create all GORM model definitions
    - Create `backend/models/user.go` with User struct (ID, Name, Email, Password with json:"-", Role, Status, timestamps)
    - Create `backend/models/property.go` with Property struct (all fields including Slug with uniqueIndex)
    - Create `backend/models/article.go` with Article struct (including Author foreign key relationship)
    - Create `backend/models/notification.go` with Notification struct
    - _Requirements: 1.2, 4.1, 6.1, 7.1, 8.1_

- [x] 2. Implement utility functions and authentication middleware
  - [x] 2.1 Create slug generation utility
    - Create `backend/utils/slug.go` with `GenerateSlug(title string, maxLen int) string`
    - Convert to lowercase, replace spaces/special chars with hyphens
    - Remove consecutive hyphens, trim leading/trailing hyphens
    - Truncate to maxLen (default 200) characters
    - _Requirements: 4.10, 6.10_

  - [x]* 2.2 Write property test for slug generation invariants
    - **Property 6: Slug generation invariants**
    - **Validates: Requirements 4.10, 6.10**

  - [x] 2.3 Create email validation utility
    - Create `backend/utils/validator.go` with `ValidateEmail(email string) bool`
    - Validate email format using regex pattern
    - _Requirements: 7.4_

  - [x] 2.4 Implement JWT authentication middleware
    - Create `backend/middleware/auth.go` with `AuthRequired(jwtSecret string) fiber.Handler`
    - Extract token from "Authorization: Bearer <token>" header
    - Verify token signature and expiration against JWT_SECRET
    - Store user claims (user_id, user_name) in Fiber Locals
    - Return 401 for missing, expired, malformed, or invalid tokens
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x]* 2.5 Write property test for JWT token round-trip
    - **Property 3: JWT token generation and middleware extraction round-trip**
    - **Validates: Requirements 2.5, 3.1**

  - [x]* 2.6 Write property test for invalid token rejection
    - **Property 4: Invalid tokens are always rejected**
    - **Validates: Requirements 3.4**

- [x] 3. Checkpoint - Ensure foundation compiles and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement authentication handler
  - [x] 4.1 Create login handler
    - Create `backend/handlers/auth.go` with `Login(c *fiber.Ctx) error`
    - Parse email/password from request body, validate required fields
    - Look up user by email, compare password with bcrypt
    - Generate JWT token with 24-hour expiration signed with JWT_SECRET
    - Return token and user object (id, name) on success
    - Return identical 401 error for non-existent email or wrong password
    - Return 400 for missing/empty email or password fields
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 2.6_

  - [x]* 4.2 Write property test for password hashing round-trip
    - **Property 2: Password hashing round-trip**
    - **Validates: Requirements 2.4**

  - [x]* 4.3 Write property test for invalid credentials identical responses
    - **Property 5: Invalid credentials produce identical error responses**
    - **Validates: Requirements 2.2, 2.3**

- [x] 5. Implement Property CRUD handlers
  - [x] 5.1 Create property handlers
    - Create `backend/handlers/property.go` with GetProperties, GetProperty, CreateProperty, UpdateProperty, DeleteProperty
    - GetProperties: query all properties, return JSON array
    - GetProperty: find by ID, return 404 if not found
    - CreateProperty: validate required fields (Title, Price, Type, Status, Location), validate numeric fields non-negative, validate field lengths (Title ≤255, Description ≤5000), generate slug, return 201
    - UpdateProperty: find by ID, update fields, return 404 if not found
    - DeleteProperty: find by ID, delete, return 404 if not found
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.12_

  - [x]* 5.2 Write property test for property validation
    - **Property 7: Property validation rejects invalid payloads**
    - **Validates: Requirements 4.5, 4.12**

  - [x] 5.3 Create property image upload handler
    - Create `backend/handlers/upload.go` with `UploadPropertyImage(c *fiber.Ctx) error`
    - Accept multipart/form-data with "image" field
    - Validate file type (JPEG, PNG, WebP only)
    - Validate file size (max 10 MB)
    - Sanitize filename to prevent path traversal
    - Save to `/uploads` directory, update property record with image path
    - Return 400 for invalid type/size/missing file, 404 for non-existent property
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [x]* 5.4 Write property test for image type rejection
    - **Property 10: Non-allowed image types are rejected**
    - **Validates: Requirements 5.2**

- [x] 6. Implement Article CRUD handlers
  - [x] 6.1 Create article handlers
    - Create `backend/handlers/article.go` with GetArticles, GetArticle, CreateArticle, UpdateArticle, DeleteArticle
    - GetArticles: query all articles with Author preload, return JSON array
    - GetArticle: find by ID, return 404 if not found
    - CreateArticle: validate required fields (Title, Content, Status), generate slug with uniqueness suffix, set AuthorID from JWT claims, return 201
    - UpdateArticle: find by ID, update fields, return 404 if not found
    - DeleteArticle: find by ID, delete, return 404 if not found
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10, 6.11, 6.12_

  - [x]* 6.2 Write property test for article required field validation
    - **Property 9: Required field validation for articles and notifications (articles part)**
    - **Validates: Requirements 6.5**

  - [x]* 6.3 Write property test for duplicate slug uniqueness
    - **Property 11: Duplicate slug uniqueness**
    - **Validates: Requirements 6.12**

- [x] 7. Implement User CRUD handlers
  - [x] 7.1 Create user handlers
    - Create `backend/handlers/user.go` with GetUsers, CreateUser, UpdateUser, DeleteUser
    - GetUsers: query all users, return JSON array (password excluded via json:"-" tag)
    - CreateUser: validate Name (1-255 chars), Email (valid format, unique), Password (≥8 chars), Role, Status; hash password with bcrypt cost ≥10; return 201 without password
    - UpdateUser: find by ID, check email uniqueness if changed, update fields, return 404/409 as appropriate
    - DeleteUser: find by ID, delete, return 404 if not found
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9_

  - [x]* 7.2 Write property test for user validation
    - **Property 8: User validation rejects invalid payloads**
    - **Validates: Requirements 7.4**

  - [x]* 7.3 Write property test for password field exclusion
    - **Property 12: Password field never exposed in user responses**
    - **Validates: Requirements 7.1**

- [x] 8. Implement Notification and Dashboard handlers
  - [x] 8.1 Create notification handlers
    - Create `backend/handlers/notification.go` with GetNotifications, CreateNotification, DeleteNotification
    - GetNotifications: query all notifications, return JSON array
    - CreateNotification: validate Title (non-empty, ≤255), Message (non-empty, ≤1000), Status (non-empty); return 201
    - DeleteNotification: find by ID, delete, return 404 if not found
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [x]* 8.2 Write property test for notification required field validation
    - **Property 9: Required field validation for articles and notifications (notifications part)**
    - **Validates: Requirements 8.3**

  - [x] 8.3 Create dashboard statistics handler
    - Create `backend/handlers/dashboard.go` with `GetDashboardStats(c *fiber.Ctx) error`
    - Count properties, articles, users, notifications from database
    - Return JSON with total_properties, total_articles, total_users, total_notifications
    - Return 500 if any count query fails
    - _Requirements: 9.1, 9.2, 9.4_

  - [x]* 8.4 Write property test for dashboard counts accuracy
    - **Property 13: Dashboard counts match database state**
    - **Validates: Requirements 9.1, 9.2**

- [x] 9. Checkpoint - Ensure all handlers compile and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Wire routes and configure API server
  - [x] 10.1 Create routes package
    - Create `backend/routes/routes.go` with `SetupRoutes(app *fiber.App, jwtSecret string)`
    - Register health check GET `/` (public)
    - Register POST `/api/auth/login` (public)
    - Register all property routes under `/api/properties` (protected)
    - Register POST `/api/properties/:id/upload` (protected)
    - Register all article routes under `/api/articles` (protected)
    - Register all user routes under `/api/users` (protected)
    - Register all notification routes under `/api/notifications` (protected)
    - Register GET `/api/dashboard/stats` (protected)
    - Apply JWT middleware to protected route groups
    - _Requirements: 4.11, 8.6, 9.3, 10.5_

  - [x] 10.2 Update main.go with full server configuration
    - Update `backend/cmd/main.go` to load config, connect database, configure CORS
    - Enable CORS with allowed origins, methods (GET, POST, PUT, DELETE), and headers (Authorization, Content-Type)
    - Call SetupRoutes, serve static `/uploads` directory
    - Listen on port 8080
    - Log and exit on startup failures
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.6_

  - [x] 10.3 Initialize Go module and install dependencies
    - Create/update `backend/go.mod` with module path
    - Add dependencies: fiber v2, gorm, gorm postgres driver, jwt-go, bcrypt, godotenv
    - Run `go mod tidy` to resolve all dependencies
    - _Requirements: 10.1_

- [x] 11. Final checkpoint - Ensure full application compiles and all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The implementation uses Go's built-in `testing` package and `github.com/leanovate/gopter` for property-based tests
- All protected routes require JWT authentication via the middleware
- Password fields are never exposed in API responses (enforced by `json:"-"` struct tag)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.4"] },
    { "id": 1, "tasks": ["1.2", "1.3", "2.1", "2.3"] },
    { "id": 2, "tasks": ["2.2", "2.4"] },
    { "id": 3, "tasks": ["2.5", "2.6", "4.1"] },
    { "id": 4, "tasks": ["4.2", "4.3", "5.1", "6.1", "7.1", "8.1", "8.3"] },
    { "id": 5, "tasks": ["5.2", "5.3", "6.2", "6.3", "7.2", "7.3", "8.2", "8.4"] },
    { "id": 6, "tasks": ["5.4", "10.1"] },
    { "id": 7, "tasks": ["10.2", "10.3"] }
  ]
}
```

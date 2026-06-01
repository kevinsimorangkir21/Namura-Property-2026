# Requirements Document

## Introduction

Namura Property Backend API is a RESTful backend service for a real estate property management system. The API provides authentication, CRUD operations for properties, articles, users, and notifications, image upload capabilities, and dashboard statistics. Built with Go (Fiber framework), PostgreSQL 16, GORM ORM, and JWT-based authentication.

## Glossary

- **API_Server**: The Go Fiber HTTP server that handles all incoming API requests and routes them to appropriate handlers
- **Auth_Service**: The service responsible for authenticating users via email/password and issuing JWT tokens
- **Property_Service**: The service responsible for managing real estate property records (create, read, update, delete)
- **Article_Service**: The service responsible for managing article/blog content records (create, read, update, delete)
- **User_Service**: The service responsible for managing user accounts (create, read, update, delete)
- **Notification_Service**: The service responsible for managing notification records (create, read, delete)
- **Image_Upload_Service**: The service responsible for handling property image file uploads and storage
- **Dashboard_Service**: The service responsible for aggregating and returning statistical data
- **Database**: PostgreSQL 16 instance managed via Docker, accessed through GORM ORM
- **JWT_Token**: A JSON Web Token issued upon successful authentication, used to authorize subsequent API requests
- **Middleware**: Fiber middleware that intercepts requests to verify JWT tokens before allowing access to protected routes
- **User**: A registered account with fields: Name, Email (unique), Password (hashed), Role, Status
- **Property**: A real estate listing with fields: Title, Slug, Price, Type, Status, Location, Bedrooms, Bathrooms, Garage, BuildingArea, LandArea, Description
- **Article**: A content entry with fields: Title, Slug, Thumbnail, Excerpt, Content, Status, AuthorID
- **Notification**: A message entry with fields: Title, Message, Status

## Requirements

### Requirement 1: Database Connection and Migration

**User Story:** As a developer, I want the API server to connect to PostgreSQL and auto-migrate all models on startup, so that the database schema stays in sync with the application models.

#### Acceptance Criteria

1. WHEN the API_Server starts, THE Database SHALL establish a connection using credentials from environment variables (DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME) within a timeout of 30 seconds
2. WHEN the Database connection is established, THE API_Server SHALL auto-migrate the User, Property, Article, and Notification models using GORM
3. IF the Database connection fails or the 30-second connection timeout is exceeded, THEN THE API_Server SHALL log an error message indicating the cause of failure and terminate the process with a non-zero exit code
4. IF the Database migration fails, THEN THE API_Server SHALL log an error message indicating which migration step failed and terminate the process with a non-zero exit code
5. IF any required environment variable (DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME) is missing or empty at startup, THEN THE API_Server SHALL log an error message indicating the missing variable name and terminate the process with a non-zero exit code

### Requirement 2: User Authentication (Login)

**User Story:** As a user, I want to log in with my email and password, so that I receive a JWT token to access protected API endpoints.

#### Acceptance Criteria

1. WHEN a POST request is sent to /api/auth/login with an email and password that match an existing user record, THE Auth_Service SHALL return HTTP status 200 with a JSON response containing a JWT_Token string and a user object with id (integer) and name (string) fields
2. IF a POST request is sent to /api/auth/login with an email that does not exist in the Database, THEN THE Auth_Service SHALL return HTTP status 401 with an error message indicating invalid credentials, without revealing whether the email or password was incorrect
3. IF a POST request is sent to /api/auth/login with an incorrect password, THEN THE Auth_Service SHALL return HTTP status 401 with the same error message as for a non-existent email, without revealing whether the email or password was incorrect
4. THE Auth_Service SHALL hash user passwords using bcrypt with a minimum cost factor of 10 before storing them in the Database
5. THE Auth_Service SHALL sign JWT tokens using the JWT_SECRET environment variable with an expiration time of 24 hours from the moment of issuance
6. IF a POST request is sent to /api/auth/login with a missing or empty email field or a missing or empty password field, THEN THE Auth_Service SHALL return HTTP status 400 with an error message indicating which fields are required

### Requirement 3: JWT Authentication Middleware

**User Story:** As a developer, I want protected routes to require a valid JWT token, so that only authenticated users can access restricted endpoints.

#### Acceptance Criteria

1. WHEN a request is sent to a protected route with a valid JWT_Token in the Authorization header using the format "Bearer <token>", THE Middleware SHALL verify the token signature against the JWT_SECRET environment variable, extract the user claims, make the user identity available to the route handler, and allow the request to proceed
2. IF a request is sent to a protected route without an Authorization header, THEN THE Middleware SHALL return HTTP status 401 with an error message indicating that authentication credentials are missing
3. IF a request is sent to a protected route with an expired JWT_Token, THEN THE Middleware SHALL return HTTP status 401 with an error message indicating that the token has expired
4. IF a request is sent to a protected route with a malformed or incorrectly signed JWT_Token, THEN THE Middleware SHALL return HTTP status 401 with an error message indicating that the token is invalid
5. IF a request is sent to a protected route with an Authorization header that does not follow the "Bearer <token>" format, THEN THE Middleware SHALL return HTTP status 401 with an error message indicating an invalid authorization format

### Requirement 4: Property CRUD Operations

**User Story:** As an admin, I want to create, read, update, and delete property listings, so that I can manage the real estate inventory.

#### Acceptance Criteria

1. WHEN a GET request is sent to /api/properties, THE Property_Service SHALL return a JSON array of all property records from the Database, each including the fields: ID, Title, Slug, Price, Type, Status, Location, Bedrooms, Bathrooms, Garage, BuildingArea, LandArea, Description, CreatedAt, and UpdatedAt
2. WHEN a GET request is sent to /api/properties/:id with a valid property ID, THE Property_Service SHALL return the corresponding property record as JSON including all property fields
3. WHEN a GET request is sent to /api/properties/:id with a non-existent ID, THE Property_Service SHALL return HTTP status 404 with an error message indicating the property was not found
4. WHEN a POST request is sent to /api/properties with valid property data containing all required fields (Title, Price, Type, Status, Location), THE Property_Service SHALL create a new property record in the Database and return HTTP status 201 with the created record
5. IF a POST request is sent to /api/properties with missing required fields (Title, Price, Type, Status, or Location) or with invalid values (Price less than 0, Bedrooms less than 0, Bathrooms less than 0, Garage less than 0, BuildingArea less than 0, or LandArea less than 0), THEN THE Property_Service SHALL return HTTP status 400 with a validation error message indicating which fields failed validation
6. WHEN a PUT request is sent to /api/properties/:id with valid data for an existing property, THE Property_Service SHALL update the existing property record and return the updated record as JSON
7. WHEN a PUT request is sent to /api/properties/:id with a non-existent ID, THE Property_Service SHALL return HTTP status 404 with an error message indicating the property was not found
8. WHEN a DELETE request is sent to /api/properties/:id with a valid ID, THE Property_Service SHALL delete the property record and return HTTP status 200 with a success message
9. WHEN a DELETE request is sent to /api/properties/:id with a non-existent ID, THE Property_Service SHALL return HTTP status 404 with an error message indicating the property was not found
10. WHEN a new property is created, THE Property_Service SHALL generate a slug from the Title by converting it to lowercase, replacing spaces and special characters with hyphens, removing consecutive hyphens, and trimming leading or trailing hyphens, producing a string no longer than 200 characters
11. IF a request is sent to any /api/properties endpoint without a valid JWT_Token in the Authorization header, THEN THE Property_Service SHALL return HTTP status 401 with an error message indicating authentication is required
12. IF a POST or PUT request is sent to /api/properties with a Title exceeding 255 characters or a Description exceeding 5000 characters, THEN THE Property_Service SHALL return HTTP status 400 with a validation error message indicating the field length limit exceeded

### Requirement 5: Property Image Upload

**User Story:** As an admin, I want to upload images for property listings, so that potential buyers can view photos of the properties.

#### Acceptance Criteria

1. WHEN a multipart/form-data POST request is sent to /api/properties/:id/upload with an image file in the "image" form field, THE Image_Upload_Service SHALL save the file to the server filesystem, associate the image path with the property record, and return HTTP status 200 with a JSON response containing the stored image path
2. IF an upload request contains a file that is not an accepted image type (not JPEG, PNG, or WebP), THEN THE Image_Upload_Service SHALL reject the request and return HTTP status 400 with an error message indicating the file type is not allowed
3. IF an upload request contains a file larger than 10 MB, THEN THE Image_Upload_Service SHALL reject the request and return HTTP status 400 with an error message indicating the file exceeds the maximum allowed size
4. IF an upload request references a non-existent property ID, THEN THE Image_Upload_Service SHALL return HTTP status 404 with an error message indicating the property was not found
5. IF an upload request is sent without a file in the "image" form field, THEN THE Image_Upload_Service SHALL return HTTP status 400 with an error message indicating that no file was provided
6. IF the file save operation fails, THEN THE Image_Upload_Service SHALL return HTTP status 500 with an error message indicating a server storage failure

### Requirement 6: Article CRUD Operations

**User Story:** As an admin, I want to create, read, update, and delete articles, so that I can manage blog content for the property website.

#### Acceptance Criteria

1. WHEN a GET request is sent to /api/articles, THE Article_Service SHALL return a JSON array of all article records from the Database
2. WHEN a GET request is sent to /api/articles/:id with a valid article ID, THE Article_Service SHALL return the corresponding article record as JSON
3. WHEN a GET request is sent to /api/articles/:id with a non-existent ID, THE Article_Service SHALL return HTTP status 404 with an error message
4. WHEN a POST request is sent to /api/articles with valid article data containing all required fields (Title, Content, and Status), THE Article_Service SHALL create a new article record in the Database and return HTTP status 201 with the created record
5. IF a POST request is sent to /api/articles with missing or empty required fields (Title, Content, or Status), THEN THE Article_Service SHALL return HTTP status 400 with a validation error message indicating which fields are missing or invalid
6. WHEN a PUT request is sent to /api/articles/:id with valid data, THE Article_Service SHALL update the existing article record and return the updated record
7. IF a PUT request is sent to /api/articles/:id with a non-existent ID, THEN THE Article_Service SHALL return HTTP status 404 with an error message
8. WHEN a DELETE request is sent to /api/articles/:id with a valid ID, THE Article_Service SHALL delete the article record and return HTTP status 200 with a success message
9. IF a DELETE request is sent to /api/articles/:id with a non-existent ID, THEN THE Article_Service SHALL return HTTP status 404 with an error message
10. WHEN a new article is created, THE Article_Service SHALL generate a slug from the article title by converting it to lowercase and replacing spaces and special characters with hyphens
11. WHEN a new article is created, THE Article_Service SHALL associate the authenticated user's ID (extracted from the JWT_Token) as the AuthorID field of the article record
12. IF a POST request is sent to /api/articles with a Title that produces a slug already existing in the Database, THEN THE Article_Service SHALL append a numeric suffix to the slug to ensure uniqueness

### Requirement 7: User CRUD Operations

**User Story:** As an admin, I want to create, read, update, and delete user accounts, so that I can manage system access.

#### Acceptance Criteria

1. WHEN a GET request is sent to /api/users, THE User_Service SHALL return a JSON array of all user records from the Database, where each record includes Name, Email, Role, and Status fields but excludes the Password field
2. WHEN a POST request is sent to /api/users with a request body containing all required fields (Name, Email, Password, Role, Status) where Name is between 1 and 255 characters, Email is a valid email format and unique in the Database, and Password is at least 8 characters, THE User_Service SHALL create a new user record with the Password stored as a bcrypt hash and return HTTP status 201 with the created record excluding the Password field
3. WHEN a POST request is sent to /api/users with an email that already exists in the Database, THE User_Service SHALL return HTTP status 409 with a conflict error message indicating the email is already in use
4. IF a POST request is sent to /api/users with a missing required field (Name, Email, Password, Role, or Status) or an invalid value (Name empty or exceeding 255 characters, Email not in valid email format, or Password fewer than 8 characters), THEN THE User_Service SHALL return HTTP status 400 with a validation error message indicating which field failed validation
5. WHEN a PUT request is sent to /api/users/:id with valid updated fields for an existing user record, THE User_Service SHALL update only the provided fields in the user record and return HTTP status 200 with the updated record excluding the Password field
6. IF a PUT request is sent to /api/users/:id with an email that already belongs to a different user record in the Database, THEN THE User_Service SHALL return HTTP status 409 with a conflict error message indicating the email is already in use
7. IF a PUT request is sent to /api/users/:id where the ID does not match any existing user record, THEN THE User_Service SHALL return HTTP status 404 with an error message indicating the user was not found
8. WHEN a DELETE request is sent to /api/users/:id where the ID matches an existing user record, THE User_Service SHALL delete the user record from the Database and return HTTP status 200 with a success message
9. IF a DELETE request is sent to /api/users/:id where the ID does not match any existing user record, THEN THE User_Service SHALL return HTTP status 404 with an error message indicating the user was not found

### Requirement 8: Notification CRUD Operations

**User Story:** As an admin, I want to create, read, and delete notifications, so that I can manage system notifications.

#### Acceptance Criteria

1. WHEN a GET request is sent to /api/notifications with a valid JWT_Token, THE Notification_Service SHALL return a JSON array of all notification records from the Database, where each record includes the Title, Message, and Status fields
2. WHEN a POST request is sent to /api/notifications with a valid JWT_Token and a request body containing non-empty Title (maximum 255 characters), non-empty Message (maximum 1000 characters), and a Status value, THE Notification_Service SHALL create a new notification record in the Database and return HTTP status 201 with the created record
3. IF a POST request is sent to /api/notifications with a missing or empty Title, missing or empty Message, or missing Status field, THEN THE Notification_Service SHALL return HTTP status 400 with a validation error message indicating which fields failed validation
4. WHEN a DELETE request is sent to /api/notifications/:id with a valid JWT_Token and an existing notification ID, THE Notification_Service SHALL delete the notification record from the Database and return HTTP status 200 with a success message
5. IF a DELETE request is sent to /api/notifications/:id with a non-existent ID, THEN THE Notification_Service SHALL return HTTP status 404 with an error message indicating the notification was not found
6. IF a GET, POST, or DELETE request is sent to /api/notifications without a valid JWT_Token, THEN THE Notification_Service SHALL return HTTP status 401 with an error message indicating authentication is required

### Requirement 9: Dashboard Statistics

**User Story:** As an admin, I want to view dashboard statistics, so that I can get an overview of the system data at a glance.

#### Acceptance Criteria

1. WHEN an authenticated GET request is sent to /api/dashboard/stats, THE Dashboard_Service SHALL return HTTP status 200 with a JSON object containing four integer fields: total_properties, total_articles, total_users, and total_notifications, each representing the current total count of the respective records in the Database
2. WHEN a GET request is sent to /api/dashboard/stats, THE Dashboard_Service SHALL return counts that reflect the current state of the Database at the time the request is processed
3. IF a GET request is sent to /api/dashboard/stats without a valid JWT_Token, THEN THE Dashboard_Service SHALL return HTTP status 401 with an error message
4. IF the Database is unreachable or a count query fails while processing a GET request to /api/dashboard/stats, THEN THE Dashboard_Service SHALL return HTTP status 500 with an error message

### Requirement 10: API Server Configuration

**User Story:** As a developer, I want the API server to be properly configured with CORS, environment variable loading, and structured routing, so that the frontend can communicate with the backend seamlessly.

#### Acceptance Criteria

1. WHEN the API_Server starts, THE API_Server SHALL load environment variables (DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, JWT_SECRET) from the .env file before accepting any requests
2. IF the .env file is missing or any required environment variable (DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, JWT_SECRET) is not set, THEN THE API_Server SHALL terminate startup and log an error message indicating which variable is missing
3. THE API_Server SHALL enable CORS allowing requests from the frontend application origin, permitting GET, POST, PUT, and DELETE methods and Authorization and Content-Type headers
4. THE API_Server SHALL listen on port 8080
5. THE API_Server SHALL group all API routes under the /api prefix
6. WHEN a GET request is received on /, THE API_Server SHALL return a JSON response with HTTP status 200 containing at minimum a "message" field indicating the server is running

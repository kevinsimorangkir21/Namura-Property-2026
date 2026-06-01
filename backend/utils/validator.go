package utils

import "regexp"

// emailRegex is a standard email validation pattern.
// It checks for: local-part@domain.tld format
// The domain part requires labels separated by single dots, each starting with alphanumeric.
var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$`)

// ValidateEmail checks if a string is a valid email format.
// Returns true for valid emails and false for invalid ones.
func ValidateEmail(email string) bool {
	if email == "" {
		return false
	}
	return emailRegex.MatchString(email)
}

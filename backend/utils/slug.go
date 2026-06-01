package utils

import (
	"regexp"
	"strings"
)

var (
	// nonAlphanumericRegex matches any character that is not a lowercase letter, digit, or hyphen
	nonAlphanumericRegex = regexp.MustCompile(`[^a-z0-9-]`)
	// consecutiveHyphensRegex matches two or more consecutive hyphens
	consecutiveHyphensRegex = regexp.MustCompile(`-{2,}`)
)

// GenerateSlug converts a title to a URL-friendly slug.
// - Converts to lowercase
// - Replaces spaces and special characters with hyphens
// - Removes consecutive hyphens
// - Trims leading/trailing hyphens
// - Truncates to maxLen characters (default 200 if maxLen <= 0)
func GenerateSlug(title string, maxLen int) string {
	if maxLen <= 0 {
		maxLen = 200
	}

	// Convert to lowercase
	slug := strings.ToLower(title)

	// Replace spaces with hyphens
	slug = strings.ReplaceAll(slug, " ", "-")

	// Replace any non-alphanumeric (except hyphens) characters with hyphens
	slug = nonAlphanumericRegex.ReplaceAllString(slug, "-")

	// Remove consecutive hyphens
	slug = consecutiveHyphensRegex.ReplaceAllString(slug, "-")

	// Trim leading/trailing hyphens
	slug = strings.Trim(slug, "-")

	// Truncate to maxLen characters
	if len(slug) > maxLen {
		slug = slug[:maxLen]
		// Trim trailing hyphens that may result from truncation
		slug = strings.TrimRight(slug, "-")
	}

	return slug
}

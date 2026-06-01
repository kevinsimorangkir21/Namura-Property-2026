package utils

import (
	"testing"
)

func TestGenerateSlug_BasicConversion(t *testing.T) {
	tests := []struct {
		name     string
		title    string
		maxLen   int
		expected string
	}{
		{
			name:     "simple title",
			title:    "Hello World",
			maxLen:   200,
			expected: "hello-world",
		},
		{
			name:     "title with special characters",
			title:    "Hello, World! How's it going?",
			maxLen:   200,
			expected: "hello-world-how-s-it-going",
		},
		{
			name:     "title with multiple spaces",
			title:    "Hello   World",
			maxLen:   200,
			expected: "hello-world",
		},
		{
			name:     "title with leading/trailing spaces",
			title:    "  Hello World  ",
			maxLen:   200,
			expected: "hello-world",
		},
		{
			name:     "title with numbers",
			title:    "Property 123 For Sale",
			maxLen:   200,
			expected: "property-123-for-sale",
		},
		{
			name:     "empty string",
			title:    "",
			maxLen:   200,
			expected: "",
		},
		{
			name:     "only special characters",
			title:    "!!!@@@###",
			maxLen:   200,
			expected: "",
		},
		{
			name:     "unicode characters",
			title:    "Café Résumé",
			maxLen:   200,
			expected: "caf-r-sum",
		},
		{
			name:     "maxLen zero uses default 200",
			title:    "Hello World",
			maxLen:   0,
			expected: "hello-world",
		},
		{
			name:     "negative maxLen uses default 200",
			title:    "Hello World",
			maxLen:   -1,
			expected: "hello-world",
		},
		{
			name:     "truncation to maxLen",
			title:    "This Is A Very Long Title",
			maxLen:   10,
			expected: "this-is-a",
		},
		{
			name:     "truncation removes trailing hyphen",
			title:    "abcde fghij",
			maxLen:   6,
			expected: "abcde",
		},
		{
			name:     "already lowercase",
			title:    "already lowercase",
			maxLen:   200,
			expected: "already-lowercase",
		},
		{
			name:     "mixed case",
			title:    "MiXeD CaSe TiTlE",
			maxLen:   200,
			expected: "mixed-case-title",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := GenerateSlug(tt.title, tt.maxLen)
			if result != tt.expected {
				t.Errorf("GenerateSlug(%q, %d) = %q, want %q", tt.title, tt.maxLen, result, tt.expected)
			}
		})
	}
}

func TestGenerateSlug_Invariants(t *testing.T) {
	// Test that slug only contains lowercase alphanumeric and hyphens
	inputs := []string{
		"Hello World!",
		"Test@#$%^&*()",
		"Rumah Mewah di Jakarta Selatan - Harga Terjangkau",
		"123 Main St., Apt #4B",
		"   spaces   everywhere   ",
		"UPPERCASE TITLE",
		"a",
		"---hyphens---",
	}

	for _, input := range inputs {
		slug := GenerateSlug(input, 200)

		// Check no consecutive hyphens
		for i := 0; i < len(slug)-1; i++ {
			if slug[i] == '-' && slug[i+1] == '-' {
				t.Errorf("GenerateSlug(%q) = %q contains consecutive hyphens", input, slug)
				break
			}
		}

		// Check no leading/trailing hyphens
		if len(slug) > 0 {
			if slug[0] == '-' {
				t.Errorf("GenerateSlug(%q) = %q has leading hyphen", input, slug)
			}
			if slug[len(slug)-1] == '-' {
				t.Errorf("GenerateSlug(%q) = %q has trailing hyphen", input, slug)
			}
		}

		// Check length constraint
		if len(slug) > 200 {
			t.Errorf("GenerateSlug(%q) = %q exceeds 200 characters (len=%d)", input, slug, len(slug))
		}

		// Check only valid characters
		for _, c := range slug {
			if !((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '-') {
				t.Errorf("GenerateSlug(%q) = %q contains invalid character %q", input, slug, string(c))
				break
			}
		}
	}
}

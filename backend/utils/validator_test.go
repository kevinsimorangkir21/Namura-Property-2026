package utils

import "testing"

func TestValidateEmail_ValidEmails(t *testing.T) {
	validEmails := []string{
		"user@example.com",
		"test.user@domain.org",
		"admin+tag@company.co",
		"name123@sub.domain.com",
		"user-name@example.io",
		"user_name@example.net",
		"a@b.co",
	}

	for _, email := range validEmails {
		t.Run(email, func(t *testing.T) {
			if !ValidateEmail(email) {
				t.Errorf("expected %q to be valid", email)
			}
		})
	}
}

func TestValidateEmail_InvalidEmails(t *testing.T) {
	invalidEmails := []string{
		"",
		"plaintext",
		"@domain.com",
		"user@",
		"user@.com",
		"user@domain",
		"user @domain.com",
		"user@domain .com",
		"user@@domain.com",
		"user@domain..com",
	}

	for _, email := range invalidEmails {
		t.Run(email, func(t *testing.T) {
			if ValidateEmail(email) {
				t.Errorf("expected %q to be invalid", email)
			}
		})
	}
}

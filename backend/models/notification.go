package models

import "time"

// Notification represents a system notification
type Notification struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Title     string    `gorm:"size:255;not null" json:"title"`
	Message   string    `gorm:"size:1000;not null" json:"message"`
	Status    string    `gorm:"size:50;not null" json:"status"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
